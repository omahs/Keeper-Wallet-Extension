import clsx from 'clsx';
import { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import { ShowScript } from '../../ui';
import { TxIcon } from '../BaseTransaction';
import { MessageCardComponentProps } from '../types';
import * as styles from './index.styl';
import { messageType } from './parseTx';

class UpdateAssetInfoCardComponent extends PureComponent<
  MessageCardComponentProps & WithTranslation
> {
  render() {
    const className = clsx(
      styles.updateAssetInfoTransactionCard,
      this.props.className,
      {
        [styles.updateAssetInfoCardCollapsed]: this.props.collapsed,
      }
    );

    const { t, message } = this.props;

    const { data } = message as Extract<
      typeof message,
      { type: 'transaction' }
    >;

    const tx = { type: data?.type, ...data?.data };

    return (
      <div className={className}>
        <div className={styles.cardHeader}>
          <div className={styles.updateAssetInfoTxIcon}>
            <TxIcon txType={messageType} />
          </div>
          <div>
            <div className="basic500 body3 margin-min">
              {t('transactions.updateAssetInfo')}
            </div>
          </div>
        </div>

        <div className={styles.cardContent}>
          {!!tx.script && (
            <ShowScript
              script={tx.script}
              showNotify
              optional
              hideScript={this.props.collapsed}
            />
          )}
        </div>
      </div>
    );
  }
}

export const UpdateAssetInfoCard = withTranslation()(
  UpdateAssetInfoCardComponent
);
