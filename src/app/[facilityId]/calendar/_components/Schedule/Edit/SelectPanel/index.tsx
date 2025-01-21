import type { FC, ReactNode } from 'react'

import { Toggle, ToggleStateType } from '@/app/_components/Toggle'
import { scheduleType } from '@/constants/scheduleType'
import type {
  RecallingScheduleKey,
  ScheduleKey,
  VisitScheduleKey,
} from '@/schema/schedule'
import styles from './style.module.css'

export type ButtonContentProps = {
  id: ScheduleKey | VisitScheduleKey | RecallingScheduleKey
  label: string
  content: ReactNode
}

export type SelectPanelProps = {
  scheduleEditMap: ButtonContentProps[]
  setCurrentId: (
    id: ScheduleKey | VisitScheduleKey | RecallingScheduleKey,
  ) => void
  currentId: ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  watchScheduleType: scheduleType
  onToggle: () => void
}

export const SelectPanel: FC<SelectPanelProps> = ({
  scheduleEditMap,
  setCurrentId,
  currentId,
  watchScheduleType,

  onToggle,
}) => {  
  return (
    <div className={styles.selectPanel}>
      <div className={styles.toggle}>
        <span className={styles.label}>繰り返し</span>
        <Toggle
          toggleState={
            watchScheduleType === scheduleType.normalRecalling ||
            watchScheduleType === scheduleType.visitRecalling
              ? ToggleStateType.CHECKED
              : ToggleStateType.DEFAULT
          }
          onClick={() => {
            onToggle()
          }}
        />
      </div>
      <div className={styles.buttons}>
        {scheduleEditMap.map((button) => (
          <div
            key={button.id}
            className={styles.button}
            onClick={() => setCurrentId(button.id)}
            data-active={button.id === currentId ? 'true' : 'false'}
          >
            <span className={styles.label}>{button.label}</span>
            {button.content}
          </div>
        ))}
      </div>
    </div>
  )
}
