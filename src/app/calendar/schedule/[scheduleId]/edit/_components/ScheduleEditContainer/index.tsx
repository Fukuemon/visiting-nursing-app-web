'use client'
import { Button } from '@/app/_components/Button'
import InterceptModal from '@/app/_components/InterceptModal'
import { NormalScheduleDetailList } from '@/app/calendar/schedule/[scheduleId]/_components/NomalScheduleDetailList'
import { VisitScheduleDetailList } from '@/app/calendar/schedule/[scheduleId]/_components/VisitScheduleDetailList'
import { ScheduleCategory } from '@/constants/scheduleCatefory'
import { ScheduleType } from '@/constants/scheduleType'
import { ServiceCode } from '@/constants/serviceCode'
import { scheduleEditSchema, type ScheduleEdit } from '@/schema/schedule'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './style.module.css'
import { zodResolver } from '@hookform/resolvers/zod'

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

export type ScheduleEditContainerProps = object

export const ScheduleEditContainer: FC<ScheduleEditContainerProps> = ({}) => {
  const { scheduleId } = useParams<{ scheduleId: string }>()
  const { control, watch } = useForm<ScheduleEdit>({
    defaultValues: {
      title: schedule.title
    },
    resolver: zodResolver(scheduleEditSchema),
  })
  return (
    <div className={styles.scheduleEditContainer}>
      <InterceptModal
        title={`${schedule.start_time.getFullYear()}/${schedule.start_time.getMonth()}/${schedule.start_time.getDate()} ${schedule.title}`}
        stickyFooter={
          <footer className={styles.footer}>
            <Button size="S">完了</Button>
          </footer>
        }
      >
        {schedule.schedule_type === ScheduleType.visit ? (
          <VisitScheduleEditList schedule={schedule} />
        ) : (
          <NormalScheduleEditlList schedule={schedule} />
        )}
      </InterceptModal>
    </div>
  )
}
