'use client'
import { ScheduleEditModal } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/ScheduleEditModal'
import { useUserList } from '@/hooks/api/user'
import type { RecallingSchedule, Schedule } from '@/schema/schedule'
import { useParams } from 'next/navigation'
import type { FC } from 'react'

export type ScheduleEditModalContainerProps = {
  schedule: Schedule | RecallingSchedule
  startDate: Date
}

export const ScheduleEditModalContainer: FC<
  ScheduleEditModalContainerProps
> = ({ schedule, startDate }) => {
  const { facilityId } = useParams<{ facilityId: string }>()

  const users = useUserList([facilityId, '', '', '', ''])
  if (schedule === undefined || users.users === undefined)
    return <div>Loading...</div>
  if (users.error !== undefined && users.error.message !== '') {
    throw new Error(users.error.message)
  }
  return (
    <ScheduleEditModal
      schedule={schedule}
      users={users.users}
      startDate={startDate}
    />
  )
}
