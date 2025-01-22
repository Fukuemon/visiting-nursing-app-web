import {
  SelectPanel,
  type ButtonContentProps,
} from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel'
import { FreeTextSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/FreeTextSelect'
import { OptionSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/OptionSelect'
import { RecallingRuleSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/RecallingRuleSelect'
import { ScheduleCategorySelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/ScheduleCategorySelect'
import { ScheduleDateSelect } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/SelectPanel/ScheduleDateSelect'
import InterceptModal from '@/app/_components/InterceptModal'
import { ccCategory, CcCategoryText } from '@/constants/ccCategory'
import { scheduleType } from '@/constants/scheduleType'
import type { RecallingScheduleCreate, ScheduleCreate } from '@/schema/schedule'
import {
  RecallingFrequency,
  recallingScheduleCreateSchema,
  RecallingScheduleKey,
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
import { useQueryParams } from '@/hooks/useQueryParams'
import { useSideTransition } from '@/hooks/useSideTransition'
import type { Patient } from '@/schema/patient'
import styles from './style.module.css'
import { useServiceCodeList } from '@/hooks/api/serviceCode'
import { ServiceCode } from '@/schema/serviceCode'
import { VisitCategory } from '@/schema/visitCategory'

export type CreateScheduleProps = {
  users: User[]
  patients: Patient[]
  serviceCodes: ServiceCode[]
  currentUserId: string
  startDate: Date
  endTime: string
  initialUserId: string | null
  visitCategories: VisitCategory[]
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
  serviceCodes,
  visitCategories,
  currentUserId,
  startDate,
  endTime,
  initialUserId,
}) => {
  const { queryParams } = useQueryParams()
  const { activeTab } = useSideTransition(
    'tab',
    tabs.map((tab) => tab.id),
    queryParams.get('tab') ?? 'visit',
  )
  const [currentId, setCurrentId] = useState<
    ScheduleKey | VisitScheduleKey | RecallingScheduleKey | undefined
  >(ScheduleKey.StartDate)

  const scheduleCreate = useForm<ScheduleCreate>({
    defaultValues: {
      [ScheduleKey.UserId]: initialUserId ?? currentUserId,
      [ScheduleKey.ScheduleType]:
        activeTab === 'visit' ? scheduleType.visit : scheduleType.normal,
      [ScheduleKey.StartDate]: startDate,
      [ScheduleKey.StartTime]: startDate.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      [ScheduleKey.EndTime]: endTime,
      [ScheduleKey.Title]: '',
      [ScheduleKey.Description]: '',
      [VisitScheduleKey.ServiceCodeId]: serviceCodes[0].id,
      [VisitScheduleKey.PatientId]: patients[0].id,
      [VisitScheduleKey.ServiceTime]: 29,
      [VisitScheduleKey.Destination]: '',
      [VisitScheduleKey.IsCanceled]: false,
      [VisitScheduleKey.ScheduleCategory]: undefined,
      ...(activeTab === 'visit'
        ? {
            // [VisitScheduleKey.PatientId]: '',
            // [VisitScheduleKey.ServiceCodeId]: '01JBVE7Z0H0E0M6BX3FV1DK69A',
            // [VisitScheduleKey.ServiceTime]: 29,
            // [VisitScheduleKey.Destination]: '',
            // [VisitScheduleKey.IsCanceled]: false,
            // [VisitScheduleKey.ScheduleCategory]: undefined,
          }
        : {}),
    } as ScheduleCreate,
    resolver: zodResolver(scheduleCreateSchema),
  })

  const recallingScheduleCreate = useForm<RecallingScheduleCreate>({
    defaultValues: {
      [RecallingScheduleKey.ScheduleType]:
        activeTab === 'visit'
          ? scheduleType.visitRecalling
          : scheduleType.normalRecalling,
      [RecallingScheduleKey.UserId]: currentUserId,
      [RecallingScheduleKey.Title]: '',
      [RecallingScheduleKey.StartTime]: new Date().toISOString(),
      // [RecallingScheduleKey.EndTime]: endTime,
      [RecallingScheduleKey.Description]: '',
      [RecallingScheduleKey.StartDate]: new Date(),
      [RecallingScheduleKey.Frequency]: RecallingFrequency.Weekly,
      [RecallingScheduleKey.DayOfWeek]: new Date().getDay(),
      [VisitScheduleKey.ServiceCodeId]: '01JBVE7Z0H0E0M6BX3FV1DK69A',

      ...(activeTab === 'visit'
        ? {
            [VisitScheduleKey.PatientId]: '',
            // [VisitScheduleKey.ServiceCodeId]: serviceCodes[0].id,
            [VisitScheduleKey.ServiceTime]: 29,
            [VisitScheduleKey.Destination]: '',
            [VisitScheduleKey.ScheduleCategory]: undefined,
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
    if (scheduleCreate.watch(VisitScheduleKey.ServiceCodeId) === undefined) {
      scheduleCreate.setValue(VisitScheduleKey.ServiceCodeId, '')
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
      activeTab === 'visit'
        ? (scheduleType.visitRecalling as never)
        : (scheduleType.normalRecalling as never),
    )
    if (
      recallingScheduleCreate.watch(VisitScheduleKey.ServiceCodeId) === undefined
    ) {
      recallingScheduleCreate.setValue(
        VisitScheduleKey.ServiceCodeId,
        '',
      )
    }
    if (
      recallingScheduleCreate.watch(VisitScheduleKey.ServiceTime) === undefined
    ) {
      recallingScheduleCreate.setValue(VisitScheduleKey.ServiceTime, 29)
    }
    if (
      recallingScheduleCreate.watch(VisitScheduleKey.Destination) === undefined
    ) {
      recallingScheduleCreate.setValue(VisitScheduleKey.Destination, '')
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

  const watchScheduleType = scheduleCreate.watch(ScheduleKey.ScheduleType)
  const watchRecallingFrequency = scheduleCreate.watch(
    RecallingScheduleKey.Frequency,
  )

  // console.log(scheduleCreate.watch(ScheduleKey.UserId))
  // console.log(users)
  // console.log('serviceCode', serviceCodes[0].id)
  // console.log('endTime', endTime)
  // console.log('watchEndTime', scheduleCreate.watch(ScheduleKey.EndTime))
  // console.log(scheduleCreate.watch(VisitScheduleKey.ServiceCodeId))
  // console.log(scheduleCreate.watch(VisitScheduleKey.ServiceTime))

  console.log('scheduleCategory',scheduleCreate.watch(VisitScheduleKey.ScheduleCategory))

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
      id: ScheduleKey.StartDate,
      label: activeTab === 'visit' ? '訪問日時' : '予定日時',
      content: (
        <ScheduleDateSelect
          startDate={scheduleCreate.watch(ScheduleKey.StartDate)}
          startTime={scheduleCreate.watch(ScheduleKey.StartTime)}
          endTime={scheduleCreate.watch(ScheduleKey.EndTime)}
          serviceTime={scheduleCreate.watch(VisitScheduleKey.ServiceTime)}
          serviceCode={serviceCodes.find(
            (serviceCode) => serviceCode.id === scheduleCreate.watch(VisitScheduleKey.ServiceCodeId),
          )}
          isVisitSchedule={activeTab === 'visit'}
        />
      ),
    },

    ...(scheduleCreate.watch(ScheduleKey.ScheduleType) ===
      scheduleType.normalRecalling ||
    scheduleCreate.watch(ScheduleKey.ScheduleType) === scheduleType.visitRecalling
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
                visitCategories={visitCategories}
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
            scheduleCreate={scheduleCreate}
          />
        }
      >
        <div className={styles.visitScheduleEdit}>
          <div className={styles.selectPanel}>
            <SelectPanel
              scheduleEditMap={scheduleEditMap}
              currentId={currentId}
              setCurrentId={setCurrentId}
              watchScheduleType={watchScheduleType}
              onToggle={() => {
                if (watchScheduleType === scheduleType.normal) {
                  scheduleCreate.setValue(
                    ScheduleKey.ScheduleType,
                    scheduleType.normalRecalling,
                    {
                      shouldDirty: true,
                    },
                  )
                  if (watchRecallingFrequency === undefined) {
                    scheduleCreate.setValue(
                      RecallingScheduleKey.Frequency,
                      RecallingFrequency.Weekly,
                      {
                        shouldDirty: true,
                      },
                    )
                  }
                } else if (watchScheduleType === scheduleType.visit) {
                  scheduleCreate.setValue(
                    ScheduleKey.ScheduleType,
                    scheduleType.visitRecalling,
                    {
                      shouldDirty: true,
                    },
                  )
                  if (watchRecallingFrequency === undefined) {
                    scheduleCreate.setValue(
                      RecallingScheduleKey.Frequency,
                      RecallingFrequency.Weekly,
                      {
                        shouldDirty: true,
                      },
                    )
                  }
                } else if (watchScheduleType === scheduleType.normalRecalling) {
                  scheduleCreate.setValue(
                    ScheduleKey.ScheduleType,
                    scheduleType.normal,
                    {
                      shouldDirty: true,
                    },
                  )
                } else if (watchScheduleType === scheduleType.visitRecalling) {
                  scheduleCreate.setValue(
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
            <CreatePanel
              control={scheduleCreate.control}
              setValue={scheduleCreate.setValue}
              currentId={currentId}
              setCurrentId={setCurrentId}
              isVisitSchedule={activeTab === 'visit'}
              watchScheduleType={watchScheduleType}
              serviceCodes={serviceCodes}
              visitCategories={visitCategories}
            />
          </div>
        </div>
      </InterceptModal>
    </div>
  )
}
