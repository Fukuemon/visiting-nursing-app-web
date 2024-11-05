import type { ScheduleCategory } from '@/constants/scheduleCategory'
import { scheduleCategoryConstant } from '@/constants/scheduleCategory'
import { scheduleType } from '@/constants/scheduleType'
import type { ServiceCode } from '@/constants/serviceCode'
import { serviceCode } from '@/constants/serviceCode'
import type { ZodType } from 'zod'
import { z } from 'zod'

export enum RecallingFrequency {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

export const enum RecallingScheduleKey {
  RecallingScheduleId = 'recallingScheduleId',
  UserId = 'userId',
  Title = 'title',
  StartTime = 'startTime',
  EndTime = 'endTime',
  Description = 'description',
  ScheduleType = 'scheduleType',
  Frequency = 'frequency',
  DayOfWeek = 'dayOfWeek',
  WeekOfMonth = 'weekOfMonth',
  DayOfMonth = 'dayOfMonth',
  StartDate = 'startDate',
  EndDate = 'endDate',
}

export type BaseRecallingSchedule = {
  [RecallingScheduleKey.RecallingScheduleId]: string
  [RecallingScheduleKey.UserId]: string
  [RecallingScheduleKey.Title]: string
  [RecallingScheduleKey.StartTime]: string
  [RecallingScheduleKey.EndTime]: string
  [RecallingScheduleKey.Description]: string
  [RecallingScheduleKey.ScheduleType]: scheduleType
  [RecallingScheduleKey.Frequency]: RecallingFrequency
  [RecallingScheduleKey.DayOfWeek]?: number
  [RecallingScheduleKey.WeekOfMonth]?: number
  [RecallingScheduleKey.DayOfMonth]?: number
  [RecallingScheduleKey.StartDate]: Date
  [RecallingScheduleKey.EndDate]?: Date
}

export const baseRecallingScheduleSchema = z.object({
  [RecallingScheduleKey.RecallingScheduleId]: z.string().ulid(),
  [RecallingScheduleKey.UserId]: z.string().ulid(),
  [RecallingScheduleKey.Title]: z.string(),
  [RecallingScheduleKey.StartTime]: z.string(),
  [RecallingScheduleKey.EndTime]: z.string(),
  [RecallingScheduleKey.Description]: z.string(),
  [RecallingScheduleKey.ScheduleType]: z.nativeEnum(scheduleType),
  [RecallingScheduleKey.Frequency]: z.nativeEnum(RecallingFrequency),
  [RecallingScheduleKey.DayOfWeek]: z.number().min(0).max(6).optional(),
  [RecallingScheduleKey.WeekOfMonth]: z.number().min(1).max(5).optional(),
  [RecallingScheduleKey.DayOfMonth]: z.number().min(1).max(31).optional(),
  [RecallingScheduleKey.StartDate]: z.date(),
  [RecallingScheduleKey.EndDate]: z.date().optional(),
}) satisfies ZodType<BaseRecallingSchedule>

export const enum VisitRecallingScheduleKey {
  PatientId = 'patientId',
  ScheduleCategory = 'scheduleCategory',
  ServiceCode = 'serviceCode',
  Destination = 'destination',
  ServiceTime = 'serviceTime',
}

export type VisitRecallingSchedule = BaseRecallingSchedule & {
  [RecallingScheduleKey.ScheduleType]: scheduleType.visit
  [VisitRecallingScheduleKey.PatientId]: string
  [VisitRecallingScheduleKey.ScheduleCategory]?: ScheduleCategory[]
  [VisitRecallingScheduleKey.ServiceCode]: ServiceCode
  [VisitRecallingScheduleKey.Destination]: string
  [VisitRecallingScheduleKey.ServiceTime]: number
}

export const visitRecallingScheduleSchema = baseRecallingScheduleSchema.extend({
  [RecallingScheduleKey.ScheduleType]: z.literal(scheduleType.visit),
  [VisitRecallingScheduleKey.PatientId]: z.string().ulid(),
  [VisitRecallingScheduleKey.ScheduleCategory]: z
    .array(z.nativeEnum(scheduleCategoryConstant))
    .optional(),
  [VisitRecallingScheduleKey.ServiceCode]: z.nativeEnum(serviceCode),
  [VisitRecallingScheduleKey.Destination]: z.string(),
  [VisitRecallingScheduleKey.ServiceTime]: z.number().min(0),
}) satisfies ZodType<VisitRecallingSchedule>

export type NormalRecallingSchedule = BaseRecallingSchedule & {
  [RecallingScheduleKey.ScheduleType]: scheduleType.normal
}

export const normalRecallingScheduleSchema = baseRecallingScheduleSchema.extend({
  [RecallingScheduleKey.ScheduleType]: z.literal(scheduleType.normal),
}) satisfies ZodType<NormalRecallingSchedule>

export type RecallingSchedule = VisitRecallingSchedule | NormalRecallingSchedule

export const recallingScheduleSchema: ZodType<RecallingSchedule> = z.union([
  visitRecallingScheduleSchema,
  normalRecallingScheduleSchema,
])

export type VisitRecallingScheduleEdit = Omit<
  VisitRecallingSchedule,
  | VisitRecallingScheduleKey.PatientId
  | VisitRecallingScheduleKey.Destination
  | VisitRecallingScheduleKey.ServiceTime
>

export type NormalRecallingScheduleEdit = NormalRecallingSchedule

export type RecallingScheduleEdit =
  | VisitRecallingScheduleEdit
  | NormalRecallingScheduleEdit

export const visitRecallingScheduleEditSchema =
  visitRecallingScheduleSchema.omit({
    [VisitRecallingScheduleKey.PatientId]: true,
    [VisitRecallingScheduleKey.Destination]: true,
    [VisitRecallingScheduleKey.ServiceTime]: true,
  }) satisfies ZodType<VisitRecallingScheduleEdit>

export const normalRecallingScheduleEditSchema =
  normalRecallingScheduleSchema satisfies ZodType<NormalRecallingScheduleEdit>

export const recallingScheduleEditSchema = z.union([
  visitRecallingScheduleEditSchema,
  normalRecallingScheduleEditSchema,
]) satisfies ZodType<RecallingScheduleEdit>     

export type VisitRecallingScheduleCreate = Omit<
  VisitRecallingSchedule,
  RecallingScheduleKey.RecallingScheduleId
>

export const visitRecallingScheduleCreateSchema =
  visitRecallingScheduleSchema.omit({
    [RecallingScheduleKey.RecallingScheduleId]: true,
  }) satisfies ZodType<VisitRecallingScheduleCreate>

export type NormalRecallingScheduleCreate = Omit<
  NormalRecallingSchedule,
  RecallingScheduleKey.RecallingScheduleId
>

export const normalRecallingScheduleCreateSchema =
  normalRecallingScheduleSchema.omit({
    [RecallingScheduleKey.RecallingScheduleId]: true,
  }) satisfies ZodType<Omit<NormalRecallingSchedule, RecallingScheduleKey.RecallingScheduleId>>

export type RecallingScheduleCreate = VisitRecallingScheduleCreate | NormalRecallingScheduleCreate

export const recallingScheduleCreateSchema = z.union([
  visitRecallingScheduleCreateSchema,
  normalRecallingScheduleCreateSchema,
]) satisfies ZodType<RecallingScheduleCreate>
