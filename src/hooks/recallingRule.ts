import { scheduleType } from '@/constants/scheduleType'
import { ServiceCode } from '@/constants/serviceCode'
import type { RecallingSchedule } from '@/schema/recallingSchedule'
import {
  RecallingFrequency,
  RecallingScheduleKey,
} from '@/schema/recallingSchedule'
import type { Fetcher } from 'swr'
import useSWR from 'swr'

const recallingScheduleFetcher: Fetcher<RecallingSchedule> = async (
  url: string,
) => {
  const res: RecallingSchedule = {
    recallingScheduleId: '1',
    title: '訪看I2 鈴木一郎',
    scheduleType: scheduleType.visit,
    patientId: '2',
    serviceCode: ServiceCode.訪看I2,
    startTime: '11:10',
    endTime: '11:39',
    serviceTime: 29,

    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: '1',
    frequency: RecallingFrequency.Weekly,
    dayOfWeek: 1,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2025-06-01'),
  }
  return res
  //   const res = await fetch(url)
  //   return res.json()
}

export const useRecallingSchedule = (recallingScheduleId: string) => {
  const { data, isLoading, error } = useSWR<RecallingSchedule, Error>(
    process.env.NEXT_PUBLIC_API_URL +
      `/recallingSchedules/${recallingScheduleId}`,
    recallingScheduleFetcher,
  )

  return {
    recallingSchedule: data,
    isLoading,
    error,
  }
}
