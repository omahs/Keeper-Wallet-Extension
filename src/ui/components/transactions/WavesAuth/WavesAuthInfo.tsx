import { PureComponent } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import { DateFormat } from '../../ui';
import { MessageComponentProps } from '../types';
import * as styles from './wavesAuth.styl';

class WavesAuthInfoComponent extends PureComponent<
  Pick<MessageComponentProps, 'message' | 'assets'> & WithTranslation
> {
  render() {
    const { t, message } = this.props;

    const { messageHash, data } = message as Extract<
      typeof message,
      { type: 'wavesAuth' }
    >;

    return (
      <div>
        <div className={styles.txRow}>
          <div className="tx-title body3 basic500">
            {t('transactions.wavesAuthTimeStamp')}
          </div>
          <div className="fullwidth">
            <DateFormat
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              date={data.timestamp!}
              showRaw
              className="fullwidth"
            />
          </div>
        </div>
        <div className={styles.txRow}>
          <div className="tx-title body3 basic500">
            {t('transactions.publicKey')}
          </div>
          <div className={styles.txValue}>{data.publicKey}</div>
        </div>
        <div className={styles.txRow}>
          <div className="tx-title body3 basic500">
            {t('transactions.dataHash')}
          </div>
          <div className={styles.txValue}>{messageHash}</div>
        </div>
      </div>
    );
  }
}

export const WavesAuthInfo = withTranslation()(WavesAuthInfoComponent);
