import { recallingTextFromRule } from '@/constants/recallingRule'
import { ScheduleTypeText, type ScheduleType } from '@/constants/scheduleType'
import type { RecallingRule } from '@/types/recallingRule'
import type { User } from '@/types/user'
import Link from 'next/link'
import { useEffect, useState, type FC } from 'react'
import styles from './style.module.css'

export type NormalScheduleDetailListProps = {
  user: User
  schedule_type: ScheduleType
  description?: string
  start_time: Date
  end_time: Date
  recalling_rule?: RecallingRule
}

const formatTime = (date: Date) => {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export const NormalScheduleDetailList: FC<NormalScheduleDetailListProps> = ({
  user,
  schedule_type,
  start_time,
  end_time,
  description,
  recalling_rule,
}) => {
  const [recalling, setRecalling] = useState('')

  useEffect(() => {
    if (recalling_rule !== undefined) {
      setRecalling(recallingTextFromRule(recalling_rule))
    }
  }, [recalling_rule])

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p>{ScheduleTypeText[schedule_type]}</p>
        {recalling_rule !== undefined && (
          <p>
            <span>頻度 : {recalling}</span>
          </p>
        )}
      </div>

      <ul className={styles.list}>
        <li className={styles.row}>
          <span>担当者</span>
          <Link className={styles.link} href={`/user/${user.id}`}>
            <span>{user.name}</span>
          </Link>
        </li>
        <li className={styles.row}>
          <span>開始時間</span>
          <span>{formatTime(start_time)}</span>
        </li>
        <li className={styles.row}>
          <span>終了時間</span>
          <span>{formatTime(end_time)}</span>
        </li>
      </ul>
      <div className={styles.description}>
        <p>{description}</p>
      </div>
    </div>
  )
}
