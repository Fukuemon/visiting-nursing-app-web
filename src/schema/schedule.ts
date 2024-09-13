import { ScheduleCategory } from '@/constants/scheduleCatefory'
import { scheduleType } from '@/constants/scheduleType'
import { serviceCode, type ServiceCode } from '@/constants/serviceCode'
import type { ZodType } from 'zod'
import { z } from 'zod'

export enum ScheduleKey {
  ScheduleId = 'scheduleId',
  User='user',
  Title = 'title',
  StartTime = 'startTime',
  EndTime = 'endTime',
  IsModified = 'isModified',
  ScheduleType = 'scheduleType',
}

export type BaseSchedule = {
  [ScheduleKey.ScheduleId]: string
  [ScheduleKey.User]: string
  [ScheduleKey.Title]: string
  [ScheduleKey.StartTime]: Date
  [ScheduleKey.EndTime]: Date
  [ScheduleKey.IsModified]: boolean
}

export const baseScheduleSchema = z.object({
  [ScheduleKey.ScheduleId]: z.string().uuid(),
  [ScheduleKey.User]: z.string().uuid(),
  [ScheduleKey.Title]: z.string(),
  [ScheduleKey.StartTime]: z.date(),
  [ScheduleKey.EndTime]: z.date(),
  [ScheduleKey.IsModified]: z.boolean(),
})

export const enum VisitScheduleKey {
    Patient= 'patient',
  ScheduleCategory = 'scheduleCategory',
  Destination = 'destination',
  ServiceCode = 'serviceCode',
  IsCanceled = 'isCanceled',
}

export type VisitSchedule = BaseSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.visit
  [VisitScheduleKey.Patient]: string
  [VisitScheduleKey.ScheduleCategory]: ScheduleCategory
  [VisitScheduleKey.ServiceCode]: ServiceCode
  [VisitScheduleKey.Destination]: string
  [VisitScheduleKey.IsCanceled]: boolean
}

export const VisitScheduleSchema: ZodType<VisitSchedule> = baseScheduleSchema.and(
  z.object({
    [ScheduleKey.ScheduleType]: z.literal(scheduleType.visit),
    [VisitScheduleKey.Patient]: z.string().uuid(),
    [VisitScheduleKey.ScheduleCategory]: z.nativeEnum(ScheduleCategory),
    [VisitScheduleKey.ServiceCode]: z.nativeEnum(serviceCode),
    [VisitScheduleKey.Destination]: z.string(),
    [VisitScheduleKey.IsCanceled]: z.boolean(),
  }),
)

export const enum NormalScheduleKey {
  Description = 'description',
}

export type NormalSchedule = BaseSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.normal
  [NormalScheduleKey.Description]: string
}

export const normalScheduleSchema: ZodType<NormalSchedule> =
  baseScheduleSchema.and(
    z.object({
      [ScheduleKey.ScheduleType]: z.literal(scheduleType.normal),
      [NormalScheduleKey.Description]: z.string(),
    }),
  )

export enum RecallingFrequency {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}
export const enum RecallingRuleKey {
  Frequency = 'frequency',
  DayOfWeek = 'dayOfWeek',
  WeekOfMonth = 'weekOfMonth',
  DayOfMonth = 'dayOfMonth',
}

export type RecallingRuleWeekly = {
  [RecallingRuleKey.Frequency]: RecallingFrequency.Weekly
  [RecallingRuleKey.DayOfWeek]: number
}

export type RecallingRuleWeekOfMonth = {
  [RecallingRuleKey.Frequency]: RecallingFrequency.Monthly
  [RecallingRuleKey.WeekOfMonth]: number
}

export type RecallingRuleMonthly = {
  [RecallingRuleKey.Frequency]: RecallingFrequency.Monthly
  [RecallingRuleKey.DayOfMonth]: number
}

export type RecallingRule =
  | RecallingRuleWeekly
  | RecallingRuleWeekOfMonth
  | RecallingRuleMonthly

export const RecallingRuleSchema: ZodType<RecallingRule> = z.discriminatedUnion(
  'frequency',
  [
    z.object({
      [RecallingRuleKey.Frequency]: z.literal(RecallingFrequency.Weekly),
      [RecallingRuleKey.DayOfWeek]: z.number().min(0).max(6),
    }),
    z.object({
      [RecallingRuleKey.Frequency]: z.literal(RecallingFrequency.Monthly),
      [RecallingRuleKey.WeekOfMonth]: z.number().min(1).max(5),
    }),
    z.object({
      [RecallingRuleKey.Frequency]: z.literal(RecallingFrequency.Monthly),
      [RecallingRuleKey.DayOfMonth]: z.number().min(1).max(31),
    }),
  ],
)

export const enum RecallingScheduleKey {
  RecallingRule = 'recallingRule',
  StartTime = 'startTime',
  EndTime = 'endTime',
}

export type VisitRecallingSchedule = VisitSchedule & {
  [RecallingScheduleKey.RecallingRule]: RecallingRule
}

export const visitRecallingScheduleSchema: ZodType<VisitRecallingSchedule> =
  VisitScheduleSchema.and(
    z.object({
      [RecallingScheduleKey.RecallingRule]: RecallingRuleSchema,
    }),
  )

export type NormalRecallingSchedule = NormalSchedule & {
  [RecallingScheduleKey.RecallingRule]: RecallingRule
}

export const normalRecallingScheduleSchema: ZodType<NormalRecallingSchedule> =
  normalScheduleSchema.and(
    z.object({
      [RecallingScheduleKey.RecallingRule]: RecallingRuleSchema,
    }),
  )

export type Schedule = BaseSchedule &
  (
    | NormalSchedule
    | VisitSchedule
    | NormalRecallingSchedule
    | VisitRecallingSchedule
  )

export type ScheduleEdit = Schedule

export type ScheduleCreate = Omit<Schedule, ScheduleKey.ScheduleId>

export const scheduleSchema:ZodType<Schedule> = baseScheduleSchema.and(
    z.union([
        VisitScheduleSchema,
        visitRecallingScheduleSchema,
        normalScheduleSchema,
        normalRecallingScheduleSchema,
    ])
)

export const scheduleEditSchema: ZodType<ScheduleEdit> = scheduleSchema

export const scheduleCreateSchema: ZodType<ScheduleCreate> = baseScheduleSchema
  .omit({ [ScheduleKey.ScheduleId]: true })
  .and(
    z.union([
      VisitScheduleSchema,
      visitRecallingScheduleSchema,
      normalScheduleSchema,
      normalRecallingScheduleSchema,
    ]),
  )