import { isSchedule } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/ScheduleEditModal'
import { WeekDayTextFromNumber } from '@/constants/weekDay'
import type { NormalRecallingSchedule, NormalSchedule } from '@/schema/schedule'
import { RecallingFrequency, ScheduleKey } from '@/schema/schedule'
import { type FC } from 'react'
import styles from './style.module.css'

export type NormalScheduleDetailListProps = {
  schedule: NormalSchedule | NormalRecallingSchedule
  startDate: Date
}

export const NormalScheduleDetailList: FC<NormalScheduleDetailListProps> = ({
  schedule,
  startDate,
}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            {startDate.toLocaleDateString('ja-JP', {
              month: 'long',
            })}
            {startDate.toLocaleDateString('ja-JP', {
              day: 'numeric',
            })}
            （
            {startDate.toLocaleDateString('ja-JP', {
              weekday: 'short',
            })}
            ）
          </h2>
        </div>
        <div className={styles.info}>
          <div>
            <li className={styles.row}>
              <span>開始時間</span>
              <span className={styles.item}>
                {schedule[ScheduleKey.StartTime]}
              </span>
            </li>
            <li className={styles.row}>
              <span>終了時間</span>
              <span className={styles.item}>
                {schedule[ScheduleKey.EndTime]}
              </span>
            </li>
          </div>
          <div>
            {!isSchedule(schedule) && (
              <li className={styles.row}>
                <span>繰り返し</span>
                <span className={styles.item}>
                  {schedule.frequency === RecallingFrequency.Monthly && (
                    <div>
                      <p>
                        毎月：第
                        {schedule.weekOfMonth ?? 1}
                        {WeekDayTextFromNumber[schedule.dayOfWeek ?? 0]}
                        曜日
                      </p>
                    </div>
                  )}
                  {schedule.frequency === RecallingFrequency.Weekly && (
                    <div>
                      <p>
                        毎週：
                        {WeekDayTextFromNumber[schedule.dayOfWeek ?? 0]}
                        曜日
                      </p>
                    </div>
                  )}
                </span>
              </li>
            )}
          </div>
        </div>
      </ul>

      <ul className={styles.list}>
        <h2 className={styles.title}>補足情報</h2>
        <li className={styles.row}>
          <span>{schedule.description}</span>
        </li>
      </ul>
    </div>
  )
}
