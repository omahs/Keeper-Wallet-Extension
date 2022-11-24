import { useAppSelector } from 'ui/store';

import * as styles from './bottom.module.css';
import { Network } from './components';

interface Props {
  allowChangingNetwork?: boolean;
}

export function Bottom({ allowChangingNetwork }: Props) {
  const version = useAppSelector(state => state.version);

  return (
    <div className={styles.bottom}>
      <Network allowChangingNetwork={allowChangingNetwork} />
      <div className="version basic500" data-testid="currentVersion">
        v {version}
      </div>
    </div>
  );
}
