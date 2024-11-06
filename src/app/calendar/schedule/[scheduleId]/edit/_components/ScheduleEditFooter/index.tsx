import InterceptModal from '@/app/_components/InterceptModal'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/_components/Button'
import type { RecallingScheduleCreate } from '@/schema/recallingSchedule'
import {
  RecallingScheduleKey,
  VisitRecallingScheduleKey,
  type RecallingScheduleEdit,
} from '@/schema/recallingSchedule'
import {
  ScheduleKey,
  VisitScheduleKey,
  type ScheduleEdit,
} from '@/schema/schedule'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import styles from './style.module.css'

export type ScheduleEditFooterProps = {
  isRecallingSchedule: boolean
  scheduleEdit: UseFormReturn<ScheduleEdit>
  recallingScheduleEdit: UseFormReturn<RecallingScheduleEdit>
  scheduleDirtyFields: FieldValues
  recallingScheduleDirtyFields: FieldValues
  recallingScheduleCreateDirtyFields: FieldValues
  recallingScheduleId: string | undefined
  recallingScheduleCreate: UseFormReturn<RecallingScheduleCreate>
}

export const ScheduleEditFooter = ({
  isRecallingSchedule,
  scheduleEdit,
  recallingScheduleEdit,
  scheduleDirtyFields,
  recallingScheduleDirtyFields,
  recallingScheduleId,
  recallingScheduleCreate,
  recallingScheduleCreateDirtyFields,
}: ScheduleEditFooterProps) => {
  const router = useRouter()
  const onSubmit = async (
    data: ScheduleEdit | RecallingScheduleEdit | RecallingScheduleCreate,
  ) => {
    console.log(data)
    router.back()
  }
  const onCancel = async (data: ScheduleEdit) => {
    console.log(data)
    router.back()
  }
  const onDelete = async (data: ScheduleEdit) => {
    if (!window.confirm('本当に削除しますか？')) {
      return
    }
    console.log(data)
    router.back()
  }
  const handleSubmit = () => {
    if (isRecallingSchedule && recallingScheduleId !== undefined) {
      recallingScheduleEdit.handleSubmit(onSubmit)()
      scheduleEdit.handleSubmit(onSubmit)()
    } else if (isRecallingSchedule && recallingScheduleId === undefined) {
      recallingScheduleCreate.handleSubmit(onSubmit)()
      scheduleEdit.handleSubmit(onSubmit)()
    } else {
      scheduleEdit.handleSubmit(onSubmit)()
    }
  }
  const isScheduleDirty = Object.keys(scheduleDirtyFields).length > 0
  const isRecallingScheduleDirty =
    Object.keys(recallingScheduleDirtyFields).length > 0
  const isRecallingScheduleCreateDirty =
    Object.keys(recallingScheduleCreateDirtyFields).length > 0
  return (
    <div className={styles.footer}>
      <div>
        <InterceptModal.Closure
          isDiv
          onClick={scheduleEdit.handleSubmit((data) => {
            onDelete?.(data)
          })}
        >
          <Button variant="destructive">削除</Button>
        </InterceptModal.Closure>
      </div>
      <div className={styles.save}>
        <InterceptModal.Closure
          onClick={() => {
            scheduleEdit.setValue(VisitScheduleKey.IsCanceled, true)
            scheduleEdit.handleSubmit((data) => {
              onCancel?.(data)
            })()
          }}
        >
          <Button isDiv variant="secondary">
            キャンセル
          </Button>
        </InterceptModal.Closure>
        {!isRecallingSchedule || recallingScheduleId === undefined ? (
          <InterceptModal.Closure
            isDiv
            onClick={() => {
              if (recallingScheduleId === undefined && isRecallingSchedule) {
                recallingScheduleCreate.setValue(
                  RecallingScheduleKey.Description,
                  scheduleEdit.watch(ScheduleKey.Description),
                )
                recallingScheduleCreate.setValue(
                  RecallingScheduleKey.Title,
                  scheduleEdit.watch(ScheduleKey.Title),
                )
                recallingScheduleCreate.setValue(
                  RecallingScheduleKey.StartTime,
                  scheduleEdit.watch(ScheduleKey.StartTime),
                )
                recallingScheduleCreate.setValue(
                  RecallingScheduleKey.EndTime,
                  scheduleEdit.watch(ScheduleKey.EndTime),
                )
                recallingScheduleCreate.setValue(
                  VisitRecallingScheduleKey.ServiceCode,
                  scheduleEdit.watch(VisitScheduleKey.ServiceCode),
                )
                recallingScheduleCreate.setValue(
                  RecallingScheduleKey.StartDate,
                  scheduleEdit.watch(ScheduleKey.ScheduleDate),
                )
                handleSubmit()
              } else {
                scheduleEdit.setValue(
                  ScheduleKey.RecallingScheduleId,
                  undefined,
                )
                handleSubmit()
              }
            }}
          >
            <Button
              disabled={
                !isScheduleDirty &&
                !isRecallingScheduleCreateDirty &&
                !isRecallingSchedule
              }
            >
              保存
            </Button>
          </InterceptModal.Closure>
        ) : (
          <>
            <InterceptModal.Closure
              isDiv
              onClick={() => {
                scheduleEdit.setValue(
                  ScheduleKey.RecallingScheduleId,
                  undefined,
                )
                handleSubmit()
              }}
            >
              <Button disabled={!isScheduleDirty || isRecallingScheduleDirty}>
                この予定のみ
              </Button>
            </InterceptModal.Closure>
            <InterceptModal.Closure
              isDiv
              onClick={() => {
                recallingScheduleEdit.setValue(
                  RecallingScheduleKey.Description,
                  scheduleEdit.watch(ScheduleKey.Description),
                )
                recallingScheduleEdit.setValue(
                  RecallingScheduleKey.Title,
                  scheduleEdit.watch(ScheduleKey.Title),
                )
                recallingScheduleEdit.setValue(
                  RecallingScheduleKey.StartTime,
                  scheduleEdit.watch(ScheduleKey.StartTime),
                )
                recallingScheduleEdit.setValue(
                  RecallingScheduleKey.EndTime,
                  scheduleEdit.watch(ScheduleKey.EndTime),
                )
                recallingScheduleEdit.setValue(
                  VisitRecallingScheduleKey.ServiceCode,
                  scheduleEdit.watch(VisitScheduleKey.ServiceCode),
                )
                handleSubmit()
              }}
            >
              <Button disabled={!isScheduleDirty && !isRecallingScheduleDirty}>
                全ての予定
              </Button>
            </InterceptModal.Closure>
          </>
        )}
      </div>
    </div>
  )
}
