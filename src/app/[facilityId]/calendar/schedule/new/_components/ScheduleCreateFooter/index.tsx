import InterceptModal from '@/app/_components/InterceptModal'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/_components/Button'
import type { RecallingScheduleCreate } from '@/schema/recallingSchedule'
import {
  RecallingScheduleKey,
  VisitRecallingScheduleKey,
} from '@/schema/recallingSchedule'
import type { ScheduleCreate } from '@/schema/schedule'
import { ScheduleKey, VisitScheduleKey } from '@/schema/schedule'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import styles from './style.module.css'

export type ScheduleCreateFooterProps = {
  isRecallingSchedule: boolean
  scheduleCreate: UseFormReturn<ScheduleCreate>
  recallingScheduleCreate: UseFormReturn<RecallingScheduleCreate>
  scheduleDirtyFields: FieldValues
}

export const ScheduleCreateFooter = ({
  isRecallingSchedule,
  scheduleCreate,
  recallingScheduleCreate,
  scheduleDirtyFields,
}: ScheduleCreateFooterProps) => {
  const router = useRouter()
  const onSubmit = async (data: ScheduleCreate | RecallingScheduleCreate) => {
    console.log(data)
    router.back()
  }
  const handleSubmit = () => {
    if (isRecallingSchedule) {
      recallingScheduleCreate.handleSubmit(onSubmit)()
      scheduleCreate.handleSubmit(onSubmit)()
    } else {
      scheduleCreate.handleSubmit(onSubmit)()
    }
  }
  const isScheduleDirty = Object.keys(scheduleDirtyFields).length > 0
  return (
    <div className={styles.footer}>
      <div className={styles.save}>
        <InterceptModal.Closure
          isDiv
          onClick={() => {
            if (isRecallingSchedule) {
              recallingScheduleCreate.setValue(
                RecallingScheduleKey.Description,
                scheduleCreate.watch(ScheduleKey.Description),
              )
              recallingScheduleCreate.setValue(
                RecallingScheduleKey.Title,
                scheduleCreate.watch(ScheduleKey.Title),
              )
              recallingScheduleCreate.setValue(
                RecallingScheduleKey.StartTime,
                scheduleCreate.watch(ScheduleKey.StartTime),
              )
              recallingScheduleCreate.setValue(
                RecallingScheduleKey.EndTime,
                scheduleCreate.watch(ScheduleKey.EndTime),
              )
              recallingScheduleCreate.setValue(
                VisitRecallingScheduleKey.ServiceCode,
                scheduleCreate.watch(VisitScheduleKey.ServiceCode),
              )
              recallingScheduleCreate.setValue(
                RecallingScheduleKey.StartDate,
                scheduleCreate.watch(ScheduleKey.ScheduleDate),
              )
              recallingScheduleCreate.setValue(
                VisitRecallingScheduleKey.PatientId,
                scheduleCreate.watch(VisitScheduleKey.PatientId),
              )
            }
            handleSubmit()
          }}
        >
          <Button disabled={!isScheduleDirty && !isRecallingSchedule}>
            保存
          </Button>
        </InterceptModal.Closure>
      </div>
    </div>
  )
}
