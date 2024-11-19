import {
  SelectPanel,
  type ButtonContentProps,
} from '@/app/[facilityId]/calendar/schedule/[scheduleId]/edit/_components/SelectPanel'
import { FreeTextSelect } from '@/app/[facilityId]/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/FreeTextSelect'
import { OptionSelect } from '@/app/[facilityId]/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/OptionSelect'
import { RecallingRuleSelect } from '@/app/[facilityId]/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/RecallingRuleSelect'
import { ScheduleCategorySelect } from '@/app/[facilityId]/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/ScheduleCategorySelect'
import { ScheduleDateSelect } from '@/app/[facilityId]/calendar/schedule/[scheduleId]/edit/_components/SelectPanel/ScheduleDateSelect'
import InterceptModal from '@/app/_components/InterceptModal'
import { ccCategory, CcCategoryText } from '@/constants/ccCategory'
import { scheduleType } from '@/constants/scheduleType'
import type { RecallingScheduleCreate } from '@/schema/recallingSchedule'
import {
  RecallingFrequency,
  recallingScheduleCreateSchema,
  RecallingScheduleKey,
  VisitRecallingScheduleKey,
} from '@/schema/recallingSchedule'
import type { ScheduleCreate } from '@/schema/schedule'
import {
  scheduleCreateSchema,
  ScheduleKey,
  VisitScheduleKey,
} from '@/schema/schedule'
import type { User } from '@/schema/user'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'

import { CreatePanel } from '@/app/[facilityId]/calendar/schedule/new/_components/CreatePanel'
import { ScheduleCreateFooter } from '@/app/[facilityId]/calendar/schedule/new/_components/ScheduleCreateFooter'
import { TextTab } from '@/app/_components/TextTab'
import { serviceCode } from '@/constants/serviceCode'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useSideTransition } from '@/hooks/useSideTransition'
import type { Patient } from '@/schema/patient'
import styles from './style.module.css'

export type CreateScheduleProps = {
  users: User[]
  patients: Patient[]
  currentUserId: string
  startDate: Date
}

const tabs: ComponentPropsWithoutRef<typeof TextTab>['tabs'] = [
  {
    id: 'normal',
    label: '通常',
  },
  {
    id: 'visit',
    label: '訪問',
  },
] as const

export const CreateSchedule: FC<CreateScheduleProps> = ({
  users,
  patients,
  currentUserId,
  startDate,
}) => {
  const { queryParams } = useQueryParams()
  const { activeTab } = useSideTransition(
    'tab',
    tabs.map((tab) => tab.id),
    queryParams.get('tab') ?? 'visit',
  )
  console.log(activeTab)
  const [currentId, setCurrentId] = useState<
    ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  >(ScheduleKey.ScheduleDate)
  const [isRecallingSchedule, setIsRecallingSchedule] = useState(false)

  const scheduleCreate = useForm<ScheduleCreate>({
    defaultValues: {
      [ScheduleKey.UserId]: currentUserId,
      [ScheduleKey.ScheduleType]:
        activeTab === 'visit' ? scheduleType.visit : scheduleType.normal,
      [ScheduleKey.ScheduleDate]: startDate,
      [ScheduleKey.StartTime]: startDate.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      [ScheduleKey.EndTime]: startDate.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      [ScheduleKey.Title]: '',
      [ScheduleKey.Description]: '',
      ...(activeTab === 'visit'
        ? {
            [VisitScheduleKey.PatientId]: '',
            [VisitScheduleKey.ServiceCode]: serviceCode.訪看I2,
            [VisitScheduleKey.ServiceTime]: 29,
            [VisitScheduleKey.Destination]: '',
            [VisitScheduleKey.IsCanceled]: false,
            [VisitScheduleKey.ScheduleCategory]: undefined,
          }
        : {}),
    } as ScheduleCreate,
    resolver: zodResolver(scheduleCreateSchema),
  })

  const recallingScheduleCreate = useForm<RecallingScheduleCreate>({
    defaultValues: {
      [RecallingScheduleKey.ScheduleType]:
        activeTab === 'visit' ? scheduleType.visit : scheduleType.normal,
      [RecallingScheduleKey.UserId]: currentUserId,
      [RecallingScheduleKey.Title]: '',
      [RecallingScheduleKey.StartTime]: new Date().toISOString(),
      [RecallingScheduleKey.EndTime]: new Date().toISOString(),
      [RecallingScheduleKey.Description]: '',
      [RecallingScheduleKey.StartDate]: new Date(),
      [RecallingScheduleKey.Frequency]: RecallingFrequency.Weekly,
      [RecallingScheduleKey.DayOfWeek]: new Date().getDay(),

      ...(activeTab === 'visit'
        ? {
            [VisitRecallingScheduleKey.PatientId]: '',
            [VisitRecallingScheduleKey.ServiceCode]: serviceCode.訪看I2,
            [VisitRecallingScheduleKey.ServiceTime]: 29,
            [VisitRecallingScheduleKey.Destination]: '',
            [VisitRecallingScheduleKey.ScheduleCategory]: undefined,
          }
        : {}),
    },
    resolver: zodResolver(recallingScheduleCreateSchema),
  })

  useEffect(() => {
    scheduleCreate.setValue(
      ScheduleKey.ScheduleType,
      activeTab === 'visit' ? scheduleType.visit : scheduleType.normal,
    )
    if (scheduleCreate.watch(VisitScheduleKey.ServiceCode) === undefined) {
      scheduleCreate.setValue(VisitScheduleKey.ServiceCode, serviceCode.訪看I2)
    }
    if (scheduleCreate.watch(VisitScheduleKey.ServiceTime) === undefined) {
      scheduleCreate.setValue(VisitScheduleKey.ServiceTime, 29)
    }
    if (scheduleCreate.watch(VisitScheduleKey.Destination) === undefined) {
      scheduleCreate.setValue(VisitScheduleKey.Destination, '')
    }
    if (scheduleCreate.watch(VisitScheduleKey.Destination) === undefined) {
      scheduleCreate.setValue(VisitScheduleKey.Destination, '')
    }
    if (scheduleCreate.watch(VisitScheduleKey.IsCanceled) === undefined) {
      scheduleCreate.setValue(VisitScheduleKey.IsCanceled, false)
    }
    recallingScheduleCreate.setValue(
      RecallingScheduleKey.ScheduleType,
      activeTab === 'visit' ? scheduleType.visit : scheduleType.normal,
    )
    if (
      recallingScheduleCreate.watch(VisitScheduleKey.ServiceCode) === undefined
    ) {
      recallingScheduleCreate.setValue(
        VisitRecallingScheduleKey.ServiceCode,
        serviceCode.訪看I2,
      )
    }
    if (
      recallingScheduleCreate.watch(VisitRecallingScheduleKey.ServiceTime) ===
      undefined
    ) {
      recallingScheduleCreate.setValue(
        VisitRecallingScheduleKey.ServiceTime,
        29,
      )
    }
    if (
      recallingScheduleCreate.watch(VisitRecallingScheduleKey.Destination) ===
      undefined
    ) {
      recallingScheduleCreate.setValue(
        VisitRecallingScheduleKey.Destination,
        '',
      )
    }
  }, [activeTab])

  console.log(scheduleCreate.formState.errors)
  console.log(recallingScheduleCreate.formState.errors)

  const isAccompany =
    scheduleCreate.watch(ScheduleKey.CcCategory) === ccCategory.accompany
  const isHandover =
    scheduleCreate.watch(ScheduleKey.CcCategory) === ccCategory.handover

  const isCcNormal =
    scheduleCreate.watch(ScheduleKey.CcCategory) === ccCategory.normal

  const scheduleEditMap: ButtonContentProps[] = [
    ...(activeTab === 'normal'
      ? [
          {
            id: ScheduleKey.Title,
            label: 'タイトル',
            content: (
              <FreeTextSelect
                content={scheduleCreate.watch(ScheduleKey.Title)}
                placeholder="タイトル"
              />
            ),
          },
        ]
      : []),
    ...(activeTab === 'visit'
      ? [
          {
            id: VisitScheduleKey.PatientId,
            label: '患者',
            content: (
              <OptionSelect
                content={
                  patients?.find(
                    (patient) =>
                      patient.id ===
                      scheduleCreate.watch(VisitScheduleKey.PatientId),
                  )?.name ?? '未選択'
                }
              />
            ),
          },
        ]
      : []),
    {
      id: ScheduleKey.ScheduleDate,
      label: activeTab === 'visit' ? '訪問日時' : '予定日時',
      content: (
        <ScheduleDateSelect
          scheduleDate={scheduleCreate.watch(ScheduleKey.ScheduleDate)}
          startTime={scheduleCreate.watch(ScheduleKey.StartTime)}
          endTime={scheduleCreate.watch(ScheduleKey.EndTime)}
          serviceTime={scheduleCreate.watch(VisitScheduleKey.ServiceTime)}
          serviceCode={scheduleCreate.watch(VisitScheduleKey.ServiceCode)}
          isVisitSchedule={activeTab === 'visit'}
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
                frequency={recallingScheduleCreate.watch(
                  RecallingScheduleKey.Frequency,
                )}
                dayOfWeek={recallingScheduleCreate.watch(
                  RecallingScheduleKey.DayOfWeek,
                )}
                weekOfMonth={recallingScheduleCreate.watch(
                  RecallingScheduleKey.WeekOfMonth,
                )}
                endDate={recallingScheduleCreate.watch(
                  RecallingScheduleKey.EndDate,
                )}
              />
            ),
          },
        ]
      : []),

    {
      id: ScheduleKey.UserId,
      label: activeTab === 'visit' ? '担当者' : '予定者',
      content: (
        <OptionSelect
          content={
            users?.find(
              (user) => user.id === scheduleCreate.watch(ScheduleKey.UserId),
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
              scheduleCreate.watch(ScheduleKey.CcCategory) ?? ccCategory.none
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
                      user.id === scheduleCreate.watch(ScheduleKey.CcUserId),
                  )?.username ?? '未選択'
                }
              />
            ),
          },
        ]
      : []),

    ...(isAccompany && activeTab === 'visit'
      ? [
          {
            id: ScheduleKey.CcUserId,
            label: '同行者',
            content: (
              <OptionSelect
                content={
                  users?.find(
                    (user) =>
                      user.id === scheduleCreate.watch(ScheduleKey.CcUserId),
                  )?.username ?? '未選択'
                }
              />
            ),
          },
        ]
      : []),
    ...(isHandover && activeTab === 'visit'
      ? [
          {
            id: ScheduleKey.CcUserId,
            label: '引き継ぎ先',
            content: (
              <OptionSelect
                content={
                  users?.find(
                    (user) =>
                      user.id === scheduleCreate.watch(ScheduleKey.CcUserId),
                  )?.username ?? '未選択'
                }
              />
            ),
          },
        ]
      : []),
    ...(activeTab === 'visit'
      ? [
          {
            id: VisitScheduleKey.ScheduleCategory,
            label: '訪問の種類',
            content: (
              <ScheduleCategorySelect
                scheduleCategory={scheduleCreate.watch(
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
          content={scheduleCreate.watch(ScheduleKey.Description)}
          placeholder="補足情報"
        />
      ),
    },
  ]

  return (
    <div>
      <InterceptModal
        isDirty={
          Object.keys(scheduleCreate.formState.dirtyFields).length > 0 ||
          Object.keys(recallingScheduleCreate.formState.dirtyFields).length > 0
        }
        headerContent={
          <div className={styles.headerContent}>
            <p className={styles.title}>予定作成</p>
            <TextTab tabs={tabs} defaultTabIndex={0} variant="white" />
          </div>
        }
        stickyFooter={
          <ScheduleCreateFooter
            isRecallingSchedule={isRecallingSchedule}
            scheduleCreate={scheduleCreate}
            recallingScheduleCreate={recallingScheduleCreate}
            scheduleDirtyFields={scheduleCreate.formState.dirtyFields}
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
            <CreatePanel
              control={scheduleCreate.control}
              recallingControl={recallingScheduleCreate.control}
              setValue={scheduleCreate.setValue}
              recallingSetValue={recallingScheduleCreate.setValue}
              currentId={currentId}
              setCurrentId={setCurrentId}
              isRecallingSchedule={isRecallingSchedule}
              isVisitSchedule={activeTab === 'visit'}
            />
          </div>
        </div>
      </InterceptModal>
    </div>
  )
}
