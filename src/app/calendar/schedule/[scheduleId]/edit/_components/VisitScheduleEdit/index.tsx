import { ButtonContentProps, SelectPanel } from '@/app/calendar/schedule/[scheduleId]/edit/_components/SelectPanel'
import { type ScheduleCategory } from '@/constants/scheduleCatefory'
import { type ScheduleType } from '@/constants/scheduleType'
import type { ServiceCode } from '@/constants/serviceCode'
import type { Patient } from '@/types/patient'
import type { RecallingRule } from '@/types/recallingRule'
import type { User } from '@/types/user'
import { type FC } from 'react'
import styles from './style.module.css'
import { useForm } from 'react-hook-form'
import { ScheduleEdit, ScheduleKey } from '@/schema/schedule'

export type VisitScheduleEditProps = {
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

export const VisitScheduleEdit: FC<VisitScheduleEditProps> = ({
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
}) => {
  const { control, watch } = useForm<ScheduleEdit>({
    defaultValues: {
      user: user.id,
      patient: patient.id,
      serviceCode: service_code,
      startTime: start_time,
      endTime: end_time,
      destination,
      isCanceled: is_cancelled,
      scheduleCategory: schedule_category,

    },
  })
  const scheduleEditMap: ButtonContentProps[] = [
    {
      id: ScheduleKey.User,
      label: '担当者',
      content: (
        <ScheduleUserSelect
          content={watch(ScheduleKey.User)}
        />
      ),
    },
  ]
  return (
    <div className={styles.visitScheduleEdit}>
      <div className={styles.selectPanel}>
        <SelectPanel scheduleEditMap={scheduleEditMap} />
      </div>
      <div>
        <EditPanel control={control} />
      </div>
    </div>
  )
}
