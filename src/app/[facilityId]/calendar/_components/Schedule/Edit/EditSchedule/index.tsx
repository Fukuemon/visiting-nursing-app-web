import { EditPanel } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel'
import type { ButtonContentProps } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel'
import { SelectPanel } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel'
import { FreeTextSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/FreeTextSelect'
import { OptionSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/OptionSelect'
import { RecallingRuleSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/RecallingRuleSelect'
import { ScheduleCategorySelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/ScheduleCategorySelect'
import { ScheduleDateSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/ScheduleDateSelect'
import InterceptModal from '@/app/_components/InterceptModal'
import { ccCategory, CcCategoryText } from '@/constants/ccCategory'
import { scheduleType } from '@/constants/scheduleType'
import type {
  RecallingSchedule,
  SingleSchedule,
  VisitRecallingSchedule,
} from '@/schema/schedule'
import { RecallingFrequency, RecallingScheduleKey } from '@/schema/schedule'

import { ScheduleEditFooter } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/ScheduleEditFooter'
import type {
  Schedule,
  ScheduleCreate,
  ScheduleEdit,
  VisitSchedule,
} from '@/schema/schedule'
import {
  scheduleCreateSchema,
  scheduleEditSchema,
  ScheduleKey,
  VisitScheduleKey,
} from '@/schema/schedule'
import type { User } from '@/schema/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './style.module.css'

export function isSchedule(
  schedule: SingleSchedule | RecallingSchedule,
): schedule is SingleSchedule {
  return !('frequency' in schedule)
}

export function isVisitSchedule(
  schedule: Schedule | RecallingSchedule,
): schedule is VisitSchedule {
  return schedule.scheduleType === scheduleType.visit
}

export function isVisitRecallingSchedule(
  schedule: Schedule | RecallingSchedule,
): schedule is VisitRecallingSchedule {
  return schedule.scheduleType === scheduleType.visitRecalling
}

export type EditScheduleProps = {
  schedule: Schedule | RecallingSchedule
  users: User[]
  startDate: Date
}

export const EditSchedule: FC<EditScheduleProps> = ({
  schedule,
  users,
  startDate,
}) => {
  const [currentId, setCurrentId] = useState<
    ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  >(ScheduleKey.StartDate)

  const parentStartDate = schedule.startDate

  const scheduleEdit = useForm<ScheduleEdit>({
    defaultValues: {
      id: schedule.id,
      userId: schedule.userId,
      scheduleType: schedule.scheduleType,
      startDate,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      title: schedule.title,
      description: schedule.description,
      frequency: !isSchedule(schedule) ? schedule.frequency : undefined,
      dayOfWeek: !isSchedule(schedule) ? schedule.dayOfWeek : undefined,
      weekOfMonth: !isSchedule(schedule) ? schedule.weekOfMonth : undefined,
      endDate: !isSchedule(schedule) ? schedule.endDate : undefined,
      patientId:
        isVisitSchedule(schedule) || isVisitRecallingSchedule(schedule)
          ? schedule.patientId
          : undefined,
      serviceCode:
        isVisitSchedule(schedule) || isVisitRecallingSchedule(schedule)
          ? schedule.serviceCode
          : undefined,
      serviceTime:
        isVisitSchedule(schedule) || isVisitRecallingSchedule(schedule)
          ? schedule.serviceTime
          : undefined,
      destination:
        isVisitSchedule(schedule) || isVisitRecallingSchedule(schedule)
          ? schedule.destination
          : undefined,
      isCanceled:
        isVisitSchedule(schedule) || isVisitRecallingSchedule(schedule)
          ? schedule.isCanceled
          : undefined,
      scheduleCategory:
        isVisitSchedule(schedule) || isVisitRecallingSchedule(schedule)
          ? schedule.scheduleCategory
          : undefined,
    },
    resolver: zodResolver(scheduleEditSchema),
  })

  const scheduleCreate = useForm<ScheduleCreate>({
    defaultValues: isSchedule(schedule)
      ? ({
          [ScheduleKey.UserId]: schedule.userId,
          [ScheduleKey.ScheduleType]: isVisitSchedule(schedule)
            ? scheduleType.visit
            : scheduleType.normal,
          [ScheduleKey.StartDate]: isSchedule(schedule)
            ? schedule.startDate
            : undefined,
          [ScheduleKey.StartTime]: isSchedule(schedule)
            ? schedule.startTime
            : undefined,
          [ScheduleKey.EndTime]: isSchedule(schedule)
            ? schedule.endTime
            : undefined,
          [ScheduleKey.Title]: schedule.title,
          [ScheduleKey.Description]: schedule.description,
          ...(isVisitSchedule(schedule)
            ? {
                [VisitScheduleKey.PatientId]: schedule.patientId,
                [VisitScheduleKey.ServiceCode]: schedule.serviceCode,
                [VisitScheduleKey.ServiceTime]: schedule.serviceTime,
                [VisitScheduleKey.Destination]: schedule.destination,
                [VisitScheduleKey.IsCanceled]: schedule.isCanceled,
                [VisitScheduleKey.ScheduleCategory]: schedule.scheduleCategory,
              }
            : {}),
        } as ScheduleCreate)
      : {
          scheduleType: schedule.scheduleType,
          userId: schedule.userId,
          title: schedule.title,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          description: schedule.description,
          serviceCode: isVisitRecallingSchedule(schedule)
            ? schedule.serviceCode
            : undefined,
          patientId: isVisitRecallingSchedule(schedule)
            ? schedule.patientId
            : undefined,
          serviceTime: isVisitRecallingSchedule(schedule)
            ? schedule.serviceTime
            : undefined,
          destination: isVisitRecallingSchedule(schedule)
            ? schedule.destination
            : undefined,
          scheduleCategory: isVisitRecallingSchedule(schedule)
            ? schedule.scheduleCategory
            : undefined,
          startDate: isVisitRecallingSchedule(schedule)
            ? schedule.startDate
            : undefined,
          frequency: RecallingFrequency.Weekly,
          dayOfWeek: isVisitRecallingSchedule(schedule) ? 1 : undefined,
        },
    resolver: zodResolver(scheduleCreateSchema),
  })

  console.log(scheduleEdit.formState.errors)
  console.log(scheduleCreate.formState.errors)

  const isAccompany =
    scheduleEdit.watch(ScheduleKey.CcCategory) === ccCategory.accompany
  const isHandover =
    scheduleEdit.watch(ScheduleKey.CcCategory) === ccCategory.handover

  const isCcNormal =
    scheduleEdit.watch(ScheduleKey.CcCategory) === ccCategory.normal

  const isScheduleDirty = scheduleEdit.formState.isDirty

  const scheduleCreateDirty = scheduleCreate.formState.isDirty
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
      id: ScheduleKey.StartDate,
      label: isVisitSchedule(schedule) ? '訪問日時' : '予定日時',
      content: (
        <ScheduleDateSelect
          startDate={scheduleEdit.watch(ScheduleKey.StartDate)}
          startTime={scheduleEdit.watch(ScheduleKey.StartTime)}
          endTime={scheduleEdit.watch(ScheduleKey.EndTime)}
          serviceTime={scheduleEdit.watch(VisitScheduleKey.ServiceTime)}
          serviceCode={scheduleEdit.watch(VisitScheduleKey.ServiceCode)}
          isVisitSchedule={isVisitSchedule(schedule)}
        />
      ),
    },

    ...(scheduleEdit.watch(ScheduleKey.ScheduleType) ===
      scheduleType.normalRecalling ||
    scheduleEdit.watch(ScheduleKey.ScheduleType) === scheduleType.visitRecalling
      ? [
          {
            id: RecallingScheduleKey.Frequency,
            label: '繰り返し',
            content: (
              <RecallingRuleSelect
                frequency={
                  schedule.id === undefined
                    ? scheduleCreate.watch(RecallingScheduleKey.Frequency)
                    : scheduleEdit.watch(RecallingScheduleKey.Frequency)
                }
                dayOfWeek={
                  schedule.id === undefined
                    ? scheduleCreate.watch(RecallingScheduleKey.DayOfWeek)
                    : scheduleEdit.watch(RecallingScheduleKey.DayOfWeek)
                }
                weekOfMonth={
                  schedule.id === undefined
                    ? scheduleCreate.watch(RecallingScheduleKey.WeekOfMonth)
                    : scheduleEdit.watch(RecallingScheduleKey.WeekOfMonth)
                }
                endDate={
                  schedule.id === undefined
                    ? scheduleCreate.watch(RecallingScheduleKey.EndDate)
                    : scheduleEdit.watch(RecallingScheduleKey.EndDate)
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
            )?.username ?? '未選択'
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
                  )?.username ?? '未選択'
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
                  )?.username ?? '未選択'
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
                  )?.username ?? '未選択'
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
        isDirty={isScheduleDirty || scheduleCreateDirty}
        headerContent={<p className={styles.heading}>編集</p>}
        stickyFooter={
          <ScheduleEditFooter
            scheduleEdit={scheduleEdit}
            parentStartDate={parentStartDate}
          />
        }
      >
        <div className={styles.visitScheduleEdit}>
          <div className={styles.selectPanel}>
            <SelectPanel
              scheduleEditMap={scheduleEditMap}
              currentId={currentId}
              setCurrentId={setCurrentId}
              watchScheduleType={scheduleEdit.watch(ScheduleKey.ScheduleType)}
              watchRecallingFrequency={scheduleEdit.watch(
                RecallingScheduleKey.Frequency,
              )}
              setValue={scheduleEdit.setValue}
            />
          </div>
          <div className={styles.editPanel}>
            <EditPanel
              control={scheduleEdit.control}
              setValue={scheduleEdit.setValue}
              currentId={currentId}
              setCurrentId={setCurrentId}
              isVisitSchedule={isVisitSchedule(schedule)}
              isSchedule={isSchedule(schedule)}
              watchScheduleType={scheduleEdit.watch(ScheduleKey.ScheduleType)}
            />
          </div>
        </div>
      </InterceptModal>
    </div>
  )
}
