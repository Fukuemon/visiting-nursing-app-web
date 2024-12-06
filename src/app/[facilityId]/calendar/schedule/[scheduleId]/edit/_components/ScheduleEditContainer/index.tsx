'use client'
import { EditSchedule } from '@/app/[facilityId]/calendar/schedule/[scheduleId]/edit/_components/EditSchedule'
import { Loading } from '@/app/_components/Loading'
import { useSchedule } from '@/hooks/api/schedule'
import { useUserList } from '@/hooks/api/user'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import styles from './style.module.css'

export type ScheduleEditContainerProps = object

export const ScheduleEditContainer: FC<ScheduleEditContainerProps> = ({}) => {
  const { facilityId } = useParams<{ facilityId: string }>()
  const { scheduleId } = useParams<{ scheduleId: string }>()
  const schedule = useSchedule(scheduleId)
  const users = useUserList([facilityId, '', '', '', ''])
  if (schedule.schedule === undefined || users.users === undefined)
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
      {schedule.schedule === undefined || users.users === undefined ? (
        <Loading />
      ) : (
        <EditSchedule schedule={schedule.schedule} users={users.users} />
      )}
    </div>
  )
}
