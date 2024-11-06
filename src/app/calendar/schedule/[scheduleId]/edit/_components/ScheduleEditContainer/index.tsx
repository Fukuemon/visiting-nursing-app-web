'use client'
import { EditSchedule } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditSchedule'
import { useSchedule } from '@/hooks/schedule'
import { useUserList } from '@/hooks/user'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import styles from './style.module.css'

export type ScheduleEditContainerProps = object

export const ScheduleEditContainer: FC<ScheduleEditContainerProps> = ({}) => {
  const { scheduleId } = useParams<{ scheduleId: string }>()
  const schedule = useSchedule(scheduleId)
  const users = useUserList()
  if (
    schedule.isLoading ||
    schedule.schedule === undefined ||
    users.isLoading ||
    users.users === undefined
  )
    return <div>Loading...</div>
  if (
    schedule.error !== undefined &&
    schedule.error.message !== '' &&
    users.error !== undefined &&
    users.error.message !== ''
  ) {
    throw new Error(schedule.error.message)
  }
  return (
    <div className={styles.scheduleEditContainer}>
      <EditSchedule schedule={schedule.schedule} users={users.users} />
    </div>
  )
}
