import { useTranslation } from 'react-i18next';

import { TxStatus } from '../BaseTransaction';
import { MessageFinalComponentProps } from '../types';

export function UnknownFinal(props: MessageFinalComponentProps) {
  const { t } = useTranslation();

  return (
    <TxStatus
      {...props}
      messages={{
        send: t('sign.authConfirmed'),
        approve: t('sign.authConfirmed'),
        reject: t('sign.authRejected'),
      }}
    />
  );
}
