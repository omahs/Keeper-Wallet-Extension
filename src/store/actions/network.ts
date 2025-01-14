import { NetworkName } from '../../networks/types';
import { PopupThunkAction } from '../../popup/store/types';
import Background from '../../ui/services/Background';
import { ACTION } from './constants';

export function setNetwork(
  network: NetworkName
): PopupThunkAction<Promise<void>> {
  return async () => {
    await Background.setNetwork(network);
  };
}

export const setCustomNode = (payload: {
  network: NetworkName | null | undefined;
  node: string | null | undefined;
}) => {
  return {
    type: ACTION.CHANGE_NODE,
    payload,
  };
};

export const setCustomCode = (payload: {
  network: NetworkName | null | undefined;
  code: string | undefined;
}) => {
  return {
    type: ACTION.CHANGE_NETWORK_CODE,
    payload,
  };
};

export const setCustomMatcher = (payload: {
  network: NetworkName | null | undefined;
  matcher: string | null | undefined;
}) => {
  return {
    type: ACTION.CHANGE_MATCHER,
    payload,
  };
};
