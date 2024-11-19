import { scheduleType } from '@/constants/scheduleType'
import { serviceCode } from '@/constants/serviceCode'
import { userIda } from '@/hooks/api/user'
import { RecallingFrequency } from '@/schema/recallingSchedule'
import type { Schedule } from '@/schema/schedule'
import type { Fetcher } from 'swr'
import useSWR from 'swr'
import { ulid } from 'ulid'

const scheduleIda: string = ulid()
const scheduleIdb: string = ulid()
const recallingScheduleIda: string = ulid()
const patientIda: string = ulid()
const startDate_a = new Date(2024, 10, 6, 8, 10)

const schedule_normal_a: Schedule = {
  scheduleId: scheduleIda,
  userId: userIda,
  title: '会議',
  scheduleType: scheduleType.normal,
  scheduleDate: new Date(),
  startTime: '11:10',
  endTime: '11:39',
  description: 'テキストテキスト',
}

const schedule_visit_a: Schedule = {
  scheduleId: scheduleIda,
  userId: userIda,
  title: '訪看I2 鈴木一郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_a,
  startTime: startDate_a.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_a.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  serviceTime: 29,
  isCanceled: false,
  destination: '兵庫県神戸市中央区',
  description: 'テキストテキスト',
  recallingScheduleId: recallingScheduleIda,
  recallingSchedule: {
    recallingScheduleId: recallingScheduleIda,
    title: '訪看I2 鈴木一郎',
    scheduleType: scheduleType.visit,
    patientId: patientIda,
    serviceCode: serviceCode.訪看I2,
    startTime: '11:10',
    endTime: '11:39',
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: new Date().getDay(),
    weekOfMonth: 1,
    startDate: new Date(),
  },
}

const scheduleFetcher: Fetcher<Schedule> = async (url: string) => {
  const res: Schedule = schedule_visit_a
  return res
  //   const res = await fetch(url)
  //   return res.json()
}

export const useSchedule = (scheduleId: string) => {
  const { data, isLoading, error } = useSWR<Schedule, Error>(
    process.env.NEXT_PUBLIC_API_URL + `/schedules/${scheduleId}`,
    scheduleFetcher,
  )

  return {
    schedule: data,
    isLoading,
    error,
  }
}

const scheduleListFetcher: Fetcher<Schedule[]> = async (url: string) => {
  const res: Schedule[] = [
    {
      userId: 'a',
      scheduleId: '1',
      title: '訪看I2 鈴木一郎',
      scheduleType: scheduleType.visit,
      patientId: '2',
      serviceCode: serviceCode.訪看I2,
      scheduleDate: new Date(),
      startTime: '11:10',
      endTime: '11:39',
      serviceTime: 29,
      isCanceled: false,
      destination: '兵庫県神戸市中央区',
      description: 'テキストテキスト',
    },
    {
      userId: 'a',
      scheduleId: '2',
      title: '訪看I2 鈴木二郎',
      scheduleType: scheduleType.visit,
      patientId: '3',
      serviceCode: serviceCode.訪看I2,
      scheduleDate: new Date(),
      startTime: '10:10',
      endTime: '10:39',
      serviceTime: 29,
      isCanceled: false,
      destination: '兵庫県神戸市中央区',
      description: 'テキストテキスト',
    },
    {
      userId: 'a',
      scheduleId: '3',
      title: '訪看I2 鈴木三郎',
      scheduleType: scheduleType.visit,
      patientId: '4',
      serviceCode: serviceCode.訪看I2,
      scheduleDate: new Date(),
      startTime: '12:10',
      endTime: '12:39',
      serviceTime: 29,
      isCanceled: false,
      destination: '兵庫県神戸市中央区',
      description: 'テキストテキスト',
    },
  ]
  return res
}

export const useScheduleList = () => {
  const { data, isLoading, error } = useSWR<Schedule[], Error>(
    process.env.NEXT_PUBLIC_API_URL + `/schedules`,
    scheduleListFetcher,
  )

  return {
    schedules: data,
    isLoading,
    error,
  }
}
