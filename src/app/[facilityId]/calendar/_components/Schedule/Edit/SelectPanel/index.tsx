import type { FC, ReactNode } from 'react'

import { Toggle, ToggleStateType } from '@/app/_components/Toggle'
import { scheduleType } from '@/constants/scheduleType'
import type { ScheduleEdit, VisitScheduleKey } from '@/schema/schedule'
import {
  RecallingFrequency,
  RecallingScheduleKey,
  ScheduleKey,
} from '@/schema/schedule'
import type { UseFormSetValue } from 'react-hook-form'
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
  watchRecallingFrequency: RecallingFrequency | undefined
  setValue: UseFormSetValue<ScheduleEdit>
}

export const SelectPanel: FC<SelectPanelProps> = ({
  scheduleEditMap,
  setCurrentId,
  currentId,
  watchScheduleType,
  watchRecallingFrequency,
  setValue,
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
            if (watchScheduleType === scheduleType.normal) {
              setValue(ScheduleKey.ScheduleType, scheduleType.normalRecalling, {
                shouldDirty: true,
              })
              if (watchRecallingFrequency === undefined) {
                setValue(
                  RecallingScheduleKey.Frequency,
                  RecallingFrequency.Weekly,
                  {
                    shouldDirty: true,
                  },
                )
              }
            } else if (watchScheduleType === scheduleType.visit) {
              setValue(ScheduleKey.ScheduleType, scheduleType.visitRecalling, {
                shouldDirty: true,
              })
              if (watchRecallingFrequency === undefined) {
                setValue(
                  RecallingScheduleKey.Frequency,
                  RecallingFrequency.Weekly,
                  {
                    shouldDirty: true,
                  },
                )
              }
            } else if (watchScheduleType === scheduleType.normalRecalling) {
              setValue(ScheduleKey.ScheduleType, scheduleType.normal, {
                shouldDirty: true,
              })
            } else if (watchScheduleType === scheduleType.visitRecalling) {
              setValue(ScheduleKey.ScheduleType, scheduleType.visit, {
                shouldDirty: true,
              })
            }
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
