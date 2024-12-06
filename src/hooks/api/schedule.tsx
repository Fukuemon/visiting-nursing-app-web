import { scheduleType } from '@/constants/scheduleType'
import { serviceCode } from '@/constants/serviceCode'
import { userIda, userIdb, userIdc, userIdd } from '@/hooks/api/user'
import { RecallingFrequency } from '@/schema/recallingSchedule'
import type { Schedule } from '@/schema/schedule'
import type { Fetcher } from 'swr'
import useSWR from 'swr'
import { ulid } from 'ulid'

const scheduleIda: string = '01JD8PZVY7XK5VG36BTM1K6WG4'
const scheduleIdb: string = '01JD8PZVY71W2RY68YBAVH2MS1'
const scheduleIdc: string = '01JD8Q3KAT7A32JSKZG5GQQ4RW'
const scheduleIdd: string = '01JD8PS14GANH5YHN95BXYDDT9'
const scheduleIde: string = '01JD8PS14GVW5J58N95YEAFNYN'
const scheduleIdf: string = '01JD8Q3KATB81DVSGVBGQ2EFMZ'
const scheduleIdg: string = '01JD8Q3KAVQ79WY08DR7KQMC6J'
const scheduleIdh: string = '01JD8Q3KAVYVEAXT0FQ43ZEQNB'
const scheduleIdi: string = '01JD8Q3KAVM27ASVHEWH3DA9TW'
const scheduleIdj: string = '01JD8Q3KAV15WZE69Y00WKK4GJ'
const scheduleIdk: string = ulid()
const scheduleIdl: string = ulid()
const recallingScheduleIda: string = ulid()
const recallingScheduleIdb: string = ulid()
const patientIda: string = ulid()

const startDate_a = new Date(2024, 10, 6, 11, 10)
const startDate_b = new Date(2024, 10, 6, 9, 10)
const startDate_c = new Date(2024, 10, 6, 12, 10)

const startDate_d = new Date(2024, 10, 6, 11, 10)
const startDate_e = new Date(2024, 10, 6, 13, 10)
const startDate_f = new Date(2024, 10, 6, 15, 10)

const startDate_g = new Date(2024, 10, 6, 11, 10)
const startDate_h = new Date(2024, 10, 6, 12, 30)
const startDate_i = new Date(2024, 10, 6, 14, 10)

const startDate_j = new Date(2024, 10, 6, 11, 10)
const startDate_k = new Date(2024, 10, 6, 13, 30)
const startDate_l = new Date(2024, 10, 6, 15, 10)

const schedule_normal_a: Schedule = {
  scheduleId: scheduleIda,
  userId: userIda,
  title: '会議a',
  scheduleType: scheduleType.normal,
  scheduleDate: startDate_a,
  startTime: startDate_a.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_a.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  description: 'テキストテキスト',
}

const schedule_visit_b: Schedule = {
  scheduleId: scheduleIdb,
  userId: userIda,
  title: '訪看I2 鈴木一郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_b,
  startTime: startDate_b.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_b.toLocaleTimeString('ja-JP', {
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
    startTime: startDate_b.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTime: startDate_b.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: startDate_b.getDay(),
    weekOfMonth: 1,
    startDate: startDate_b,
  },
}

const schedule_visit_c: Schedule = {
  scheduleId: scheduleIdc,
  userId: userIda,
  title: '訪看I2 佐藤二郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_c,
  startTime: startDate_c.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_c.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  serviceTime: 29,
  isCanceled: true,
  destination: '兵庫県神戸市中央区',
  description: '相手都合によりキャンセルしました。',
  recallingScheduleId: recallingScheduleIdb,
  recallingSchedule: {
    recallingScheduleId: recallingScheduleIdb,
    title: '訪看I2 佐藤二郎',
    scheduleType: scheduleType.visit,
    patientId: patientIda,
    serviceCode: serviceCode.訪看I2,
    startTime: startDate_c.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTime: startDate_c.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: startDate_c.getDay(),
    weekOfMonth: 1,
    startDate: startDate_c,
  },
}

const schedule_normal_d: Schedule = {
  scheduleId: scheduleIdd,
  userId: userIdb,
  title: '会議b',
  scheduleType: scheduleType.normal,
  scheduleDate: startDate_d,
  startTime: startDate_d.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_d.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  description: 'テキストテキスト',
}

const schedule_visit_e: Schedule = {
  scheduleId: scheduleIde,
  userId: userIdb,
  title: '訪看I2 伊東三郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_e,
  startTime: startDate_e.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_e.toLocaleTimeString('ja-JP', {
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
    title: '訪看I2 伊東三郎',
    scheduleType: scheduleType.visit,
    patientId: patientIda,
    serviceCode: serviceCode.訪看I2,
    startTime: startDate_e.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTime: startDate_e.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: startDate_e.getDay(),
    weekOfMonth: 1,
    startDate: startDate_e,
  },
}

const schedule_visit_f: Schedule = {
  scheduleId: scheduleIdf,
  userId: userIdb,
  title: '訪看I2 鈴木一郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_f,
  startTime: startDate_f.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_c.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  serviceTime: 29,
  isCanceled: true,
  destination: '兵庫県神戸市中央区',
  description: '相手都合によりキャンセルしました。',
  recallingScheduleId: recallingScheduleIdb,
  recallingSchedule: {
    recallingScheduleId: recallingScheduleIdb,
    title: '訪看I2 鈴木一郎',
    scheduleType: scheduleType.visit,
    patientId: patientIda,
    serviceCode: serviceCode.訪看I2,
    startTime: startDate_f.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTime: startDate_f.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: startDate_f.getDay(),
    weekOfMonth: 1,
    startDate: startDate_f,
  },
}

const schedule_normal_g: Schedule = {
  scheduleId: scheduleIdg,
  userId: userIdc,
  title: '会議c',
  scheduleType: scheduleType.normal,
  scheduleDate: startDate_g,
  startTime: startDate_g.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_g.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  description: 'テキストテキスト',
}

const schedule_visit_h: Schedule = {
  scheduleId: scheduleIdh,
  userId: userIdc,
  title: '訪看I2 鈴木一郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_h,
  startTime: startDate_h.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_h.toLocaleTimeString('ja-JP', {
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
    startTime: startDate_h.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTime: startDate_h.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: startDate_h.getDay(),
    weekOfMonth: 1,
    startDate: startDate_h,
  },
}

const schedule_visit_i: Schedule = {
  scheduleId: scheduleIdi,
  userId: userIdc,
  title: '訪看I2 佐々木四郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_i,
  startTime: startDate_i.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_i.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  serviceTime: 29,
  isCanceled: false,
  destination: '兵庫県神戸市中央区',
  description: '相手都合によりキャンセルしました。',
  recallingScheduleId: recallingScheduleIdb,
  recallingSchedule: {
    recallingScheduleId: recallingScheduleIdb,
    title: '訪看I2 佐々木四郎',
    scheduleType: scheduleType.visit,
    patientId: patientIda,
    serviceCode: serviceCode.訪看I2,
    startTime: startDate_i.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTime: startDate_i.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: startDate_i.getDay(),
    weekOfMonth: 1,
    startDate: startDate_i,
  },
}

const schedule_normal_j: Schedule = {
  scheduleId: scheduleIdj,
  userId: userIdd,
  title: '会議d',
  scheduleType: scheduleType.normal,
  scheduleDate: startDate_j,
  startTime: startDate_j.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_j.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  description: 'テキストテキスト',
}

const schedule_visit_k: Schedule = {
  scheduleId: scheduleIdk,
  userId: userIdd,
  title: '訪看I2 澤村五郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_k,
  startTime: startDate_k.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_k.toLocaleTimeString('ja-JP', {
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
    title: '訪看I2 澤村五郎',
    scheduleType: scheduleType.visit,
    patientId: patientIda,
    serviceCode: serviceCode.訪看I2,
    startTime: startDate_k.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTime: startDate_k.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: startDate_k.getDay(),
    weekOfMonth: 1,
    startDate: startDate_k,
  },
}

const schedule_visit_l: Schedule = {
  scheduleId: scheduleIdl,
  userId: userIdd,
  title: '訪看I2 木村六郎',
  scheduleType: scheduleType.visit,
  patientId: patientIda,
  serviceCode: serviceCode.訪看I2,
  scheduleDate: startDate_l,
  startTime: startDate_l.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  endTime: startDate_l.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  serviceTime: 29,
  isCanceled: false,
  destination: '兵庫県神戸市中央区',
  description: '相手都合によりキャンセルしました。',
  recallingScheduleId: recallingScheduleIdb,
  recallingSchedule: {
    recallingScheduleId: recallingScheduleIdb,
    title: '訪看I2 木村六郎',
    scheduleType: scheduleType.visit,
    patientId: patientIda,
    serviceCode: serviceCode.訪看I2,
    startTime: startDate_l.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTime: startDate_l.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    serviceTime: 29,
    destination: '兵庫県神戸市中央区',
    description: 'テキストテキスト',
    userId: userIda,

    frequency: RecallingFrequency.Monthly,
    dayOfWeek: startDate_l.getDay(),
    weekOfMonth: 1,
    startDate: startDate_l,
  },
}

const scheduleList: Schedule[] = [
  schedule_normal_a,
  schedule_visit_b,
  schedule_visit_c,
  schedule_normal_d,
  schedule_visit_e,
  schedule_visit_f,
  schedule_normal_g,
  schedule_visit_h,
  schedule_visit_i,
  schedule_normal_j,
  schedule_visit_k,
  schedule_visit_l,
]

const scheduleFetcher: Fetcher<Schedule> = async (url: string) => {
  const scheduleId = url.split('/').pop()
  console.log(scheduleId)
  console.log(scheduleIdd)
  const res: Schedule = scheduleList.find(
    (schedule) => schedule.scheduleId === scheduleId,
  )!
  console.log(res)
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
  const res: Schedule[] = scheduleList
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
