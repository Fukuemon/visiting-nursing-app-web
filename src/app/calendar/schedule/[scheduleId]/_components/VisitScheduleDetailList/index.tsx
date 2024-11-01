import { recallingTextFromRule } from '@/constants/recallingRule'
import {
  ScheduleCategoryText,
  type ScheduleCategory,
} from '@/constants/scheduleCategory'
import { ScheduleTypeText, type ScheduleType } from '@/constants/scheduleType'
import type { ServiceCode } from '@/constants/serviceCode'
import type { Patient } from '@/types/patient'
import type { RecallingRule } from '@/types/recallingRule'
import type { User } from '@/types/user'
import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState, type FC } from 'react'
import styles from './style.module.css'

export type VisitScheduleDetailListProps = {
  user: User
  patient: Patient
  service_code: ServiceCode
  schedule_type: ScheduleType
  schedule_category: ScheduleCategory
  description?: string
  start_time: Date
  end_time: Date
  destination: string
  is_cancelled: boolean
  recalling_rule?: RecallingRule
}

export const VisitScheduleDetailList: FC<VisitScheduleDetailListProps> = ({
  user,
  patient,
  service_code,
  schedule_type,
  start_time,
  end_time,
  destination,
  is_cancelled,
  schedule_category,
  recalling_rule,
  description,
}) => {
  const [recalling, setRecalling] = useState('')

  useEffect(() => {
    if (recalling_rule !== undefined) {
      setRecalling(recallingTextFromRule(recalling_rule))
    }
  }, [recalling_rule])

  return (
    <div
      className={classNames(styles.container, {
        [styles._isCancelled]: is_cancelled,
      })}
    >
      <div className={styles.heading}>
        <p>{ScheduleTypeText[schedule_type]}</p>
        <p>
          {recalling_rule !== undefined ? (
            <span>頻度 : {recalling}</span>
          ) : (
            <span></span>
          )}
        </p>
        {is_cancelled && <p className={styles.cancel}>キャンセル</p>}
      </div>

      <ul className={styles.list}>
        <li className={styles.row}>
          <span>担当者</span>
          <Link className={styles.link} href={`/user/${user.id}`}>
            <span>{user.name}</span>
          </Link>
        </li>
        <li className={styles.row}>
          <span>患者名</span>
          <Link className={styles.link} href={`/patient/${patient.id}`}>
            <span>{patient.name}</span>
          </Link>
        </li>
        <li className={styles.row}>
          <span>サービスコード</span>
          <span>{service_code}</span>
        </li>
        <li className={styles.row}>
          <span>開始時間</span>
          <span>
            {`${String(start_time.getHours()).padStart(2, '0')}:${String(start_time.getMinutes()).padStart(2, '0')}`}
          </span>
        </li>
        <li className={styles.row}>
          <span>終了時間</span>
          <span>
            {`${String(end_time.getHours()).padStart(2, '0')}:${String(end_time.getMinutes()).padStart(2, '0')}`}
          </span>
        </li>
        <li className={styles.row}>
          <span>訪問種類</span>
          <span>{ScheduleCategoryText[schedule_category]}</span>
        </li>
        <li className={styles.row}>
          <span>住所</span>
          <span>{destination}</span>
        </li>
      </ul>
    </div>
  )
}
