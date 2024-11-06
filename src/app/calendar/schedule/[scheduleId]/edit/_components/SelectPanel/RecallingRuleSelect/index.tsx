import type { FC } from 'react'

import { WeekDayTextFromNumber } from '@/constants/weekDay'
import { RecallingFrequency } from '@/schema/recallingSchedule'
import styles from './style.module.css'

export type RecallingRuleSelectProps = {
  frequency: RecallingFrequency | undefined
  dayOfWeek: number | undefined
  weekOfMonth: number | undefined
  endDate: Date | undefined
}

export const RecallingRuleSelect: FC<RecallingRuleSelectProps> = ({
  frequency,
  dayOfWeek,
  weekOfMonth,
  endDate,
}) => {
  const endDateText =
    endDate !== undefined ? new Date(endDate).toLocaleDateString() : '無期限'

  return (
    <div className={styles.recallingRuleSelect}>
      <div>
        <p className={styles.title}>頻度</p>
      </div>
      {frequency === RecallingFrequency.Monthly && (
        <div>
          <p>
            毎月：第
            {weekOfMonth ?? 1}
            {WeekDayTextFromNumber[dayOfWeek ?? 0]}曜日
          </p>
        </div>
      )}
      {frequency === RecallingFrequency.Weekly && (
        <div>
          <p>
            毎週：
            {WeekDayTextFromNumber[dayOfWeek ?? 0]}
            曜日
          </p>
        </div>
      )}
      <div>
        <p className={styles.title}>終了日</p>

        <p>{endDateText}</p>
      </div>
    </div>
  )
}
