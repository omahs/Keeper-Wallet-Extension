import { BigNumber } from '@waves/bignumber';
import { address, publicKey, signBytes } from '@waves/ts-lib-crypto';
import { customData, wavesAuth } from '@waves/waves-transactions';
import { TCustomData } from '@waves/waves-transactions/dist/requests/custom-data';
import { IWavesAuthParams } from '@waves/waves-transactions/dist/transactions';
import { NetworkName } from 'networks/types';
import * as create from 'parse-json-bignumber';
import {
  convertFromSa,
  makeBytes,
  SaAuth,
  SaCancelOrder,
  SaOrder,
  SaRequest,
  SaTransaction,
} from 'transactions/utils';

import { WalletPrivateDataOfType } from './types';
import { Wallet } from './wallet';

const { stringify } = create({ BigNumber });

export interface PrivateKeyWalletInput {
  name: string;
  network: NetworkName;
  networkCode: string;
  privateKey: string;
}

export class PrivateKeyWallet extends Wallet<
  WalletPrivateDataOfType<'privateKey'>
> {
  constructor({
    name,
    network,
    networkCode,
    privateKey,
  }: PrivateKeyWalletInput) {
    const publicKeyValue = publicKey({ privateKey });

    super({
      address: address({ publicKey: publicKeyValue }, networkCode),
      name,
      network,
      networkCode,
      privateKey,
      publicKey: publicKeyValue,
      type: 'privateKey',
    });
  }

  getAccount() {
    return {
      address: this.data.address,
      name: this.data.name,
      network: this.data.network,
      networkCode: this.data.networkCode,
      publicKey: this.data.publicKey,
      type: this.data.type,
    };
  }

  getSeed(): string {
    throw new Error('Cannot get seed');
  }

  getPrivateKey() {
    return this.data.privateKey;
  }

  private signBytes(bytes: Uint8Array) {
    return signBytes({ privateKey: this.getPrivateKey() }, bytes);
  }

  async signTx(tx: SaTransaction) {
    const result = convertFromSa.transaction(
      tx,
      this.data.networkCode.charCodeAt(0),
      'privateKey'
    );

    result.proofs.push(this.signBytes(makeBytes.transaction(result)));

    return stringify(result);
  }

  async signAuth(auth: SaAuth) {
    return this.signBytes(makeBytes.auth(convertFromSa.auth(auth)));
  }

  async signRequest(request: SaRequest) {
    return this.signBytes(makeBytes.request(convertFromSa.request(request)));
  }

  async signOrder(order: SaOrder) {
    const result = convertFromSa.order(
      order,
      this.data.networkCode.charCodeAt(0)
    );

    result.proofs.push(this.signBytes(makeBytes.order(result)));

    return stringify(result);
  }

  async signCancelOrder(cancelOrder: SaCancelOrder) {
    const result = convertFromSa.cancelOrder(cancelOrder);

    result.signature = this.signBytes(makeBytes.cancelOrder(result));

    return stringify(result);
  }

  async signWavesAuth(data: IWavesAuthParams) {
    return wavesAuth(data, { privateKey: this.getPrivateKey() });
  }

  async signCustomData(data: TCustomData) {
    return customData(data, { privateKey: this.getPrivateKey() });
  }
}
