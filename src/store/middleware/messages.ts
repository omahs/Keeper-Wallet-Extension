import { captureException, withScope } from '@sentry/browser';

import { MSG_STATUSES } from '../../constants';
import { PreferencesAccount } from '../../preferences/types';
import background from '../../ui/services/Background';
import { ACTION } from '../actions/constants';
import {
  approveError,
  approveOk,
  approvePending,
  rejectOk,
} from '../actions/localState';
import { setActiveMessage } from '../actions/notifications';
import { AppMiddleware } from '../types';

export const updateActiveMessageReducer: AppMiddleware =
  store => next => action => {
    const { activePopup, messages } = store.getState();
    const activeMessage = activePopup && activePopup.msg;

    if (action.type === ACTION.UPDATE_MESSAGES) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { unapprovedMessages, messages } = action.payload;

      if (!activeMessage && unapprovedMessages.length) {
        return next(action);
      }

      const activeMessageUpdated = messages.find(
        ({ id }) => id === activeMessage?.id
      );

      if (activeMessageUpdated) {
        const { status } = activeMessageUpdated;

        switch (status) {
          case MSG_STATUSES.REJECTED:
          case MSG_STATUSES.REJECTED_FOREVER:
            store.dispatch(rejectOk(activeMessageUpdated.id));
            store.dispatch(approvePending(false));
            background.deleteMessage(activeMessageUpdated.id);
            break;
          case MSG_STATUSES.SIGNED:
          case MSG_STATUSES.PUBLISHED:
            store.dispatch(approveOk(activeMessageUpdated.id));
            store.dispatch(approvePending(false));
            background.deleteMessage(activeMessageUpdated.id);
            break;
          case MSG_STATUSES.FAILED:
            store.dispatch(approvePending(false));
            store.dispatch(
              approveError({
                error: activeMessageUpdated.err.message,
                message: activeMessageUpdated,
              })
            );
            background.deleteMessage(activeMessageUpdated.id);
            break;
        }
      }

      return next(action);
    }

    if (action.type === ACTION.APPROVE_REJECT_CLEAR) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const message = messages.find(({ id }) => id !== activeMessage!.id)!;
      store.dispatch(setActiveMessage(action.payload ? null : message));
    }

    if (action.type === ACTION.UPDATE_TRANSACTION_FEE) {
      const { messageId, fee } = action.payload;
      background
        .updateTransactionFee(messageId, fee)
        .then(message => store.dispatch(setActiveMessage(message)));
    }

    return next(action);
  };

export const clearMessages: AppMiddleware = () => next => action => {
  if (ACTION.CLEAR_MESSAGES === action.type) {
    background.clearMessages();
    return;
  }

  return next(action);
};

export const approve: AppMiddleware = store => next => action => {
  if (action.type !== ACTION.APPROVE) {
    return next(action);
  }
  const messageId = action.payload;
  const { selectedAccount } = store.getState();

  background.getMessageById(messageId).then(message => {
    background
      .approve(messageId, selectedAccount as PreferencesAccount)
      .catch(async err => {
        const errorMessage = err && err.message ? err.message : String(err);

        if (message.origin) {
          const shouldIgnore = await background.shouldIgnoreError(
            'contentScriptApprove',
            errorMessage
          );

          if (shouldIgnore) {
            return;
          }
        } else {
          const shouldIgnore = await background.shouldIgnoreError(
            'popupApprove',
            errorMessage
          );

          if (shouldIgnore) {
            return;
          }
        }

        withScope(scope => {
          const fingerprint = ['{{ default }}', message.type];

          if (message.type === 'transaction') {
            fingerprint.push(String(message.data.type));
          }

          scope.setFingerprint(fingerprint);
          captureException(err);
        });
      });
  });

  store.dispatch(approvePending(true));
};

export const reject: AppMiddleware = store => next => action => {
  if (action.type !== ACTION.REJECT) {
    return next(action);
  }

  background.reject(action.payload);
  store.dispatch(approvePending(true));
};

export const rejectForever: AppMiddleware = store => next => action => {
  if (action.type !== ACTION.REJECT_FOREVER) {
    return next(action);
  }
  const { messageId, forever } = action.payload;

  background.reject(messageId, forever);
  store.dispatch(approvePending(true));
};
