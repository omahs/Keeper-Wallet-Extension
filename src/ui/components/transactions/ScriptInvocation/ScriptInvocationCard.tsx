import clsx from 'clsx';
import { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import { getMoney } from '../../../utils/converters';
import { Balance, PlateCollapsable, ShowScript } from '../../ui';
import { TxIcon } from '../BaseTransaction';
import { MessageCardComponentProps } from '../types';
import { getAmounts, messageType } from './parseTx';
import * as styles from './scriptInvocation.styl';

class ScriptInvocationCardComponent extends PureComponent<
  MessageCardComponentProps & WithTranslation
> {
  render() {
    const className = clsx(
      styles.scriptInvocationTransactionCard,
      this.props.className,
      {
        [styles.scriptInvocationCardCollapsed]: this.props.collapsed,
      }
    );

    const { t, message, assets, collapsed } = this.props;

    const { data } = message as Extract<
      typeof message,
      { type: 'transaction' }
    >;

    const tx = { type: data?.type, ...data?.data };
    const functionName = (tx.call && tx.call.function) || 'default';
    const amounts = getAmounts(tx).map(item => getMoney(item, assets));
    const hasPayment = !!(tx.payment && tx.payment.length);

    return (
      <div className={className}>
        <div className={styles.cardHeader}>
          <div className={styles.scriptInvocationTxIcon}>
            <TxIcon txType={messageType} />
          </div>
          <div>
            <div className="basic500 body3 margin-min">
              {t('transactions.scriptInvocation')}
            </div>
            <h1 className="headline1" data-testid="invokeScriptPaymentsTitle">
              {t(
                hasPayment
                  ? 'transactions.paymentsCount'
                  : 'transactions.paymentsNone',
                { count: tx.payment.length || 0 }
              )}
            </h1>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.txRow}>
            <div className="tx-title tag1 basic500">
              {t('transactions.dApp')}
            </div>
            <div className={styles.txValue} data-testid="invokeScriptDApp">
              {tx.dApp}
            </div>
          </div>

          <div className={styles.txRow}>
            <div className="tx-title tag1 basic500">
              {t('transactions.scriptInvocationFunction')}
            </div>
            <div className={styles.txValue} data-testid="invokeScriptFunction">
              {functionName}
            </div>
          </div>

          <div className={styles.txRow}>
            <div className="tx-title tag1 basic500">
              {t('transactions.arguments')}
            </div>
            <div className={styles.txValue}>
              <ShowScript
                className={styles.dataScript}
                isData
                noKey
                data={(tx.call && tx.call.args) || []}
                optional
                showNotify
                hideScript={this.props.collapsed}
              />
            </div>
          </div>

          {hasPayment && (
            <div className={styles.txRow}>
              <div className="tx-title tag1 basic500">
                {t('transactions.payments')}
              </div>
              <div className={styles.txValue}>
                <PlateCollapsable
                  className={styles.expandableList}
                  showExpand={!collapsed}
                >
                  <>
                    {amounts.map((amount, index) => (
                      <div className={styles.balance} key={index}>
                        <Balance
                          data-testid="invokeScriptPaymentItem"
                          isShortFormat
                          balance={amount}
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          assetId={amount!.asset.id}
                          showAsset
                          showUsdAmount
                        />
                      </div>
                    ))}
                  </>
                </PlateCollapsable>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export const ScriptInvocationCard = withTranslation()(
  ScriptInvocationCardComponent
);
