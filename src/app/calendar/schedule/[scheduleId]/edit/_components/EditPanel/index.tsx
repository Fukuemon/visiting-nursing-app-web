import { CcCategoryEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/CcCategoryEdit'
import { RecallingRuleCreate } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/RecallingRuleCreate'
import { RecallingRuleEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/RecallingRuleEdit'
import { ScheduleCategoryEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/ScheduleCategoryEdit'
import { ScheduleDateEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/ScheduleDateEdit'
import { ScheduleUserEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/ScheduleUserEdit'
import { ServiceCodeEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/ServiceCodeEdit'
import { TextareaEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/TextareaEdit'
import type {
  RecallingScheduleCreate,
  RecallingScheduleEdit,
} from '@/schema/recallingSchedule'
import { RecallingScheduleKey } from '@/schema/recallingSchedule'
import type { ScheduleEdit } from '@/schema/schedule'
import { ScheduleKey, VisitScheduleKey } from '@/schema/schedule'
import type { FC } from 'react'
import { useEffect } from 'react'
import type { Control, UseFormSetValue } from 'react-hook-form'
import styles from './style.module.css'

export type EditPanelProps = {
  control: Control<ScheduleEdit>
  recallingControl: Control<RecallingScheduleEdit>
  recallingCreateControl: Control<RecallingScheduleCreate>
  recallingSetValue: UseFormSetValue<RecallingScheduleEdit>
  recallingCreateSetValue: UseFormSetValue<RecallingScheduleCreate>
  setValue: UseFormSetValue<ScheduleEdit>
  currentId: ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  setCurrentId: (id: ScheduleKey | VisitScheduleKey) => void
  isRecallingSchedule: boolean
  isVisitSchedule: boolean
  recallingScheduleId: string | undefined
}

export const EditPanel: FC<EditPanelProps> = ({
  control,
  recallingControl,
  recallingCreateControl,
  recallingSetValue,
  recallingCreateSetValue,
  setValue,
  currentId,
  setCurrentId,
  isRecallingSchedule,
  isVisitSchedule,
  recallingScheduleId,
}) => {
  useEffect(() => {
    if (currentId === null || currentId === undefined) {
      setCurrentId(ScheduleKey.ScheduleDate)
    }
  }, [currentId, setCurrentId])

  return (
    <div className={styles.editPanel}>
      <div className={styles.container}>
        {currentId === ScheduleKey.Title && (
          <TextareaEdit
            control={control}
            name={ScheduleKey.Title}
            placeholder="タイトル"
          />
        )}
        {currentId === ScheduleKey.ScheduleDate && (
          <ScheduleDateEdit
            control={control}
            setValue={setValue}
            dateName={ScheduleKey.ScheduleDate}
            startTimeName={ScheduleKey.StartTime}
            endTimeName={ScheduleKey.EndTime}
            serviceTimeName={VisitScheduleKey.ServiceTime}
            serviceCodeName={VisitScheduleKey.ServiceCode}
            recallingSetValue={recallingSetValue}
            recallingCreateSetValue={recallingCreateSetValue}
            isVisitSchedule={isVisitSchedule}
            isRecallingSchedule={isRecallingSchedule}
          />
        )}
        {isRecallingSchedule &&
          Boolean(recallingScheduleId) &&
          currentId === RecallingScheduleKey.Frequency && (
            <RecallingRuleEdit
              control={recallingControl}
              setValue={recallingSetValue}
            />
          )}
        {isRecallingSchedule &&
          recallingScheduleId === undefined &&
          currentId === RecallingScheduleKey.Frequency && (
            <RecallingRuleCreate
              control={recallingCreateControl}
              setValue={recallingCreateSetValue}
            />
          )}

        {currentId === ScheduleKey.UserId && (
          <ScheduleUserEdit control={control} name={ScheduleKey.UserId} />
        )}
        {currentId === ScheduleKey.CcCategory && (
          <CcCategoryEdit control={control} isVisitSchedule={isVisitSchedule} />
        )}
        {currentId === ScheduleKey.CcUserId && (
          <ScheduleUserEdit control={control} name={ScheduleKey.CcUserId} />
        )}
        {currentId === VisitScheduleKey.ServiceCode && (
          <ServiceCodeEdit control={control} />
        )}
        {currentId === VisitScheduleKey.ScheduleCategory && (
          <ScheduleCategoryEdit control={control} />
        )}
        {currentId === ScheduleKey.Description && (
          <TextareaEdit
            control={control}
            name={ScheduleKey.Description}
            placeholder="補足情報を入力してください"
          />
        )}
      </div>
    </div>
  )
}
