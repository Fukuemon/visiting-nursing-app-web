import styles from './style.module.css'

import PrevIcon from '/public/icons/arrow-left.svg'
import NextIcon from '/public/icons/arrow-right.svg'

export const LeftControls: React.FC<{
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}> = ({ onPrev, onNext, onToday }) => (
  <div className={styles.left}>
    <button onClick={onPrev}>
      <PrevIcon width={24} height={24} />
    </button>
    <button onClick={onToday}>今日</button>
    <button onClick={onNext}>
      <NextIcon width={24} height={24} />
    </button>
  </div>
)
