import { NormalScheduleDetailList } from '@/app/[facilityId]/calendar/_components/Schedule/NomalScheduleDetailList'
import { ScheduleEditModalContainer } from '@/app/[facilityId]/calendar/_components/Schedule/ScheduleEditModalContainer'

import { VisitScheduleDetailList } from '@/app/[facilityId]/calendar/_components/Schedule/VisitScheduleDetailList'
import { Button } from '@/app/_components/Button'
import { Loading } from '@/app/_components/Loading'
import Modal from '@/app/_components/Modal'
import { ScheduleType } from '@/constants/scheduleType'
import { useSchedule } from '@/hooks/api/schedule'
import { type FC } from 'react'

export type ScheduleDetailModalProps = {
  scheduleId: string
  startDate: Date
}

export const ScheduleDetailModal: FC<ScheduleDetailModalProps> = ({
  scheduleId,
  startDate,
}) => {
  const { schedule, error } = useSchedule(scheduleId)

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
          {schedule.scheduleType === ScheduleType.visit ||
          schedule.scheduleType === ScheduleType.visitRecalling ? (
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
