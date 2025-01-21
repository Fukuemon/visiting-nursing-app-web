import InterceptModal from '@/app/_components/InterceptModal'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/app/_components/Button'
import { scheduleType } from '@/constants/scheduleType'
import type { RecallingScheduleCreate, ScheduleCreate } from '@/schema/schedule'
import { ScheduleKey, VisitScheduleKey } from '@/schema/schedule'
import type { UseFormReturn } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import styles from './style.module.css'

async function sendRequest(url: string, { arg }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  })
    .then((res) => {
      if (!res.ok) {
        console.error('Response status:', res.status)
        throw new Error('Network response was not ok')
      }
    })
    .catch((error) => {
      console.error('Error during fetch:', error)
      throw error
    })
}

export type ScheduleCreateFooterProps = {
  scheduleCreate: UseFormReturn<ScheduleCreate>
}

export const ScheduleCreateFooter = ({
  scheduleCreate,
}: ScheduleCreateFooterProps) => {
  const { facilityId } = useParams<{ facilityId: string }>()
  const { trigger } = useSWRMutation(
    process.env.NEXT_PUBLIC_API_URL + `/facilities/${facilityId}/schedules`,
    sendRequest,
  )
  const { trigger: triggerRecalling } = useSWRMutation(
    process.env.NEXT_PUBLIC_API_URL +
      `/facilities/${facilityId}/schedules/recurring`,
    sendRequest,
  )
  const watchScheduleType = scheduleCreate.watch(ScheduleKey.ScheduleType)
  const scheduleDirtyFields = scheduleCreate.formState.dirtyFields
  const router = useRouter()
  const onSubmit = async (data: ScheduleCreate | RecallingScheduleCreate) => {
    console.log(data)
    await trigger({
      date: data[ScheduleKey.StartDate].toISOString().split('T')[0],
      end_time: data[ScheduleKey.EndTime],
      schedule_type_id: data[ScheduleKey.ScheduleType],
      staff_id: data[ScheduleKey.UserId],
      start_time: data[ScheduleKey.StartTime],
      description: data[ScheduleKey.Description],
      title: data[ScheduleKey.Title],
      ...(data[ScheduleKey.ScheduleType] === scheduleType.visit && {
        visit_info: {
          assign_staff_id: data[ScheduleKey.UserId],
          patient_id: data[VisitScheduleKey.PatientId],
          service_code_id: data[VisitScheduleKey.ServiceCodeId],
          companion_id: data[ScheduleKey.CcUserId],
          visit_category_ids: data[VisitScheduleKey.ScheduleCategory],
        },
      }),
    })

    router.back()
  }
  const onRecallingSubmit = async (
    data: ScheduleCreate | RecallingScheduleCreate,
  ) => {
    await triggerRecalling({
      date: data[ScheduleKey.StartDate].toISOString().split('T')[0],
      end_time: data[ScheduleKey.EndTime],
      schedule_type_id: '01JG8Z3XZVD7M11CGETHQNAA6W',
      staff_id: '01JE2J0PNT3MN60M4M2AHPQCPV',
      start_time: data[ScheduleKey.StartTime],
      description: 'テスト',
      title: 'テスト',
      recurring_rule: {
        frequency: 'monthly',
        start_date: '2024-12-12',
        end_date: '2025-12-12',
        day_of_month: 12,
      },
      visit_info: {
        assign_staff_id: '01JE2J0PNT3MN60M4M2AHPQCPV',
        patient_id: '01JG8Y2DBN9X0RFG6D9WE2SNEN',
        service_code_id: '01JBVE7Z0H0E0M6BX3FV1DK69A',
        companion_id: '01JE2H4JCY3T8F02FJRY9H3M3Q',
        visit_category_ids: ['01JG8Y318V9KEYK76VVKHNZJCF'],
      },
    })
    router.back()
  }
  const handleSubmit = () => {
    if (
      watchScheduleType === scheduleType.normalRecalling ||
      watchScheduleType === scheduleType.visitRecalling
    ) {
      scheduleCreate.handleSubmit(onRecallingSubmit)()
    } else {
      scheduleCreate.handleSubmit(onSubmit)()
    }
  }
  const isScheduleDirty = Object.keys(scheduleDirtyFields).length > 0
  return (
    <div className={styles.footer}>
      <div className={styles.save}>
        <InterceptModal.Closure
          isDiv
          onClick={() => {
            handleSubmit()
          }}
        >
          <Button
            disabled={
              !isScheduleDirty &&
              !(
                watchScheduleType === scheduleType.normalRecalling ||
                watchScheduleType === scheduleType.visitRecalling
              )
            }
          >
            保存
          </Button>
        </InterceptModal.Closure>
      </div>
    </div>
  )
}
