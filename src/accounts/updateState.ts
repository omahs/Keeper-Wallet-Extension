import { deepEqual } from 'fast-equals';
import { ACTION } from 'store/actions/constants';
import { AppAction } from 'store/types';
import {
  BackgroundGetStateResult,
  BackgroundUiApi,
} from 'ui/services/Background';

import { AccountsStore } from './store/types';

function getParam<S, D>(param: S, defaultParam: D) {
  if (param) {
    return param;
  }

  return param === null ? defaultParam : undefined;
}

type UpdateStateInput = Partial<
  BackgroundGetStateResult & {
    networks: Awaited<ReturnType<BackgroundUiApi['getNetworks']>>;
  }
>;

export function createUpdateState(store: AccountsStore) {
  return (state: UpdateStateInput) => {
    const actions: AppAction[] = [];
    const currentState = store.getState();

    if (state.networks && state.networks.length) {
      actions.push({
        type: ACTION.UPDATE_NETWORKS,
        payload: state.networks,
      });
    }

    const idleOptions = getParam(state.idleOptions, {});
    if (idleOptions && !deepEqual(currentState.idleOptions, idleOptions)) {
      actions.push({
        type: ACTION.REMOTE_CONFIG.UPDATE_IDLE,
        payload: idleOptions,
      });
    }

    const customNodes = getParam(state.customNodes, {});
    if (customNodes && !deepEqual(currentState.customNodes, customNodes)) {
      actions.push({
        type: ACTION.UPDATE_NODES,
        payload: customNodes,
      });
    }

    const customCodes = getParam(state.customCodes, {});
    if (customCodes && !deepEqual(currentState.customCodes, customCodes)) {
      actions.push({
        type: ACTION.UPDATE_CODES,
        payload: customCodes,
      });
    }

    if (
      state.currentLocale &&
      state.currentLocale !== currentState.currentLocale
    ) {
      actions.push({
        type: ACTION.UPDATE_FROM_LNG,
        payload: state.currentLocale,
      });
    }

    const uiState = getParam(state.uiState, {});
    if (uiState && !deepEqual(uiState, currentState.uiState)) {
      actions.push({
        type: ACTION.UPDATE_UI_STATE,
        payload: uiState,
      });
    }

    const currentNetwork = getParam(state.currentNetwork, '');
    if (currentNetwork && currentNetwork !== currentState.currentNetwork) {
      actions.push({
        type: ACTION.UPDATE_CURRENT_NETWORK,
        payload: currentNetwork,
      });
    }

    const selectedAccount = getParam(
      state.selectedAccount,
      {} as unknown as undefined
    );
    if (
      selectedAccount &&
      !deepEqual(selectedAccount, currentState.selectedAccount)
    ) {
      actions.push({
        type: ACTION.UPDATE_SELECTED_ACCOUNT,
        payload: selectedAccount,
      });
    }

    const accounts = getParam(state.accounts, []);
    if (accounts && !deepEqual(accounts, currentState.allNetworksAccounts)) {
      actions.push({
        type: ACTION.UPDATE_ALL_NETWORKS_ACCOUNTS,
        payload: accounts,
      });
    }

    if (
      (state.accounts != null &&
        !deepEqual(state.accounts, currentState.allNetworksAccounts)) ||
      (state.currentNetwork != null &&
        state.currentNetwork !== currentState.currentNetwork)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const accounts = state.accounts || currentState.allNetworksAccounts;
      const network = state.currentNetwork || currentState.currentNetwork;

      actions.push({
        type: ACTION.UPDATE_CURRENT_NETWORK_ACCOUNTS,
        payload: accounts.filter(account => account.network === network),
      });
    }

    if (
      !currentState.state ||
      state.initialized !== currentState.state.initialized ||
      state.locked !== currentState.state.locked
    ) {
      actions.push({
        type: ACTION.UPDATE_APP_STATE,
        payload: { initialized: state.initialized, locked: state.locked },
      });
    }

    const addresses = getParam(state.addresses, {});
    if (addresses && !deepEqual(addresses, currentState.addresses)) {
      store.dispatch({
        type: ACTION.UPDATE_ADDRESSES,
        payload: addresses,
      });
    }

    actions.forEach(action => store.dispatch(action));
  };
}
