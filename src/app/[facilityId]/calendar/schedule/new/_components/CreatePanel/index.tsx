import { CcCategoryEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/CcCategoryEdit'
import { RecallingRuleCreate } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/RecallingRuleCreate'
import { SchedulePatientEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/SchedulePatientEdit'
import { ScheduleUserEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/ScheduleUserEdit'
import { TextareaEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/TextareaEdit'
import { ScheduleCategoryCreate } from '@/app/[facilityId]/calendar/schedule/new/_components/CreatePanel/ScheduleCategoryCreate'
import { ScheduleDateCreate } from '@/app/[facilityId]/calendar/schedule/new/_components/CreatePanel/ScheduleDateCreate'
import type { RecallingScheduleCreate, ScheduleCreate } from '@/schema/schedule'
import {
  RecallingScheduleKey,
  ScheduleKey,
  VisitScheduleKey,
} from '@/schema/schedule'
import type { FC } from 'react'
import { useEffect } from 'react'
import type { Control, UseFormSetValue } from 'react-hook-form'
import styles from './style.module.css'
import { scheduleType } from '@/constants/scheduleType'
import { useServiceCodeList } from '@/hooks/api/serviceCode'
import { ServiceCode } from '@/schema/serviceCode'
import { VisitCategory } from '@/schema/visitCategory'

export type CreatePanelProps = {
  control: Control<ScheduleCreate>
  setValue: UseFormSetValue<ScheduleCreate>
  currentId: ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  setCurrentId: (id: ScheduleKey | VisitScheduleKey) => void
  isVisitSchedule: boolean
  watchScheduleType: scheduleType
  serviceCodes: ServiceCode[]
  visitCategories: VisitCategory[]
}

export const CreatePanel: FC<CreatePanelProps> = ({
  control,
  setValue,
  currentId,
  setCurrentId,
  isVisitSchedule,
  watchScheduleType,
  serviceCodes,
  visitCategories,
}) => {
  useEffect(() => {
    if (currentId === null || currentId === undefined) {
      setCurrentId(ScheduleKey.StartDate)
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
        {currentId === ScheduleKey.StartDate && (
          <ScheduleDateCreate
            control={control}
            setValue={setValue}
            dateName={ScheduleKey.StartDate}
            startTimeName={ScheduleKey.StartTime}
            endTimeName={ScheduleKey.EndTime}
            serviceTimeName={VisitScheduleKey.ServiceTime}
            serviceCodeIdName={VisitScheduleKey.ServiceCodeId}
            isVisitSchedule={isVisitSchedule}
            serviceCodes={serviceCodes}
          />
        )}
        {(watchScheduleType === scheduleType.normalRecalling ||
          watchScheduleType === scheduleType.visitRecalling) &&
          currentId === RecallingScheduleKey.Frequency && (
            <RecallingRuleCreate
              control={control}
              setValue={setValue}
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
          <ScheduleCategoryCreate
            control={control}
            visitCategories={visitCategories}
          />
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
