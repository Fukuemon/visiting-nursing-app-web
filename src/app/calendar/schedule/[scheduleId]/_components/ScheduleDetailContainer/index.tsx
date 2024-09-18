'use client'
import { Button } from '@/app/_components/Button'
import InterceptModal from '@/app/_components/InterceptModal'
import { NormalScheduleDetailList } from '@/app/calendar/schedule/[scheduleId]/_components/NomalScheduleDetailList'
import { VisitScheduleDetailList } from '@/app/calendar/schedule/[scheduleId]/_components/VisitScheduleDetailList'
import { ScheduleCategory } from '@/constants/scheduleCatefory'
import { ScheduleType } from '@/constants/scheduleType'
import { ServiceCode } from '@/constants/serviceCode'
import { pagesPath } from '@/utils/$path'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import styles from './style.module.css'

const schedule = {
  user: { name: '田中太郎', id: '1', team: '3' },
  title: '訪看I1 鈴木一郎',
  schedule_type: ScheduleType.visit,
  patient: { name: '鈴木一郎', id: '2' },
  travel_time: 20,
  service_code: ServiceCode.訪看I1,
  start_time: new Date('2024-09-05 11:10:00'),
  end_time: new Date('2024-09-05 11:39:00'),
  schedule_category: ScheduleCategory.normal,
  is_cancelled: false,
  is_overtime_work: false,
  destination: '兵庫県神戸市中央区',
}

export type ScheduleDetailContainerProps = object

export const ScheduleDetailContainer: FC<
  ScheduleDetailContainerProps
> = ({}) => {
  const { scheduleId } = useParams<{ scheduleId: string }>()
  return (
    <div className={styles.scheduleDetailContainer}>
      <InterceptModal
        title={`${schedule.start_time.getFullYear()}/${schedule.start_time.getMonth()}/${schedule.start_time.getDate()} ${schedule.title}`}
        stickyFooter={
          <footer className={styles.footer}>
            <Button
              isAnchor
              size="S"
              href={pagesPath.calendar.schedule._scheduleId(scheduleId).edit.$url().path}
            >
              編集
            </Button>
          </footer>
        }
      >
        {schedule.schedule_type === ScheduleType.visit ||
        schedule.schedule_type === ScheduleType.visitRecalling ? (
          <VisitScheduleDetailList {...schedule} />
        ) : (
          <NormalScheduleDetailList {...schedule} />
        )}
      </InterceptModal>
    </div>
  )
}
