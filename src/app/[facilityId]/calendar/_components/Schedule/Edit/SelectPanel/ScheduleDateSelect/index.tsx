import type { FC } from 'react'

import { ServiceCode } from '@/schema/serviceCode'
import styles from './style.module.css'

export type ScheduleDateSelectProps = {
  startDate: Date
  startTime: string
  endTime: string
  serviceTime: number
  serviceCode: ServiceCode | undefined
  isVisitSchedule: boolean
}

export const ScheduleDateSelect: FC<ScheduleDateSelectProps> = ({
  startDate,
  startTime,
  endTime,
  serviceTime,
  serviceCode,
  isVisitSchedule,
}) => {
  const year = startDate.getFullYear()
  const month = String(startDate.getMonth() + 1).padStart(2, '0')
  const day = String(startDate.getDate()).padStart(2, '0')
  return (
    <div className={styles.dateSelect}>
      <p>{`${year}-${month}-${day}`}</p>

      <div>
        <p className={styles.title}>開始時間</p>
        <p>{startTime}</p>
      </div>
      <div>
        <p className={styles.title}>終了時間</p>
        <p>{endTime}</p>
      </div>
      {isVisitSchedule && (
        <div>
          <p className={styles.title}>提供時間</p>
          <p>{serviceTime}分</p>
        </div>
      )}
      {isVisitSchedule && (
        <div>
          <p className={styles.title}>サービスコード</p>
          <p>{serviceCode?.code}</p>
        </div>
      )}
    </div>
  )
}
