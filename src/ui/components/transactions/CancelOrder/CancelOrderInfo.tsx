import { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import { DateFormat } from '../../ui';
import { MessageComponentProps } from '../types';
import * as styles from './cancelOrder.styl';

class CancelOrderInfoComponent extends PureComponent<
  Pick<MessageComponentProps, 'message' | 'assets'> & WithTranslation
> {
  render() {
    const { t, message } = this.props;

    const { messageHash, data } = message as Extract<
      typeof message,
      { type: 'cancelOrder' }
    >;

    return (
      <div>
        <div className={styles.txRow}>
          <div className="tx-title tag1 basic500">{t('transactions.txid')}</div>
          <div className={styles.txValue}>{messageHash}</div>
        </div>

        <div className={styles.txRow}>
          <div className="tx-title tag1 basic500">
            {t('transactions.txTime')}
          </div>
          <div className={styles.txValue}>
            <DateFormat date={data?.data.timestamp} />
          </div>
        </div>
      </div>
    );
  }
}

export const CancelOrderInfo = withTranslation()(CancelOrderInfoComponent);
