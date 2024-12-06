import { ScheduleCategoryText } from '@/constants/scheduleCategory'
import { WeekDayTextFromNumber } from '@/constants/weekDay'
import { usePatient } from '@/hooks/api/patient'
import { RecallingFrequency } from '@/schema/recallingSchedule'
import { VisitSchedule } from '@/schema/schedule'
import classNames from 'classnames'
import Link from 'next/link'
import { type FC } from 'react'
import styles from './style.module.css'

export type VisitScheduleDetailListProps = {
  schedule: VisitSchedule
}

export const VisitScheduleDetailList: FC<VisitScheduleDetailListProps> = ({
  schedule,
}) => {
  const patient = usePatient(schedule.patientId)

  if (patient.isLoading || !patient.patient) {
    return <div>Loading...</div>
  }

  if (patient.error) {
    throw new Error(patient.error)
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles._isCancelled]: schedule.isCanceled,
      })}
    >
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
          {schedule.isCanceled && <p className={styles.cancel}>キャンセル</p>}
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
        <h2 className={styles.title}>訪問情報</h2>
        <div className={styles.info}>
          <div>
            <li className={styles.row}>
              <span>提供時間</span>
              <span className={styles.item}>{schedule.serviceTime}分</span>
            </li>
            <li className={styles.row}>
              <span>患者名</span>
              <Link
                className={styles.link}
                href={`/patient/${patient.patient.id}`}
              >
                <span className={styles.item}>{patient.patient.name}</span>
              </Link>
            </li>
          </div>
          <div>
            <li className={styles.row}>
              <span>サービスコード</span>
              <span className={styles.item}>{schedule.serviceCode}</span>
            </li>
            <li className={styles.row}>
              <span>訪問種類</span>
              <div className={styles._category}>
                {schedule.scheduleCategory ? (
                  schedule.scheduleCategory.map((category) => (
                    <span className={styles.item}>
                      {ScheduleCategoryText[category]}
                    </span>
                  ))
                ) : (
                  <span className={styles.item}>通常</span>
                )}
              </div>
            </li>
          </div>
        </div>
        <li className={styles.row}>
          <span>住所</span>
          <span className={styles.item}>{schedule.destination}</span>
        </li>
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
