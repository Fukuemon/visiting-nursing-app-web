import { CcCategoryEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/CcCategoryEdit'
import { RecallingRuleCreate } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/RecallingRuleCreate'
import { SchedulePatientEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/SchedulePatientEdit'
import { ScheduleUserEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/ScheduleUserEdit'
import { TextareaEdit } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel/TextareaEdit'
import { ScheduleCategoryCreate } from '@/app/calendar/schedule/new/_components/CreatePanel/ScheduleCategoryCreate'
import { ScheduleDateCreate } from '@/app/calendar/schedule/new/_components/CreatePanel/ScheduleDateCreate'
import type { RecallingScheduleCreate } from '@/schema/recallingSchedule'
import { RecallingScheduleKey } from '@/schema/recallingSchedule'
import type { ScheduleCreate } from '@/schema/schedule'
import { ScheduleKey, VisitScheduleKey } from '@/schema/schedule'
import type { FC } from 'react'
import { useEffect } from 'react'
import type { Control, UseFormSetValue } from 'react-hook-form'
import styles from './style.module.css'

export type CreatePanelProps = {
  control: Control<ScheduleCreate>
  recallingControl: Control<RecallingScheduleCreate>
  recallingSetValue: UseFormSetValue<RecallingScheduleCreate>
  setValue: UseFormSetValue<ScheduleCreate>
  currentId: ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  setCurrentId: (id: ScheduleKey | VisitScheduleKey) => void
  isRecallingSchedule: boolean
  isVisitSchedule: boolean
}

export const CreatePanel: FC<CreatePanelProps> = ({
  control,
  recallingControl,
  recallingSetValue,
  setValue,
  currentId,
  setCurrentId,
  isRecallingSchedule,
  isVisitSchedule,
}) => {
  useEffect(() => {
    if (currentId === null || currentId === undefined) {
      setCurrentId(ScheduleKey.ScheduleDate)
    }
  }, [currentId, setCurrentId])

  return (
    <div className={styles.createPanel}>
      <div className={styles.container}>
        {currentId === ScheduleKey.Title && (
          <TextareaEdit
            control={control}
            name={ScheduleKey.Title}
            placeholder="タイトル"
          />
        )}
        {currentId === VisitScheduleKey.PatientId && (
          <SchedulePatientEdit
            control={control}
            name={VisitScheduleKey.PatientId}
          />
        )}
        {currentId === ScheduleKey.ScheduleDate && (
          <ScheduleDateCreate
            control={control}
            setValue={setValue}
            dateName={ScheduleKey.ScheduleDate}
            startTimeName={ScheduleKey.StartTime}
            endTimeName={ScheduleKey.EndTime}
            serviceTimeName={VisitScheduleKey.ServiceTime}
            serviceCodeName={VisitScheduleKey.ServiceCode}
            recallingSetValue={recallingSetValue}
            isVisitSchedule={isVisitSchedule}
            isRecallingSchedule={isRecallingSchedule}
          />
        )}
        {isRecallingSchedule &&
          currentId === RecallingScheduleKey.Frequency && (
            <RecallingRuleCreate
              control={recallingControl}
              setValue={recallingSetValue}
            />
          )}

        {currentId === ScheduleKey.UserId && (
          <ScheduleUserEdit control={control} name={ScheduleKey.UserId} />
        )}
        {currentId === ScheduleKey.CcCategory && (
          <CcCategoryEdit
            control={control}
            name={ScheduleKey.CcCategory}
            isVisitSchedule={isVisitSchedule}
          />
        )}
        {currentId === ScheduleKey.CcUserId && (
          <ScheduleUserEdit control={control} name={ScheduleKey.CcUserId} />
        )}
        {currentId === VisitScheduleKey.ScheduleCategory && (
          <ScheduleCategoryCreate control={control} />
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
