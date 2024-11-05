import type { FC, ReactNode } from 'react'

import { Toggle, ToggleStateType } from '@/app/_components/Toggle'
import type { RecallingScheduleKey } from '@/schema/recallingSchedule'
import type { ScheduleKey, VisitScheduleKey } from '@/schema/schedule'
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
  isRecallingSchedule: boolean
  setIsRecallingSchedule: (isRecallingSchedule: boolean) => void
}

export const SelectPanel: FC<SelectPanelProps> = ({
  scheduleEditMap,
  setCurrentId,
  currentId,
  isRecallingSchedule,
  setIsRecallingSchedule,
}) => {
  return (
    <div className={styles.selectPanel}>
      <div className={styles.toggle}>
        <span className={styles.label}>繰り返し</span> 
        <Toggle
          toggleState={
            isRecallingSchedule
              ? ToggleStateType.CHECKED
              : ToggleStateType.DEFAULT
          }
          onClick={() => {
            setIsRecallingSchedule(!isRecallingSchedule)
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
