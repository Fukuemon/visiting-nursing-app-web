import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'
import { scheduleType } from '@/constants/scheduleType'
import type { RecallingScheduleCreate } from '@/schema/schedule'
import {
  ScheduleKey,
  VisitScheduleKey,
  type RecallingScheduleEdit,
  type ScheduleEdit,
} from '@/schema/schedule'
import type { UseFormReturn } from 'react-hook-form'
import styles from './style.module.css'

export type ScheduleEditFooterProps = {
  scheduleEdit: UseFormReturn<ScheduleEdit>
  parentStartDate: Date
}

export const ScheduleEditFooter = ({
  scheduleEdit,
  parentStartDate
}: ScheduleEditFooterProps) => {
  const watchScheduleType = scheduleEdit.watch(ScheduleKey.ScheduleType)
  const scheduleDirtyFields = scheduleEdit.formState.dirtyFields
  const currentStartDate = scheduleEdit.watch(ScheduleKey.StartDate)

  const onSubmit = async (
    data: ScheduleEdit | RecallingScheduleEdit | RecallingScheduleCreate,
  ) => {
    console.log(data)
  }
  const onCancel = async (data: ScheduleEdit) => {
    console.log(data)
  }
  const onDelete = async (data: ScheduleEdit) => {
    if (!window.confirm('本当に削除しますか？')) {
      return
    }
    console.log(data)
  }
  const handleSubmit = () => {
    if (
      (watchScheduleType === scheduleType.normalRecalling || 
       watchScheduleType === scheduleType.visitRecalling) &&
      scheduleDirtyFields.startDate !== undefined &&
      scheduleEdit.formState.defaultValues?.startDate !== null &&
      scheduleEdit.formState.defaultValues?.startDate !== undefined
    ) {
      // 繰り返しの開始時間を変更
      const defaultStartDate = scheduleEdit.formState.defaultValues.startDate
      const diffTime = currentStartDate.getTime() - defaultStartDate.getTime()

      const newParentStartDate = new Date(parentStartDate.getTime() + diffTime)

      scheduleEdit.setValue(ScheduleKey.StartDate, newParentStartDate)
    } else if (
      (watchScheduleType === scheduleType.visit ||
        watchScheduleType === scheduleType.normal) &&
      Boolean(scheduleDirtyFields.scheduleType)
    ) {
      // 繰り返しから通常予定に変更
      if (watchScheduleType === scheduleType.visit) {
        scheduleEdit.setValue(
          ScheduleKey.ScheduleType,
          scheduleType.visitRecalling,
        )
      } else {
        scheduleEdit.setValue(
          ScheduleKey.ScheduleType,
          scheduleType.normalRecalling,
        )
      }
    }
    
    scheduleEdit.handleSubmit(onSubmit)()
  }
  const isScheduleDirty = Object.keys(scheduleDirtyFields).length > 0
  return (
    <div className={styles.footer}>
      <div>
        <Modal.Closure
          isDiv
          onClick={scheduleEdit.handleSubmit((data) => {
            onDelete?.(data)
          })}
        >
          <Button variant="destructive">削除</Button>
        </Modal.Closure>
      </div>
      <div className={styles.save}>
        <Modal.Closure
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
        </Modal.Closure>

        <Modal.Closure
          isDiv
          onClick={() => {
            handleSubmit()
          }}
        >
          <Button disabled={!isScheduleDirty}>保存</Button>
        </Modal.Closure>
      </div>
    </div>
  )
}
