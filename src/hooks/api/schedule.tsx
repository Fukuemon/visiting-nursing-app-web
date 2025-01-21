import { isVisitRecallingSchedule } from '@/app/[facilityId]/calendar/_components/Schedule/Edit/ScheduleEditModal'
import { eventBackgroundColorCode } from '@/constants/eventBackground'
import { scheduleType } from '@/constants/scheduleType'
// import { ServiceCodeDuration } from '@/constants/serviceCode'
import type {
  FetchedSchedule,
  RecurringSchedule,
} from '@/schema/fetchedSchedule'
import type { RecallingSchedule, Schedule } from '@/schema/schedule'
import {
  RecallingFrequency,
  RecallingScheduleKey,
  ScheduleKey,
  VisitScheduleKey,
} from '@/schema/schedule'
import type {
  BackgroundEvent,
  CalendarEvent,
  RecallingCalendarEvent,
} from '@/types/event'
import { datetime, RRule } from 'rrule'
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
const patientIda: string = ulid()

const startDate_a = new Date(2024, 11, 6, 11, 10)
const startDate_aa = new Date(2024, 11, 6, 11, 50)
const startDate_b = new Date(2024, 11, 6, 9, 10)
const startDate_bb = new Date(2024, 11, 6, 9, 39)
const startDate_c = new Date(2024, 11, 6, 12, 10)
const startDate_cc = new Date(2024, 11, 6, 12, 50)

const startDate_d = new Date(2024, 11, 6, 11, 10)
const startDate_e = new Date(2024, 10, 8, 13, 10)
const startDate_ee = new Date(2024, 10, 9, 13, 50)
const startDate_f = new Date(2024, 11, 6, 15, 10)

const startDate_g = new Date(2024, 11, 6, 11, 10)
const startDate_h = new Date(2024, 11, 6, 12, 30)
const startDate_i = new Date(2024, 11, 6, 14, 10)

const startDate_j = new Date(2024, 11, 6, 11, 10)
const startDate_k = new Date(2024, 11, 6, 13, 30)
const startDate_l = new Date(2024, 11, 6, 15, 10)

// const schedule_normal_a: Schedule = {
//   id: scheduleIda,
//   userId: userIda,
//   title: '会議a',
//   scheduleType: scheduleType.normal,
//   startDate: startDate_a,
//   startTime: startDate_a.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_aa.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   description: 'テキストテキスト',
// }

// const schedule_visit_b: Schedule = {
//   // scheduleId: scheduleIdb,
//   // userId: userIda,
//   // title: '訪看I2 鈴木一郎',
//   // scheduleType: scheduleType.visit,
//   // patientId: patientIda,
//   // serviceCode: serviceCode.訪看I2,
//   // scheduleDate: startDate_b,
//   // startTime: startDate_b.toLocaleTimeString('ja-JP', {
//   //   hour: '2-digit',
//   //   minute: '2-digit',
//   // }),
//   // endTime: startDate_b.toLocaleTimeString('ja-JP', {
//   //   hour: '2-digit',
//   //   minute: '2-digit',
//   // }),
//   // serviceTime: 29,
//   // isCanceled: false,
//   // destination: '兵庫県神戸市中央区',
//   // description: 'テキストテキスト',
//   // recallingScheduleId: recallingScheduleIda,
//   // recallingSchedule: {
//   id: scheduleIdb,
//   title: '訪看I2 鈴木一郎',
//   scheduleType: scheduleType.visitRecalling,
//   patientId: patientIda,
//   serviceCode: serviceCode.訪看I2,
//   isCanceled: false,
//   startTime: startDate_b.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_bb.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   serviceTime: 29,
//   destination: '兵庫県神戸市中央区',
//   description: 'テキストテキスト',
//   userId: userIda,

//   frequency: RecallingFrequency.Weekly,
//   // dayOfWeek: startDate_b.getDay(),
//   weekOfMonth: 1,
//   startDate: startDate_b,
//   endDate: new Date(2025, 12, 6),
//   // },
// }

// const schedule_visit_c: Schedule = {
//   // scheduleId: scheduleIdc,
//   // userId: userIda,
//   // title: '訪看I2 佐藤二郎',
//   // scheduleType: scheduleType.visit,
//   // patientId: patientIda,
//   // serviceCode: serviceCode.訪看I2,
//   // scheduleDate: startDate_c,
//   // startTime: startDate_c.toLocaleTimeString('ja-JP', {
//   //   hour: '2-digit',
//   //   minute: '2-digit',
//   // }),
//   // endTime: startDate_c.toLocaleTimeString('ja-JP', {
//   //   hour: '2-digit',
//   //   minute: '2-digit',
//   // }),
//   // serviceTime: 29,
//   // isCanceled: true,
//   // destination: '兵庫県神戸市中央区',
//   // description: '相手都合によりキャンセルしました。',
//   // recallingScheduleId: recallingScheduleIdb,
//   // recallingSchedule: {
//   id: scheduleIdc,
//   title: '会議',
//   scheduleType: scheduleType.normalRecalling,
//   startTime: startDate_c.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_cc.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   description: 'テキストテキスト',
//   userId: userIda,

//   frequency: RecallingFrequency.Weekly,
//   dayOfWeek: startDate_c.getDay(),
//   weekOfMonth: 1,
//   startDate: startDate_c,
//   exdate: [1, 3],
//   // },
// }

// const schedule_normal_d: Schedule = {
//   id: scheduleIdd,
//   userId: userIdb,
//   title: '会議b',
//   scheduleType: scheduleType.normal,
//   startDate: startDate_d,
//   startTime: startDate_d.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_d.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   description: 'テキストテキスト',
// }

// const schedule_visit_e: RecallingSchedule = {
//   // id: scheduleIde,
//   // userId: userIdb,
//   // title: '訪看I2 伊東三郎',
//   // scheduleType: scheduleType.visit,
//   // patientId: patientIda,
//   // serviceCode: serviceCode.訪看I2,
//   // scheduleDate: startDate_e,
//   // startTime: startDate_e.toLocaleTimeString('ja-JP', {
//   //   hour: '2-digit',
//   //   minute: '2-digit',
//   // }),
//   // endTime: startDate_ee.toLocaleTimeString('ja-JP', {
//   //   hour: '2-digit',
//   //   minute: '2-digit',
//   // }),
//   // serviceTime: 29,
//   // isCanceled: false,
//   // destination: '兵庫県神戸市中央区',
//   // description: 'テキストテキスト',
//   // recallingScheduleId: recallingScheduleIda,
//   // recallingSchedule: {
//   id: scheduleIde,
//   title: '訪看I2 伊東三郎',
//   scheduleType: scheduleType.visitRecalling,
//   patientId: patientIda,
//   serviceCode: serviceCode.訪看I2,
//   isCanceled: false,
//   startTime: startDate_e.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_ee.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   serviceTime: 29,
//   destination: '兵庫県神戸市中央区',
//   description: 'テキストテキスト',
//   userId: userIda,

//   frequency: RecallingFrequency.Monthly,
//   dayOfWeek: startDate_e.getDay(),
//   weekOfMonth: 2,
//   startDate: startDate_e,
//   // },
// }

// const schedule_visit_f: Schedule = {
//   id: scheduleIdf,
//   userId: userIdb,
//   title: '訪看I2 鈴木一郎',
//   scheduleType: scheduleType.visit,
//   patientId: patientIda,
//   serviceCode: serviceCode.訪看I2,
//   startDate: startDate_f,
//   startTime: startDate_f.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_c.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   serviceTime: 29,
//   isCanceled: true,
//   destination: '兵庫県神戸市中央区',
//   description: '相手都合によりキャンセルしました。',
//   // recallingSchedule: {
//   //   recallingScheduleId: recallingScheduleIdb,
//   //   title: '訪看I2 鈴木一郎',
//   //   scheduleType: scheduleType.visit,
//   //   patientId: patientIda,
//   //   serviceCode: serviceCode.訪看I2,
//   //   startTime: startDate_f.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   endTime: startDate_f.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   serviceTime: 29,
//   //   destination: '兵庫県神戸市中央区',
//   //   description: 'テキストテキスト',
//   //   userId: userIda,

//   //   frequency: RecallingFrequency.Monthly,
//   //   dayOfWeek: startDate_f.getDay(),
//   //   weekOfMonth: 1,
//   //   startDate: startDate_f,
//   // },
// }

// const schedule_normal_g: Schedule = {
//   id: scheduleIdg,
//   userId: userIdc,
//   title: '会議c',
//   scheduleType: scheduleType.normal,
//   startDate: startDate_g,
//   startTime: startDate_g.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_g.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   description: 'テキストテキスト',
// }

// const schedule_visit_h: Schedule = {
//   id: scheduleIdh,
//   userId: userIdc,
//   title: '訪看I2 鈴木一郎',
//   scheduleType: scheduleType.visit,
//   patientId: patientIda,
//   serviceCode: serviceCode.訪看I2,
//   startDate: startDate_h,
//   startTime: startDate_h.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_h.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   serviceTime: 29,
//   isCanceled: false,
//   destination: '兵庫県神戸市中央区',
//   description: 'テキストテキスト',
//   // recallingSchedule: {
//   //   recallingScheduleId: recallingScheduleIda,
//   //   title: '訪看I2 鈴木一郎',
//   //   scheduleType: scheduleType.visit,
//   //   patientId: patientIda,
//   //   serviceCode: serviceCode.訪看I2,
//   //   startTime: startDate_h.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   endTime: startDate_h.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   serviceTime: 29,
//   //   destination: '兵庫県神戸市中央区',
//   //   description: 'テキストテキスト',
//   //   userId: userIda,

//   //   frequency: RecallingFrequency.Monthly,
//   //   dayOfWeek: startDate_h.getDay(),
//   //   weekOfMonth: 1,
//   //   startDate: startDate_h,
//   // },
// }

// const schedule_visit_i: Schedule = {
//   id: scheduleIdi,
//   userId: userIdc,
//   title: '訪看I2 佐々木四郎',
//   scheduleType: scheduleType.visit,
//   patientId: patientIda,
//   serviceCode: serviceCode.訪看I2,
//   startDate: startDate_i,
//   startTime: startDate_i.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_i.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   serviceTime: 29,
//   isCanceled: false,
//   destination: '兵庫県神戸市中央区',
//   description: '相手都合によりキャンセルしました。',
//   // recallingSchedule: {
//   //   recallingScheduleId: recallingScheduleIdb,
//   //   title: '訪看I2 佐々木四郎',
//   //   scheduleType: scheduleType.visit,
//   //   patientId: patientIda,
//   //   serviceCode: serviceCode.訪看I2,
//   //   startTime: startDate_i.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   endTime: startDate_i.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   serviceTime: 29,
//   //   destination: '兵庫県神戸市中央区',
//   //   description: 'テキストテキスト',
//   //   userId: userIda,

//   //   frequency: RecallingFrequency.Monthly,
//   //   dayOfWeek: startDate_i.getDay(),
//   //   weekOfMonth: 1,
//   //   startDate: startDate_i,
//   // },
// }

// const schedule_normal_j: Schedule = {
//   id: scheduleIdj,
//   userId: userIdd,
//   title: '会議d',
//   scheduleType: scheduleType.normal,
//   startDate: startDate_j,
//   startTime: startDate_j.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_j.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   description: 'テキストテキスト',
// }

// const schedule_visit_k: Schedule = {
//   id: scheduleIdk,
//   userId: userIdd,
//   title: '訪看I2 澤村五郎',
//   scheduleType: scheduleType.visit,
//   patientId: patientIda,
//   serviceCode: serviceCode.訪看I2,
//   startDate: startDate_k,
//   startTime: startDate_k.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_k.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   serviceTime: 29,
//   isCanceled: false,
//   destination: '兵庫県神戸市中央区',
//   description: 'テキストテキスト',
//   // recallingSchedule: {
//   //   recallingScheduleId: recallingScheduleIda,
//   //   title: '訪看I2 澤村五郎',
//   //   scheduleType: scheduleType.visit,
//   //   patientId: patientIda,
//   //   serviceCode: serviceCode.訪看I2,
//   //   startTime: startDate_k.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   endTime: startDate_k.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   serviceTime: 29,
//   //   destination: '兵庫県神戸市中央区',
//   //   description: 'テキストテキスト',
//   //   userId: userIda,

//   //   frequency: RecallingFrequency.Monthly,
//   //   dayOfWeek: startDate_k.getDay(),
//   //   weekOfMonth: 1,
//   //   startDate: startDate_k,
//   // },
// }

// const schedule_visit_l: Schedule = {
//   id: scheduleIdl,
//   userId: userIdd,
//   title: '訪看I2 木村六郎',
//   scheduleType: scheduleType.visit,
//   patientId: patientIda,
//   serviceCode: serviceCode.訪看I2,
//   startDate: startDate_l,
//   startTime: startDate_l.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   endTime: startDate_l.toLocaleTimeString('ja-JP', {
//     hour: '2-digit',
//     minute: '2-digit',
//   }),
//   serviceTime: 29,
//   isCanceled: false,
//   destination: '兵庫県神戸市中央区',
//   description: '相手都合によりキャンセルしました。',
//   // recallingSchedule: {
//   //   recallingScheduleId: recallingScheduleIdb,
//   //   title: '訪看I2 木村六郎',
//   //   scheduleType: scheduleType.visit,
//   //   patientId: patientIda,
//   //   serviceCode: serviceCode.訪看I2,
//   //   startTime: startDate_l.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   endTime: startDate_l.toLocaleTimeString('ja-JP', {
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //   }),
//   //   serviceTime: 29,
//   //   destination: '兵庫県神戸市中央区',
//   //   description: 'テキストテキスト',
//   //   userId: userIda,

//   //   frequency: RecallingFrequency.Monthly,
//   //   dayOfWeek: startDate_l.getDay(),
//   //   weekOfMonth: 1,
//   //   startDate: startDate_l,
//   // },
// }

// const scheduleList: (Schedule | RecallingSchedule)[] = [
//   schedule_normal_a,
//   schedule_visit_b,
//   schedule_visit_c,
//   schedule_normal_d,
//   schedule_visit_e,
//   schedule_visit_f,
//   schedule_normal_g,
//   schedule_visit_h,
//   schedule_visit_i,
//   schedule_normal_j,
//   schedule_visit_k,
//   schedule_visit_l,
// ]

const scheduleFetcher: Fetcher<Schedule | RecallingSchedule> = async (
  url: string,
) => {
  // const scheduleId = url.split('/').pop()
  // const res: Schedule | RecallingSchedule = scheduleList.find(
  //   (schedule) => schedule.id === scheduleId,
  // )!
  // return res
  const res = await fetch(url)
  return res.json()
}

export const useSchedule = (scheduleId: string) => {
  const { data, isLoading, error } = useSWR<
    Schedule | RecallingSchedule,
    Error
  >(
    process.env.NEXT_PUBLIC_API_URL + `/schedules/${scheduleId}`,
    scheduleFetcher,
  )

  return {
    schedule: data,
    isLoading,
    error,
  }
}

const scheduleListFetcher: Fetcher<
  (CalendarEvent | RecallingCalendarEvent | BackgroundEvent)[] | null
> = async (url: string) => {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      return null
    }
    const fetchedSchedules: FetchedSchedule = await res.json()

    // if (
    //   (!Array.isArray(fetchedSchedules.schedules) ||
    //     fetchedSchedules.schedules.length === 0) &&
    //   (!Array.isArray(fetchedSchedules.recurring_schedules) ||
    //     fetchedSchedules.recurring_schedules.length === 0)
    // ) {
    //   console.log('fetchedSchedules', fetchedSchedules)
    //   return null
    // }

    // fetchedSchedules.schedulesとrecurring_schedulesを(Schedule | RecallingSchedule)[]に変換
    const schedules: (Schedule | RecallingSchedule)[] = [
      ...(fetchedSchedules.schedules !== null
        ? fetchedSchedules.schedules.map((fetchedSchedule) => {
            // 日付文字列をDateオブジェクトに変換
            const [year, month, day] = fetchedSchedule.date
              .split('-')
              .map(Number)
            const scheduleDate = new Date(year, month - 1, day)

            // スケジュールの基本情報を変換
            const baseSchedule: Schedule = {
              id: fetchedSchedule.id,
              staff_id: fetchedSchedule.staff_id,
              staff_name: fetchedSchedule.staff_name,
              title: fetchedSchedule.title,
              date: scheduleDate,
              start_time: fetchedSchedule.start_time,
              end_time: fetchedSchedule.end_time,
              description: fetchedSchedule.description,
              schedule_type: scheduleType.normal,
            }

            // 訪問情報がある場合は訪問スケジュールとして変換
            if (fetchedSchedule.visit_info) {
              baseSchedule.schedule_type = scheduleType.visit
              baseSchedule.patientId = fetchedSchedule.visit_info.id
              baseSchedule.patientName = fetchedSchedule.visit_info.patient_name
              baseSchedule.serviceCodeId =
                fetchedSchedule.visit_info.service_code
              baseSchedule.destination = fetchedSchedule.visit_info.route || ''
              baseSchedule.isCanceled = !!fetchedSchedule.cancel_reason
              baseSchedule.serviceTime = 0 // サービス時間は別途計算が必要
            }
            // 通常スケジュールとして変換
            return baseSchedule
          })
        : []),
      ...(fetchedSchedules.recurring_schedules !== null
        ? fetchedSchedules.recurring_schedules.map((recurringSchedule) => {
            // 日付文字列をDateオブジェクトに変換
            const [year, month, day] = recurringSchedule.date
              .split('-')
              .map(Number)
            const scheduleDate = new Date(year, month - 1, day)
            console.log(scheduleDate)
            // 定期スケジュールの基本情報を変換
            const baseRecurringSchedule: RecurringSchedule = {
              id: recurringSchedule.id,
              staff_id: recurringSchedule.staff_id,
              staff_name: recurringSchedule.staff_name,
              title: recurringSchedule.title,
              date: scheduleDate,
              start_time: recurringSchedule.start_time,
              end_time: recurringSchedule.end_time,
              description: recurringSchedule.description,
              schedule_type: recurringSchedule.schedule_type,
              is_over_time_work: recurringSchedule.is_over_time_work,
              visit_info: recurringSchedule.visit_info,
              cancel_reason: recurringSchedule.cancel_reason,
              frequency: recurringSchedule.recurring_rule.frequency,
              days_of_week: recurringSchedule.recurring_rule.days_of_week,
              day_of_month: recurringSchedule.recurring_rule.day_of_month,
              week_of_month: recurringSchedule.recurring_rule.week_of_month,
              start_date: recurringSchedule.recurring_rule.start_date,
              end_date: recurringSchedule.recurring_rule.end_date,
              exclusion_dates: recurringSchedule.exclusion_dates,
            }
            return baseRecurringSchedule
          })
        : []),
    ]
    // console.log('schedules', schedules)

    const calendarEvents = schedules.flatMap(createEvent)
    return calendarEvents
  } catch (error) {
    return null
  }
}

export const useScheduleList = (facilityId: string) => {
  const { data, isLoading, error } = useSWR<
    (CalendarEvent | RecallingCalendarEvent | BackgroundEvent)[] | null,
    Error
  >(
    process.env.NEXT_PUBLIC_API_URL + `/facilities/${facilityId}/schedules`,
    scheduleListFetcher,
  )
  return {
    schedules: data,
    isLoading,
    error,
  }
}

const createEvent = (
  schedule: Schedule | RecallingSchedule,
): (CalendarEvent | RecallingCalendarEvent | BackgroundEvent)[] => {
  let eventBackgroundColor =
    eventBackgroundColorCode[schedule[ScheduleKey.ScheduleType]]
  const startTime =
    parseInt(schedule[ScheduleKey.StartTime].slice(0, 2)) * 60 +
    parseInt(schedule[ScheduleKey.StartTime].slice(3))
  const endTime =
    parseInt(schedule[ScheduleKey.EndTime].slice(0, 2)) * 60 +
    parseInt(schedule[ScheduleKey.EndTime].slice(3))

  const createDateTime = (date: Date, time: string): Date => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth())
    newDate.setHours(parseInt(time.slice(0, 2)))
    newDate.setMinutes(parseInt(time.slice(3)))
    return newDate
  }

  const createBaseEvent = (
    id: string,
    title: string,
    start: Date,
    end: Date,
    backgroundColor: string,
    textColor: string,
    userId: string,
    isCanceled: boolean,
  ): CalendarEvent => ({
    id,
    title,
    allDay: false,
    start,
    end,
    startEditable: true,
    durationEditable: false,
    backgroundColor,
    textColor,
    extendedProps: { userId, isCanceled },
  })

  // console.log('createEvent')
  // console.log('schedule', schedule)

  if (!('frequency' in schedule)) {
    console.log('isSchedule')
    const startDate = createDateTime(
      schedule[ScheduleKey.StartDate],
      schedule[ScheduleKey.StartTime],
    )
    const endDate = createDateTime(
      schedule[ScheduleKey.StartDate],
      schedule[ScheduleKey.EndTime],
    )

    console.log(schedule.schedule_type)

    if (schedule.schedule_type === '01JG8Z4740VMSJXKXPRV3NDR2R') {
      console.log('normal')
      return [
        createBaseEvent(
          schedule.id,
          schedule.title,
          startDate,
          endDate,
          'green',
          'white',
          schedule[ScheduleKey.UserId],
          false,
        ),
      ]
    }

    const textColor = schedule[VisitScheduleKey.IsCanceled] ? 'gray' : 'white'

    if (schedule[VisitScheduleKey.IsCanceled]) {
      eventBackgroundColor = eventBackgroundColorCode.canceled
      console.log('canceled')
      return [
        createBaseEvent(
          schedule.id,
          schedule.description,
          startDate,
          endDate,
          eventBackgroundColor,
          textColor,
          schedule[ScheduleKey.UserId],
          schedule[VisitScheduleKey.IsCanceled],
        ),
      ]
    }
    console.log('visit')
    return [
      createBaseEvent(
        schedule.id,
        schedule.patientName,
        startDate,
        endDate,
        'blue',
        textColor,
        schedule[ScheduleKey.UserId],
        schedule[VisitScheduleKey.IsCanceled],
      ),
    ]
  }

  const dtstart = datetime(
    schedule[RecallingScheduleKey.StartDate].getFullYear(),
    schedule[RecallingScheduleKey.StartDate].getMonth() + 1,
    schedule[RecallingScheduleKey.StartDate].getDate(),
    parseInt(schedule[RecallingScheduleKey.StartTime].slice(0, 2)),
    parseInt(schedule[RecallingScheduleKey.StartTime].slice(3)),
    0,
  )
  console.log('dtstart', dtstart)
  const rrule = new RRule({
    freq:
      schedule[RecallingScheduleKey.Frequency] === RecallingFrequency.Weekly
        ? RRule.WEEKLY
        : RRule.MONTHLY,
    interval: 1,
    dtstart,
    until: schedule[RecallingScheduleKey.EndDate],
  })

  const dates = rrule.all()
  const exdate =
    schedule[RecallingScheduleKey.Exdate]?.map((index) =>
      dates[index].toISOString().slice(0, 19),
    ) ?? []

  const createRecurringEvents = (duration: number, backgroundColor: string) => {
    const backgroundEvent: BackgroundEvent = {
      id: `${schedule.id}-background`,
      title: schedule.title,
      allDay: false,
      rrule: {
        freq: RecallingFrequency.Weekly,
        interval: 1,
        dtstart,
        until:
          schedule[RecallingScheduleKey.EndDate] !== undefined
            ? schedule[RecallingScheduleKey.EndDate]
            : datetime(
                schedule[RecallingScheduleKey.StartDate].getFullYear() + 1,
                schedule[RecallingScheduleKey.StartDate].getMonth() + 1,
                schedule[RecallingScheduleKey.StartDate].getDate(),
                parseInt(schedule[RecallingScheduleKey.StartTime].slice(0, 2)),
                parseInt(schedule[RecallingScheduleKey.StartTime].slice(3)),
                0,
              ),
      },
      duration: { minute: duration },
      startEditable: false,
      display: 'background',
      extendedProps: {
        userId: schedule[RecallingScheduleKey.UserId],
        isCanceled: false,
      },
    }

    if (schedule.schedule_type === '01JG8Z4740VMSJXKXPRV3NDR2R') {
      console.log('normal')
      return [
        createBaseEvent(
          schedule.id,
          schedule.title,
          startDate,
          endDate,
          'green',
          'white',
          schedule[ScheduleKey.UserId],
          false,
        ),
      ]
    }

    const recallingEvent: RecallingCalendarEvent = {
      id: schedule.id,
      title: 'test',
      allDay: false,
      backgroundColor,
      rrule: {
        freq: schedule[RecallingScheduleKey.Frequency],
        interval: 1,
        dtstart,
        byweekday: [dtstart.getDay() - 1],
        bysetpos:
          schedule[RecallingScheduleKey.Frequency] ===
          RecallingFrequency.Monthly
            ? Math.floor((dtstart.getDate() - 1) / 7) + 1
            : undefined,
        until:
          schedule[RecallingScheduleKey.EndDate] !== undefined
            ? schedule[RecallingScheduleKey.EndDate]
            : datetime(
                schedule[RecallingScheduleKey.StartDate].getFullYear() + 1,
                schedule[RecallingScheduleKey.StartDate].getMonth() + 1,
                schedule[RecallingScheduleKey.StartDate].getDate(),
                parseInt(schedule[RecallingScheduleKey.StartTime].slice(0, 2)),
                parseInt(schedule[RecallingScheduleKey.StartTime].slice(3)),
                0,
              ),
      },
      duration: { minute: duration },
      exdate,
      startEditable: true,
      extendedProps: {
        userId: schedule[RecallingScheduleKey.UserId],
        isCanceled: false,
      },
    }

    return [recallingEvent, backgroundEvent]
  }

  if (schedule.schedule_type === '通常') {
    return createRecurringEvents(endTime - startTime, 'blue')
  }

  return createRecurringEvents(endTime - startTime, 'green')
}
