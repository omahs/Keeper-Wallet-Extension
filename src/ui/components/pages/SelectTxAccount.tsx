import { MessageStoreItem } from 'messages/types';
import { NotificationsStoreItem } from 'notifications/types';
import { PopupState } from 'popup/store/types';
import { PreferencesAccount } from 'preferences/types';
import { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Background from 'ui/services/Background';

import { clearMessagesStatus } from '../../../store/actions/localState';
import { clearMessages, reject } from '../../../store/actions/messages';
import {
  deleteNotifications,
  updateActiveState,
} from '../../../store/actions/notifications';
import { WithNavigate, withNavigate } from '../../router';
import { Button } from '../ui';
import { TransactionWallet } from '../wallets/TransactionWallet';
import { LoadingScreen } from './loadingScreen';
import * as styles from './styles/selectTxAccount.styl';

interface StateProps {
  selectAccount: PreferencesAccount | undefined;
  messages: MessageStoreItem[];
  notifications: NotificationsStoreItem[][];
  activeMessage: MessageStoreItem | null;
  activeNotification: NotificationsStoreItem[] | null;
}

interface DispatchProps {
  updateActiveState: () => void;
  deleteNotifications: (
    ids:
      | string[]
      | {
          ids: string[];
          next: NotificationsStoreItem[] | null;
        }
  ) => void;
  clearMessagesStatus: () => void;
  clearMessages: () => void;
  reject: (id: string) => void;
}

type Props = WithTranslation & StateProps & DispatchProps & WithNavigate;

interface State {
  loading: boolean;
}

class SelectTxAccountComponent extends PureComponent<Props, State> {
  state: State = { loading: false };

  static getDerivedStateFromProps(
    props: Readonly<Props>,
    state: State
  ): Partial<State> | null {
    const { activeMessage, messages, activeNotification, notifications } =
      props;

    if (
      !activeMessage &&
      messages.length === 0 &&
      !activeNotification &&
      notifications.length === 0
    ) {
      props.navigate('/');
      return { loading: false };
    }

    return state;
  }

  deleteNotifications = () => {
    const ids = this.props.notifications.reduce((acc, item) => {
      return [...acc, ...item.map(({ id }) => id)];
    }, [] as string[]);
    this.props.deleteNotifications(ids);
  };

  onClick = () => {
    this.props.messages.forEach(({ id }) => this.props.reject(id));
    this.props.clearMessages();
    this.props.clearMessagesStatus();
    this.deleteNotifications();
    this.props.updateActiveState();
    this.setState({ loading: true });
    Background.closeNotificationWindow();
  };

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    const { t } = this.props;

    return (
      <div className={styles.content}>
        <TransactionWallet
          className={styles.userWallet}
          hideButton
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          account={this.props.selectAccount!}
        >
          <div
            className={styles.closeIcon}
            onClick={() => {
              this.props.navigate(-1);
            }}
          />
        </TransactionWallet>
        <div className={styles.wrapper}>
          <div className="title1 margin-main-big">
            {t('sign.changeAccount')}
          </div>

          <div className="margin-main-large body1">
            {t('sign.changeAccountInfo')}
          </div>

          <Button type="submit" view="submit" onClick={this.onClick}>
            {t('sign.switchAccount')}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: PopupState): StateProps => {
  return {
    selectAccount: state.selectedAccount,
    messages: state.messages,
    notifications: state.notifications,
    activeMessage: state.activePopup && state.activePopup.msg,
    activeNotification: state.activePopup && state.activePopup.notify,
  };
};

const actions = {
  updateActiveState,
  deleteNotifications,
  clearMessagesStatus,
  clearMessages,
  reject,
};

export const SelectTxAccount = connect(
  mapStateToProps,
  actions
)(withTranslation()(withNavigate(SelectTxAccountComponent)));
