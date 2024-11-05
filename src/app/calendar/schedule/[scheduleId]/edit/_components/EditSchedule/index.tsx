import InterceptModal from '@/app/_components/InterceptModal'
import { EditPanel } from '@/app/calendar/schedule/[scheduleId]/edit/_components/EditPanel'
import type { ButtonContentProps } from '@/app/calendar/schedule/[scheduleId]/edit/_components/SelectPanel'
import { SelectPanel } from '@/app/calendar/schedule/[scheduleId]/edit/_components/SelectPanel'
import { FreeTextSelect } from '@/app/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/FreeTextSelect'
import { OptionSelect } from '@/app/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/OptionSelect'
import { RecallingRuleSelect } from '@/app/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/RecallingRuleSelect'
import { ScheduleCategorySelect } from '@/app/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/ScheduleCategorySelect'
import { ScheduleDateSelect } from '@/app/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/ScheduleDateSelect'
import { ccCategory, CcCategoryText } from '@/constants/ccCategory'
import { scheduleType } from '@/constants/scheduleType'
import type {
  RecallingSchedule,
  RecallingScheduleCreate,
  RecallingScheduleEdit,
  VisitRecallingSchedule,
} from '@/schema/recallingSchedule'
import {
  RecallingFrequency,
  recallingScheduleCreateSchema,
  recallingScheduleEditSchema,
  RecallingScheduleKey,
} from '@/schema/recallingSchedule'

import { ScheduleEditFooter } from '@/app/calendar/schedule/[scheduleId]/edit/_components/ScheduleEditFooter'
import type { Schedule, ScheduleEdit, VisitSchedule } from '@/schema/schedule'
import {
  scheduleEditSchema,
  ScheduleKey,
  VisitScheduleKey,
} from '@/schema/schedule'
import type { User } from '@/schema/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './style.module.css'

export type EditScheduleProps = {
  schedule: Schedule
  users: User[]
}

export const EditSchedule: FC<EditScheduleProps> = ({ schedule, users }) => {
  const [currentId, setCurrentId] = useState<
    ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  >(ScheduleKey.ScheduleDate)
  const [isRecallingSchedule, setIsRecallingSchedule] = useState(
    schedule.recallingSchedule !== undefined,
  )

  function isVisitSchedule(schedule: Schedule): schedule is VisitSchedule {
    return schedule.scheduleType === scheduleType.visit
  }

  const scheduleEdit = useForm<ScheduleEdit>({
    defaultValues: {
      userId: schedule.userId,
      scheduleId: schedule.scheduleId,
      recallingScheduleId: schedule.recallingScheduleId,
      scheduleType: schedule.scheduleType,
      scheduleDate: schedule.scheduleDate,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      title: schedule.title,
      description: schedule.description,

      patientId: isVisitSchedule(schedule) ? schedule.patientId : undefined,
      serviceCode: isVisitSchedule(schedule) ? schedule.serviceCode : undefined,
      serviceTime: isVisitSchedule(schedule) ? schedule.serviceTime : undefined,
      destination: isVisitSchedule(schedule) ? schedule.destination : undefined,
      isCanceled: isVisitSchedule(schedule) ? schedule.isCanceled : undefined,
      scheduleCategory: isVisitSchedule(schedule)
        ? schedule.scheduleCategory
        : undefined,
    },
    resolver: zodResolver(scheduleEditSchema),
  })

  const recallingScheduleEdit = useForm<RecallingScheduleEdit>({
    defaultValues: {
      recallingScheduleId: schedule.recallingScheduleId,
      title: schedule.recallingSchedule?.title,
      startTime: schedule.recallingSchedule?.startTime,
      endTime: schedule.recallingSchedule?.endTime,
      description: schedule.recallingSchedule?.description,
      frequency: schedule.recallingSchedule?.frequency,
      dayOfWeek: schedule.recallingSchedule?.dayOfWeek,
      weekOfMonth: schedule.recallingSchedule?.weekOfMonth,
      startDate: schedule.recallingSchedule?.startDate,
      endDate: schedule.recallingSchedule?.endDate,
      userId: schedule.recallingSchedule?.userId,
      scheduleType: schedule.recallingSchedule?.scheduleType,

      serviceCode: isVisitRecallingSchedule(schedule.recallingSchedule)
        ? schedule.recallingSchedule.serviceCode
        : undefined,
    },
    resolver: zodResolver(recallingScheduleEditSchema),
  })

  function isVisitRecallingSchedule(
    schedule?: RecallingSchedule,
  ): schedule is VisitRecallingSchedule {
    return schedule?.scheduleType === scheduleType.visit
  }

  const recallingScheduleCreate = useForm<RecallingScheduleCreate>({
    defaultValues: {
      scheduleType: schedule.scheduleType,
      userId: schedule.userId,
      title: schedule.title,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      description: schedule.description,

      serviceCode: isVisitSchedule(schedule) ? schedule.serviceCode : undefined,
      patientId: isVisitSchedule(schedule) ? schedule.patientId : undefined,
      serviceTime: isVisitSchedule(schedule) ? schedule.serviceTime : undefined,
      destination: isVisitSchedule(schedule) ? schedule.destination : undefined,
      scheduleCategory: isVisitSchedule(schedule)
        ? schedule.scheduleCategory
        : undefined,

      startDate: schedule.scheduleDate,
      frequency: RecallingFrequency.Weekly,
      dayOfWeek: schedule.scheduleDate.getDay(),
    },
    resolver: zodResolver(recallingScheduleCreateSchema),
  })

  console.log(recallingScheduleCreate.formState.errors)
  console.log(scheduleEdit.formState.errors)
  console.log(recallingScheduleEdit.formState.errors)

  const isAccompany =
    scheduleEdit.watch(ScheduleKey.CcCategory) === ccCategory.accompany
  const isHandover =
    scheduleEdit.watch(ScheduleKey.CcCategory) === ccCategory.handover

  const isCcNormal =
    scheduleEdit.watch(ScheduleKey.CcCategory) === ccCategory.normal

  const isScheduleDirty = scheduleEdit.formState.isDirty

  const isRecallingScheduleDirty = recallingScheduleEdit.formState.isDirty
  const isRecallingScheduleCreateDirty =
    recallingScheduleCreate.formState.isDirty
  const scheduleEditMap: ButtonContentProps[] = [
    ...(!isVisitSchedule(schedule)
      ? [
          {
            id: ScheduleKey.Title,
            label: 'タイトル',
            content: (
              <FreeTextSelect
                content={scheduleEdit.watch(ScheduleKey.Title)}
                placeholder="タイトル"
              />
            ),
          },
        ]
      : []),
    {
      id: ScheduleKey.ScheduleDate,
      label: isVisitSchedule(schedule) ? '訪問日時' : '予定日時',
      content: (
        <ScheduleDateSelect
          scheduleDate={scheduleEdit.watch(ScheduleKey.ScheduleDate)}
          startTime={scheduleEdit.watch(ScheduleKey.StartTime)}
          endTime={scheduleEdit.watch(ScheduleKey.EndTime)}
          serviceTime={scheduleEdit.watch(VisitScheduleKey.ServiceTime)}
          serviceCode={scheduleEdit.watch(VisitScheduleKey.ServiceCode)}
          isVisitSchedule={isVisitSchedule(schedule)}
        />
      ),
    },

    ...(isRecallingSchedule
      ? [
          {
            id: RecallingScheduleKey.Frequency,
            label: '繰り返し',
            content: (
              <RecallingRuleSelect
                frequency={
                  schedule.recallingScheduleId === undefined
                    ? recallingScheduleCreate.watch(
                        RecallingScheduleKey.Frequency,
                      )
                    : recallingScheduleEdit.watch(
                        RecallingScheduleKey.Frequency,
                      )
                }
                dayOfWeek={
                  schedule.recallingScheduleId === undefined
                    ? recallingScheduleCreate.watch(
                        RecallingScheduleKey.DayOfWeek,
                      )
                    : recallingScheduleEdit.watch(
                        RecallingScheduleKey.DayOfWeek,
                      )
                }
                weekOfMonth={
                  schedule.recallingScheduleId === undefined
                    ? recallingScheduleCreate.watch(
                        RecallingScheduleKey.WeekOfMonth,
                      )
                    : recallingScheduleEdit.watch(
                        RecallingScheduleKey.WeekOfMonth,
                      )
                }
                endDate={
                  schedule.recallingScheduleId === undefined
                    ? recallingScheduleCreate.watch(
                        RecallingScheduleKey.EndDate,
                      )
                    : recallingScheduleEdit.watch(RecallingScheduleKey.EndDate)
                }
              />
            ),
          },
        ]
      : []),

    {
      id: ScheduleKey.UserId,
      label: isVisitSchedule(schedule) ? '担当者' : '予定者',
      content: (
        <OptionSelect
          content={
            users?.find(
              (user) => user.id === scheduleEdit.watch(ScheduleKey.UserId),
            )?.name ?? '未選択'
          }
        />
      ),
    },
    {
      id: ScheduleKey.CcCategory,
      label: '複製',
      content: (
        <OptionSelect
          content={
            CcCategoryText[
              scheduleEdit.watch(ScheduleKey.CcCategory) ?? ccCategory.none
            ]
          }
        />
      ),
    },
    ...(isCcNormal
      ? [
          {
            id: ScheduleKey.CcUserId,
            label: '複製先',
            content: (
              <OptionSelect
                content={
                  users?.find(
                    (user) =>
                      user.id === scheduleEdit.watch(ScheduleKey.CcUserId),
                  )?.name ?? '未選択'
                }
              />
            ),
          },
        ]
      : []),

    ...(isAccompany && isVisitSchedule(schedule)
      ? [
          {
            id: ScheduleKey.CcUserId,
            label: '同行者',
            content: (
              <OptionSelect
                content={
                  users?.find(
                    (user) =>
                      user.id === scheduleEdit.watch(ScheduleKey.CcUserId),
                  )?.name ?? '未選択'
                }
              />
            ),
          },
        ]
      : []),
    ...(isHandover && isVisitSchedule(schedule)
      ? [
          {
            id: ScheduleKey.CcUserId,
            label: '引き継ぎ先',
            content: (
              <OptionSelect
                content={
                  users?.find(
                    (user) =>
                      user.id === scheduleEdit.watch(ScheduleKey.CcUserId),
                  )?.name ?? '未選択'
                }
              />
            ),
          },
        ]
      : []),
    ...(isVisitSchedule(schedule)
      ? [
          {
            id: VisitScheduleKey.ScheduleCategory,
            label: '訪問の種類',
            content: (
              <ScheduleCategorySelect
                scheduleCategory={scheduleEdit.watch(
                  VisitScheduleKey.ScheduleCategory,
                )}
              />
            ),
          },
        ]
      : []),
    {
      id: ScheduleKey.Description,
      label: '補足情報',
      content: (
        <FreeTextSelect
          content={scheduleEdit.watch(ScheduleKey.Description)}
          placeholder="補足情報"
        />
      ),
    },
  ]

  return (
    <div>
      <InterceptModal
        isDirty={
          isScheduleDirty ||
          isRecallingScheduleDirty ||
          isRecallingScheduleCreateDirty
        }
        headerContent={<p className={styles.heading}>編集</p>}
        stickyFooter={
          <ScheduleEditFooter
            isRecallingSchedule={isRecallingSchedule}
            scheduleEdit={scheduleEdit}
            recallingScheduleEdit={recallingScheduleEdit}
            scheduleDirtyFields={scheduleEdit.formState.dirtyFields}
            recallingScheduleDirtyFields={
              recallingScheduleEdit.formState.dirtyFields
            }
            recallingScheduleCreateDirtyFields={
              recallingScheduleCreate.formState.dirtyFields
            }
            recallingScheduleId={schedule.recallingScheduleId}
            recallingScheduleCreate={recallingScheduleCreate}
          />
        }
      >
        <div className={styles.visitScheduleEdit}>
          <div className={styles.selectPanel}>
            <SelectPanel
              scheduleEditMap={scheduleEditMap}
              currentId={currentId}
              setCurrentId={setCurrentId}
              isRecallingSchedule={isRecallingSchedule}
              setIsRecallingSchedule={setIsRecallingSchedule}
            />
          </div>
          <div className={styles.editPanel}>
            <EditPanel
              control={scheduleEdit.control}
              recallingControl={recallingScheduleEdit.control}
              recallingCreateControl={recallingScheduleCreate.control}
              setValue={scheduleEdit.setValue}
              recallingSetValue={recallingScheduleEdit.setValue}
              recallingCreateSetValue={recallingScheduleCreate.setValue}
              currentId={currentId}
              setCurrentId={setCurrentId}
              isRecallingSchedule={isRecallingSchedule}
              isVisitSchedule={isVisitSchedule(schedule)}
              recallingScheduleId={schedule.recallingScheduleId}
            />
          </div>
        </div>
      </InterceptModal>
    </div>
  )
}
