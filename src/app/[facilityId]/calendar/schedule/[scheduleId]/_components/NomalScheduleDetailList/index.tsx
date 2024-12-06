import { WeekDayTextFromNumber } from '@/constants/weekDay'
import { RecallingFrequency } from '@/schema/recallingSchedule'
import { NormalSchedule } from '@/schema/schedule'
import { type FC } from 'react'
import styles from './style.module.css'

export type NormalScheduleDetailListProps = {
  schedule: NormalSchedule
}

export const NormalScheduleDetailList: FC<NormalScheduleDetailListProps> = ({
  schedule,
}) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            {schedule.scheduleDate.toLocaleDateString('ja-JP', {
              month: 'long',
            })}
            {schedule.scheduleDate.toLocaleDateString('ja-JP', {
              day: 'numeric',
            })}
            （
            {schedule.scheduleDate.toLocaleDateString('ja-JP', {
              weekday: 'short',
            })}
            ）
          </h2>
        </div>
        <div className={styles.info}>
          <div>
            <li className={styles.row}>
              <span>開始時間</span>
              <span className={styles.item}>{schedule.startTime}</span>
            </li>
            <li className={styles.row}>
              <span>終了時間</span>
              <span className={styles.item}>{schedule.endTime}</span>
            </li>
          </div>
          <div>
            {schedule.recallingSchedule !== undefined && (
              <li className={styles.row}>
                <span>繰り返し</span>
                <span className={styles.item}>
                  {schedule.recallingSchedule.frequency ===
                    RecallingFrequency.Monthly && (
                    <div>
                      <p>
                        毎月：第
                        {schedule.recallingSchedule.weekOfMonth ?? 1}
                        {
                          WeekDayTextFromNumber[
                            schedule.recallingSchedule.dayOfWeek ?? 0
                          ]
                        }
                        曜日
                      </p>
                    </div>
                  )}
                  {schedule.recallingSchedule.frequency ===
                    RecallingFrequency.Weekly && (
                    <div>
                      <p>
                        毎週：
                        {
                          WeekDayTextFromNumber[
                            schedule.recallingSchedule.dayOfWeek ?? 0
                          ]
                        }
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
