import { DatePicker } from '@/app/_components/DatePicker'
import { NumberPicker } from '@/app/_components/NumberPicker'
import { TimePicker } from '@/app/_components/TimePicker'
import { ServiceCodeEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/ServiceCodeEdit'
import type { ServiceCode } from '@/constants/serviceCode'
import { ServiceCodeDuration } from '@/constants/serviceCode'
import type {
  RecallingSchedule,
  RecallingScheduleCreate,
} from '@/schema/recallingSchedule'
import { RecallingScheduleKey } from '@/schema/recallingSchedule'
import type { Schedule, ScheduleCreate } from '@/schema/schedule'
import { useEffect } from 'react'
import {
  useWatch,
  type Control,
  type FieldPath,
  type Path,
  type PathValue,
  type UseFormSetValue,
} from 'react-hook-form'
import styles from './style.module.css'

export type ScheduleDateCreateProps = {
  control: Control<ScheduleCreate>
  dateName: FieldPath<ScheduleCreate>
  startTimeName: FieldPath<ScheduleCreate>
  endTimeName: FieldPath<ScheduleCreate>
  serviceTimeName: FieldPath<ScheduleCreate>
  setValue: UseFormSetValue<ScheduleCreate>
  recallingSetValue: UseFormSetValue<RecallingScheduleCreate>
  serviceCodeName: FieldPath<ScheduleCreate>
  isVisitSchedule: boolean
  isRecallingSchedule: boolean
}

export const ScheduleDateCreate = ({
  control,
  setValue,
  dateName,
  startTimeName,
  endTimeName,
  serviceTimeName,
  serviceCodeName,
  recallingSetValue,
  isVisitSchedule,
  isRecallingSchedule,
}: ScheduleDateCreateProps) => {
  const date = useWatch({ control, name: dateName })
  const startTime = useWatch({ control, name: startTimeName }) as
    | string
    | undefined
  const endTime = useWatch({ control, name: endTimeName }) as string | undefined
  const serviceTime = useWatch({ control, name: serviceTimeName }) as
    | number
    | undefined
  const serviceCode = useWatch({ control, name: serviceCodeName }) as
    | ServiceCode
    | undefined

  useEffect(() => {
    // serviceCode変更時
    if (
      serviceCode !== undefined &&
      date !== undefined &&
      startTime !== undefined &&
      endTime !== undefined &&
      serviceTime !== undefined
    ) {
      const duration = ServiceCodeDuration[serviceCode].max
      setValue(
        serviceTimeName,
        duration as PathValue<Schedule, Path<Schedule>>,
        {
          shouldValidate: true,
        },
      )
      const [startHours, startMinutes] = startTime.split(':').map(Number)

      const startDate = new Date(date)
      startDate.setHours(startHours, startMinutes, 0, 0)
      const newEndDate = new Date(startDate.getTime() + serviceTime * 60000)
      const newEndTime = `${newEndDate.getHours().toString().padStart(2, '0')}:${newEndDate.getMinutes().toString().padStart(2, '0')}`

      setValue(endTimeName, newEndTime as PathValue<Schedule, Path<Schedule>>, {
        shouldValidate: true,
      })
    }
  }, [serviceCode, setValue, serviceTimeName])

  useEffect(() => {
    // starttime変更時
    if (
      date !== undefined &&
      startTime !== undefined &&
      endTime !== undefined &&
      serviceTime !== undefined
    ) {
      if (isVisitSchedule) {
        const [startHours, startMinutes] = startTime.split(':').map(Number)

        const startDate = new Date(date)
        startDate.setHours(startHours, startMinutes, 0, 0)

        const newEndDate = new Date(startDate.getTime() + serviceTime * 60000)
        const newEndTime = `${newEndDate.getHours().toString().padStart(2, '0')}:${newEndDate.getMinutes().toString().padStart(2, '0')}`

        setValue(
          endTimeName,
          newEndTime as PathValue<Schedule, Path<Schedule>>,
          {
            shouldValidate: true,
          },
        )
      } else {
        setValue(
          endTimeName,
          startTime as PathValue<Schedule, Path<Schedule>>,
          {
            shouldValidate: true,
          },
        )
      }
    }
  }, [date, startTime, serviceTime, setValue, endTimeName])
  useEffect(() => {
    // serviceTime変更時
    if (serviceCode !== undefined && serviceTime !== undefined) {
      const { min, max } = ServiceCodeDuration[serviceCode]
      if (serviceTime < min) {
        setValue(serviceTimeName, min as PathValue<Schedule, Path<Schedule>>, {
          shouldValidate: true,
        })
      } else if (serviceTime > max) {
        setValue(serviceTimeName, max as PathValue<Schedule, Path<Schedule>>, {
          shouldValidate: true,
        })
      }
    }
  }, [serviceTime, setValue, serviceTimeName])

  useEffect(() => {
    // 訪問日変更時
    if (date !== undefined) {
      const visitDate = new Date(date)
      const dayOfWeek = visitDate.getDay()
      const adjustedDate = visitDate.getDate() + dayOfWeek
      const weekOfMonth = Math.ceil(adjustedDate / 7)
      if (isRecallingSchedule) {
        recallingSetValue(
          RecallingScheduleKey.DayOfWeek,
          dayOfWeek as PathValue<RecallingSchedule, Path<RecallingSchedule>>,
          {
            shouldValidate: true,
          },
        )
        recallingSetValue(
          RecallingScheduleKey.DayOfWeek,
          dayOfWeek as PathValue<RecallingSchedule, Path<RecallingSchedule>>,
          {
            shouldValidate: true,
          },
        )
        recallingSetValue(
          RecallingScheduleKey.WeekOfMonth,
          weekOfMonth as PathValue<RecallingSchedule, Path<RecallingSchedule>>,
          {
            shouldValidate: true,
          },
        )
        recallingSetValue(
          RecallingScheduleKey.WeekOfMonth,
          weekOfMonth as PathValue<RecallingSchedule, Path<RecallingSchedule>>,
          {
            shouldValidate: true,
          },
        )
        recallingSetValue(
          RecallingScheduleKey.StartDate,
          visitDate as PathValue<RecallingSchedule, Path<RecallingSchedule>>,
          {
            shouldValidate: true,
          },
        )
      }
    }
  }, [date, setValue, recallingSetValue, recallingSetValue])

  return (
    <div className={styles.scheduleDateEdit}>
      <h1 className={styles.title}>
        {isVisitSchedule ? '訪問日時' : '予定日時'}
      </h1>
      <div className={styles.inputs}>
        <div className={styles.row}>
          <DatePicker
            label={isVisitSchedule ? '訪問日' : '日付'}
            control={control}
            name={dateName}
            isWide
          />
        </div>
        <div className={styles.row}>
          <TimePicker
            label="開始時間"
            control={control}
            name={startTimeName}
            isWide
          />
          {isVisitSchedule && (
            <NumberPicker
              label="提供時間（分）"
              control={control}
              name={serviceTimeName}
              min={0}
              isWide
            />
          )}
        </div>
        <div className={styles.row}>
          <TimePicker
            label="終了時間"
            control={control}
            name={endTimeName}
            isWide
            disabled={isVisitSchedule}
          />
        </div>
      </div>
      {isVisitSchedule && (
        <div className={styles.serviceCode}>
          <ServiceCodeEdit control={control} name={serviceCodeName} />
        </div>
      )}
    </div>
  )
}
