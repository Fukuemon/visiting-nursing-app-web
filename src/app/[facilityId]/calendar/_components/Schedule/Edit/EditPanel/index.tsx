import { CcCategoryEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/CcCategoryEdit'
import { RecallingRuleEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/RecallingRuleEdit'
import { ScheduleCategoryEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/ScheduleCategoryEdit'
import { ScheduleDateEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/ScheduleDateEdit'
import { ScheduleUserEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/ScheduleUserEdit'
import { ServiceCodeEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/ServiceCodeEdit'
import { TextareaEdit } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel/TextareaEdit'
import { scheduleType } from '@/constants/scheduleType'
import type { ScheduleEdit } from '@/schema/schedule'
import {
  RecallingScheduleKey,
  ScheduleKey,
  VisitScheduleKey,
} from '@/schema/schedule'
import type { FC } from 'react'
import { useEffect } from 'react'
import type { Control, UseFormSetValue } from 'react-hook-form'
import styles from './style.module.css'

export type EditPanelProps = {
  control: Control<ScheduleEdit>
  setValue: UseFormSetValue<ScheduleEdit>
  currentId: ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  setCurrentId: (id: ScheduleKey | VisitScheduleKey) => void
  isVisitSchedule: boolean
  watchScheduleType: scheduleType
}

export const EditPanel: FC<EditPanelProps> = ({
  control,
  setValue,
  currentId,
  setCurrentId,
  isVisitSchedule,
  watchScheduleType,
}) => {
  useEffect(() => {
    if (currentId === null || currentId === undefined) {
      setCurrentId(ScheduleKey.StartDate)
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
        {currentId === ScheduleKey.StartDate && (
          <ScheduleDateEdit
            control={control}
            setValue={setValue}
            dateName={ScheduleKey.StartDate}
            startTimeName={ScheduleKey.StartTime}
            endTimeName={ScheduleKey.EndTime}
            serviceTimeName={VisitScheduleKey.ServiceTime}
            serviceCodeName={VisitScheduleKey.ServiceCode}
            isVisitSchedule={isVisitSchedule}
          />
        )}
        {(watchScheduleType === scheduleType.normalRecalling ||
          watchScheduleType === scheduleType.visitRecalling) &&
          currentId === RecallingScheduleKey.Frequency && (
            <RecallingRuleEdit control={control} setValue={setValue} />
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
        {/* {currentId === VisitScheduleKey.ServiceCode && (
          <ServiceCodeEdit
            control={control}
            name={VisitScheduleKey.ServiceCode}
          />
        )} */}
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
