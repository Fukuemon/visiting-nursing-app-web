'use client'
import { Button } from '@/app/_components/Button'
import InterceptModal from '@/app/_components/InterceptModal'
import { NormalScheduleDetailList } from '@/app/calendar/schedule/[scheduleId]/_components/NomalScheduleDetailList'
import { VisitScheduleDetailList } from '@/app/calendar/schedule/[scheduleId]/_components/VisitScheduleDetailList'
import { ScheduleType } from '@/constants/scheduleType'
import { useSchedule } from '@/hooks/schedule'
import { pagesPath } from '@/utils/$path'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import styles from './style.module.css'

export type ScheduleDetailContainerProps = object

export const ScheduleDetailContainer: FC<
  ScheduleDetailContainerProps
> = ({}) => {
  const { scheduleId } = useParams<{ scheduleId: string }>()
  const { schedule, isLoading, error } = useSchedule(scheduleId)
  if (isLoading || !schedule) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <div className={styles.scheduleDetailContainer}>
      <InterceptModal
        headerContent={schedule.title}
        stickyFooter={
          <footer className={styles.footer}>
            <Button
              isAnchor
              size="M"
              href={
                pagesPath.calendar.schedule._scheduleId(scheduleId).edit.$url()
                  .path
              }
            >
              編集
            </Button>
          </footer>
        }
      >
        {schedule.scheduleType === ScheduleType.visit ? (
          <VisitScheduleDetailList schedule={schedule} />
        ) : (
          <NormalScheduleDetailList schedule={schedule} />
        )}
      </InterceptModal>
    </div>
  )
}
