import { EditPanel } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/EditPanel'
import type { ButtonContentProps } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel'
import { SelectPanel } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel'
import { FreeTextSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/FreeTextSelect'
import { OptionSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/OptionSelect'
import { RecallingRuleSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/RecallingRuleSelect'
import { ScheduleCategorySelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/ScheduleCategorySelect'
import { ScheduleDateSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/ScheduleDateSelect'
import { ccCategory, CcCategoryText } from '@/constants/ccCategory'
import { scheduleType } from '@/constants/scheduleType'
import type {
  RecallingSchedule,
  SingleSchedule,
  VisitRecallingSchedule,
} from '@/schema/schedule'
import { RecallingFrequency, RecallingScheduleKey } from '@/schema/schedule'

import { ScheduleEditFooter } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/ScheduleEditFooter'
import Modal from '@/app/_components/Modal'
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
  return schedule[ScheduleKey.ScheduleType] === scheduleType.visit
}

export function isVisitRecallingSchedule(
  schedule: Schedule | RecallingSchedule,
): schedule is VisitRecallingSchedule {
  return schedule[ScheduleKey.ScheduleType] === scheduleType.visitRecalling
}

export type ScheduleEditModalProps = {
  schedule: Schedule | RecallingSchedule
  users: User[]
  startDate: Date
}

export const ScheduleEditModal: FC<ScheduleEditModalProps> = ({
  schedule,
  users,
  startDate,
}) => {
  const [currentId, setCurrentId] = useState<
    ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  >(ScheduleKey.StartDate)

  const parentStartDate = schedule[ScheduleKey.StartDate]

  const scheduleEdit = useForm<ScheduleEdit>({
    defaultValues: {
      [ScheduleKey.Id]: schedule[ScheduleKey.Id],
      [ScheduleKey.UserId]: schedule[ScheduleKey.UserId],
      [ScheduleKey.ScheduleType]: schedule[ScheduleKey.ScheduleType],
      [ScheduleKey.StartDate]: startDate,
      [ScheduleKey.StartTime]: schedule[ScheduleKey.StartTime],
      [ScheduleKey.EndTime]: schedule[ScheduleKey.EndTime],
      [ScheduleKey.Title]: schedule[ScheduleKey.Title],
      [ScheduleKey.Description]: schedule[ScheduleKey.Description],
      ...(!isSchedule(schedule)
        ? {
            [RecallingScheduleKey.Frequency]:
              schedule[RecallingScheduleKey.Frequency],
            [RecallingScheduleKey.DayOfWeek]:
              schedule[RecallingScheduleKey.DayOfWeek],
            [RecallingScheduleKey.WeekOfMonth]:
              schedule[RecallingScheduleKey.WeekOfMonth],
            [RecallingScheduleKey.EndDate]:
              schedule[RecallingScheduleKey.EndDate],
          }
        : {}),
      ...(isVisitSchedule(schedule)
        ? {
            [VisitScheduleKey.PatientId]: schedule[VisitScheduleKey.PatientId],
            [VisitScheduleKey.ServiceCodeId]:
              schedule[VisitScheduleKey.ServiceCodeId],
            [VisitScheduleKey.ServiceTime]:
              schedule[VisitScheduleKey.ServiceTime],
            [VisitScheduleKey.Destination]:
              schedule[VisitScheduleKey.Destination],
            [VisitScheduleKey.IsCanceled]:
              schedule[VisitScheduleKey.IsCanceled],
            [VisitScheduleKey.ScheduleCategory]:
              schedule[VisitScheduleKey.ScheduleCategory],
          }
        : {}),
    },
    resolver: zodResolver(scheduleEditSchema),
  })

  const scheduleCreate = useForm<ScheduleCreate>({
    defaultValues: {
      [ScheduleKey.UserId]: schedule[ScheduleKey.UserId],
      [ScheduleKey.ScheduleType]: schedule[ScheduleKey.ScheduleType],
      [ScheduleKey.StartDate]: startDate,
      [ScheduleKey.StartTime]: schedule[ScheduleKey.StartTime],
      [ScheduleKey.EndTime]: schedule[ScheduleKey.EndTime],
      [ScheduleKey.Title]: schedule[ScheduleKey.Title],
      [ScheduleKey.Description]: schedule[ScheduleKey.Description],
      ...(!isSchedule(schedule)
        ? {
            [RecallingScheduleKey.Frequency]:
              schedule[RecallingScheduleKey.Frequency],
            [RecallingScheduleKey.DayOfWeek]:
              schedule[RecallingScheduleKey.DayOfWeek],
            [RecallingScheduleKey.WeekOfMonth]:
              schedule[RecallingScheduleKey.WeekOfMonth],
            [RecallingScheduleKey.EndDate]:
              schedule[RecallingScheduleKey.EndDate],
          }
        : {}),
      ...(isVisitSchedule(schedule)
        ? {
            [VisitScheduleKey.PatientId]: schedule[VisitScheduleKey.PatientId],
            [VisitScheduleKey.ServiceCodeId]:
              schedule[VisitScheduleKey.ServiceCodeId],
            [VisitScheduleKey.ServiceTime]:
              schedule[VisitScheduleKey.ServiceTime],
            [VisitScheduleKey.Destination]:
              schedule[VisitScheduleKey.Destination],
            [VisitScheduleKey.IsCanceled]:
              schedule[VisitScheduleKey.IsCanceled],
            [VisitScheduleKey.ScheduleCategory]:
              schedule[VisitScheduleKey.ScheduleCategory],
          }
        : {}),
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

  const watchScheduleType = scheduleEdit.watch(ScheduleKey.ScheduleType)
  const watchRecallingFrequency = scheduleEdit.watch(
    RecallingScheduleKey.Frequency,
  )
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
          serviceCodeId={scheduleEdit.watch(VisitScheduleKey.ServiceCodeId)}
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
      <Modal.Body
        isDirty={isScheduleDirty || scheduleCreateDirty}
        title="編集"
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
              onToggle={() => {
                console.log('toggle')
                if (watchScheduleType === scheduleType.normal) {
                  scheduleEdit.setValue(
                    ScheduleKey.ScheduleType,
                    scheduleType.normalRecalling,
                    {
                      shouldDirty: true,
                    },
                  )
                  if (watchRecallingFrequency === undefined) {
                    scheduleEdit.setValue(
                      RecallingScheduleKey.Frequency,
                      RecallingFrequency.Weekly,
                      {
                        shouldDirty: true,
                      },
                    )
                  }
                } else if (watchScheduleType === scheduleType.visit) {
                  scheduleEdit.setValue(
                    ScheduleKey.ScheduleType,
                    scheduleType.visitRecalling,
                    {
                      shouldDirty: true,
                    },
                  )
                  if (watchRecallingFrequency === undefined) {
                    scheduleEdit.setValue(
                      RecallingScheduleKey.Frequency,
                      RecallingFrequency.Weekly,
                      {
                        shouldDirty: true,
                      },
                    )
                  }
                } else if (watchScheduleType === scheduleType.normalRecalling) {
                  scheduleEdit.setValue(
                    ScheduleKey.ScheduleType,
                    scheduleType.normal,
                    {
                      shouldDirty: true,
                    },
                  )
                } else if (watchScheduleType === scheduleType.visitRecalling) {
                  scheduleEdit.setValue(
                    ScheduleKey.ScheduleType,
                    scheduleType.visit,
                    {
                      shouldDirty: true,
                    },
                  )
                }
              }}
            />
          </div>
          <div className={styles.editPanel}>
            <EditPanel
              control={scheduleEdit.control}
              setValue={scheduleEdit.setValue}
              currentId={currentId}
              setCurrentId={setCurrentId}
              isVisitSchedule={isVisitSchedule(schedule)}
              watchScheduleType={scheduleEdit.watch(ScheduleKey.ScheduleType)}
            />
          </div>
        </div>
      </Modal.Body>
    </div>
  )
}
