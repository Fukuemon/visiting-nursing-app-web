import { NormalScheduleDetailList } from '@/app/[facilityId]/calendar/_components/Schedule/Detail/NomalScheduleDetailList'
import { ScheduleEditModalContainer } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/ScheduleEditModalContainer'

import { VisitScheduleDetailList } from '@/app/[facilityId]/calendar/_components/Schedule/Detail/VisitScheduleDetailList'
import { Button } from '@/app/_components/Button'
import { Loading } from '@/app/_components/Loading'
import Modal from '@/app/_components/Modal'
import { scheduleType } from '@/constants/scheduleType'
import { useSchedule } from '@/hooks/api/schedule'
import { type FC } from 'react'
import { EventImpl } from '@fullcalendar/core/internal'

export type ScheduleDetailModalProps = {
  scheduleId: string
  startDate: Date
}

export const ScheduleDetailModal: FC<ScheduleDetailModalProps> = ({
  scheduleId,
  startDate,
}) => {
  const { schedule, error } = useSchedule(scheduleId)

  console.log('schedule', schedule)

  if (error !== undefined) return <div>Error: {error.message}</div>
  return (
    <Modal.Body
      title={schedule?.title}
      stickyFooter={
        <Modal>
          <Modal.Trigger>
            <Button size="M">編集</Button>
          </Modal.Trigger>
          {schedule !== undefined ? (
            <ScheduleEditModalContainer
              schedule={schedule}
              startDate={startDate}
            />
          ) : (
            <Loading />
          )}
        </Modal>
      }
    >
      {schedule !== undefined ? (
        <div>
          {schedule.visit_info !== null ? (
            <VisitScheduleDetailList
              schedule={schedule}
              startDate={startDate}
            />
          ) : (
            <NormalScheduleDetailList
              schedule={schedule}
              startDate={startDate}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </Modal.Body>
  )
}
