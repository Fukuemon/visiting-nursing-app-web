import type { CcCategory } from '@/constants/ccCategory'
import { ccCategory } from '@/constants/ccCategory'
import type { ScheduleCategory } from '@/constants/scheduleCategory'
import { scheduleCategoryConstant } from '@/constants/scheduleCategory'
import { scheduleType } from '@/constants/scheduleType'
import type { ServiceCode } from '@/schema/serviceCode'
import { VisitCategory, visitCategorySchema } from '@/schema/visitCategory'
import type { ZodType } from 'zod'
import { z } from 'zod'

export enum ScheduleKey {
  Id = 'id',
  UserId = 'staff_id',
  CcCategory = 'ccCategory',
  CcUserId = 'ccUserId',
  Title = 'title',
  StartDate = 'date',
  StartTime = 'start_time',
  EndTime = 'end_time',
  ScheduleType = 'schedule_type_id',
  Description = 'description',
}

export type BaseSchedule = {
  [ScheduleKey.Id]: string
  [ScheduleKey.UserId]: string
  [ScheduleKey.CcCategory]?: CcCategory
  [ScheduleKey.CcUserId]?: string
  [ScheduleKey.Title]: string
  [ScheduleKey.StartDate]: Date
  [ScheduleKey.StartTime]: string
  [ScheduleKey.EndTime]: string
  [ScheduleKey.Description]: string
}

const baseScheduleSchema = z.object({
  [ScheduleKey.Id]: z.string().ulid(),
  [ScheduleKey.UserId]: z.string().ulid(),
  [ScheduleKey.CcCategory]: z.nativeEnum(ccCategory).optional(),
  [ScheduleKey.CcUserId]: z.string().ulid().optional(),
  [ScheduleKey.Title]: z.string(),
  [ScheduleKey.StartDate]: z.date(),
  [ScheduleKey.StartTime]: z.string(),
  [ScheduleKey.EndTime]: z.string(),
  [ScheduleKey.Description]: z.string(),
}) satisfies ZodType<BaseSchedule>

export enum VisitScheduleKey {
  PatientId = 'patientId',
  ScheduleCategory = 'visit_category_ids',
  Destination = 'destination',
  ServiceCodeId = 'serviceCodeId',
  ServiceTime = 'serviceTime',
  IsCanceled = 'isCanceled',
}

export type VisitSchedule = BaseSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.visit
  [VisitScheduleKey.PatientId]: string
  [VisitScheduleKey.ScheduleCategory]?: string[]
  [VisitScheduleKey.ServiceCodeId]: string
  [VisitScheduleKey.Destination]: string
  [VisitScheduleKey.IsCanceled]: boolean
  [VisitScheduleKey.ServiceTime]: number
}

export const visitScheduleSchema = baseScheduleSchema.extend({
  [ScheduleKey.ScheduleType]: z.literal(scheduleType.visit),
  [VisitScheduleKey.PatientId]: z.string().ulid(),
  [VisitScheduleKey.ScheduleCategory]: z
    .array(z.string())
    .optional(),
  [VisitScheduleKey.ServiceCodeId]: z.string(),
  [VisitScheduleKey.Destination]: z.string(),
  [VisitScheduleKey.IsCanceled]: z.boolean(),
  [VisitScheduleKey.ServiceTime]: z.number().min(0),
}) satisfies ZodType<VisitSchedule>

export type NormalSchedule = BaseSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.normal
}

export const normalScheduleSchema = baseScheduleSchema.extend({
  [ScheduleKey.ScheduleType]: z.literal(scheduleType.normal),
}) satisfies ZodType<NormalSchedule>

export enum RecallingFrequency {
  Weekly = 'weekly',
  Monthly = 'monthly',
}

export const enum RecallingScheduleKey {
  Id = 'id',
  UserId = 'staff_id',
  Title = 'title',
  StartTime = 'start_time',
  EndTime = 'end_time',
  Description = 'description',
  ScheduleType = 'schedule_type_id',
  Frequency = 'frequency',
  DayOfWeek = 'dayOfWeek',
  WeekOfMonth = 'weekOfMonth',
  DayOfMonth = 'dayOfMonth',
  StartDate = 'date',
  EndDate = 'endDate',
  Exdate = 'exdate',
}

export type BaseRecallingSchedule = {
  [RecallingScheduleKey.Id]: string
  [RecallingScheduleKey.UserId]: string
  [RecallingScheduleKey.Title]: string
  [RecallingScheduleKey.StartTime]: string
  [RecallingScheduleKey.EndTime]: string
  [RecallingScheduleKey.Description]: string
  [RecallingScheduleKey.Frequency]: RecallingFrequency
  [RecallingScheduleKey.DayOfWeek]?: number
  [RecallingScheduleKey.WeekOfMonth]?: number
  [RecallingScheduleKey.DayOfMonth]?: number
  [RecallingScheduleKey.StartDate]: Date
  [RecallingScheduleKey.EndDate]?: Date
  [RecallingScheduleKey.Exdate]?: number[]
}

export const baseRecallingScheduleSchema = z.object({
  [RecallingScheduleKey.Id]: z.string().ulid(),
  [RecallingScheduleKey.UserId]: z.string().ulid(),
  [RecallingScheduleKey.Title]: z.string(),
  [RecallingScheduleKey.StartTime]: z.string(),
  [RecallingScheduleKey.EndTime]: z.string(),
  [RecallingScheduleKey.Description]: z.string(),
  [RecallingScheduleKey.Frequency]: z.nativeEnum(RecallingFrequency),
  [RecallingScheduleKey.DayOfWeek]: z.number().optional(),
  [RecallingScheduleKey.WeekOfMonth]: z.number().optional(),
  [RecallingScheduleKey.DayOfMonth]: z.number().optional(),
  [RecallingScheduleKey.StartDate]: z.date(),
  [RecallingScheduleKey.EndDate]: z.date().optional(),
  [RecallingScheduleKey.Exdate]: z.array(z.number()).optional(),
}) satisfies ZodType<BaseRecallingSchedule>

export type VisitRecallingSchedule = BaseRecallingSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.visitRecalling
  [VisitScheduleKey.PatientId]: string
  [VisitScheduleKey.ScheduleCategory]?: string[]
  [VisitScheduleKey.ServiceCodeId]: string
  [VisitScheduleKey.Destination]: string
  [VisitScheduleKey.ServiceTime]: number
  [VisitScheduleKey.IsCanceled]: boolean
}

export const visitRecallingScheduleSchema = baseRecallingScheduleSchema.extend({
  [ScheduleKey.ScheduleType]: z.literal(scheduleType.visitRecalling),
  [VisitScheduleKey.PatientId]: z.string().ulid(),
  [VisitScheduleKey.ScheduleCategory]: z
    .array(z.string())
    .optional(),
  [VisitScheduleKey.ServiceCodeId]: z.string(),
  [VisitScheduleKey.Destination]: z.string(),
  [VisitScheduleKey.ServiceTime]: z.number().min(0),
  [VisitScheduleKey.IsCanceled]: z.boolean(),
}) satisfies ZodType<VisitRecallingSchedule>

export type NormalRecallingSchedule = BaseRecallingSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.normalRecalling
}

export const normalRecallingScheduleSchema = baseRecallingScheduleSchema.extend(
  {
    [RecallingScheduleKey.ScheduleType]: z.literal(
      scheduleType.normalRecalling,
    ),
  },
) satisfies ZodType<NormalRecallingSchedule>

export type SingleSchedule = NormalSchedule | VisitSchedule
export type RecallingSchedule = VisitRecallingSchedule | NormalRecallingSchedule

export type Schedule = SingleSchedule | RecallingSchedule

export type VisitScheduleEdit = VisitSchedule
export type NormalScheduleEdit = NormalSchedule
export type VisitRecallingScheduleEdit = VisitRecallingSchedule
export type NormalRecallingScheduleEdit = NormalRecallingSchedule

export type SingleScheduleEdit = VisitScheduleEdit | NormalScheduleEdit
export type RecallingScheduleEdit =
  | VisitRecallingScheduleEdit
  | NormalRecallingScheduleEdit

export type ScheduleEdit = SingleScheduleEdit | RecallingScheduleEdit

export type VisitScheduleCreate = Omit<VisitSchedule, ScheduleKey.Id>
export type NormalScheduleCreate = Omit<NormalSchedule, ScheduleKey.Id>
export type VisitRecallingScheduleCreate = Omit<
  VisitRecallingSchedule,
  RecallingScheduleKey.Id
>
export type NormalRecallingScheduleCreate = Omit<
  NormalRecallingSchedule,
  RecallingScheduleKey.Id
>

export type SingleScheduleCreate = VisitScheduleCreate | NormalScheduleCreate
export type RecallingScheduleCreate =
  | VisitRecallingScheduleCreate
  | NormalRecallingScheduleCreate

export type ScheduleCreate = SingleScheduleCreate | RecallingScheduleCreate

export const visitRecallingScheduleCreateSchema = visitRecallingScheduleSchema
  .omit({
    [RecallingScheduleKey.Id]: true,
  })
  .extend({
    [RecallingScheduleKey.ScheduleType]: z.literal(scheduleType.visitRecalling),
  })

export const normalRecallingScheduleCreateSchema = normalRecallingScheduleSchema
  .omit({
    [RecallingScheduleKey.Id]: true,
  })
  .extend({
    [RecallingScheduleKey.ScheduleType]: z.literal(
      scheduleType.normalRecalling,
    ),
  })

export const recallingScheduleCreateSchema = z.discriminatedUnion(
  RecallingScheduleKey.ScheduleType,
  [visitRecallingScheduleCreateSchema, normalRecallingScheduleCreateSchema],
) satisfies ZodType<RecallingScheduleCreate>

export const scheduleSchema = baseScheduleSchema.and(
  z.union([
    visitScheduleSchema,
    normalScheduleSchema,
    visitRecallingScheduleSchema,
    normalRecallingScheduleSchema,
  ]),
) satisfies ZodType<Schedule | RecallingSchedule>

export const visitScheduleEditSchema = visitScheduleSchema.omit(
  {},
) satisfies ZodType<VisitScheduleEdit>

export const normalScheduleEditSchema = normalScheduleSchema.omit(
  {},
) satisfies ZodType<NormalScheduleEdit>

export const visitRecallingScheduleEditSchema =
  visitRecallingScheduleSchema.omit(
    {},
  ) satisfies ZodType<VisitRecallingScheduleEdit>

export const normalRecallingScheduleEditSchema =
  normalRecallingScheduleSchema.omit(
    {},
  ) satisfies ZodType<NormalRecallingScheduleEdit>

export const scheduleEditSchema = z.union([
  visitScheduleEditSchema,
  normalScheduleEditSchema,
  visitRecallingScheduleEditSchema,
  normalRecallingScheduleEditSchema,
]) satisfies ZodType<ScheduleEdit | RecallingScheduleEdit>

export const visitScheduleCreateSchema = visitScheduleSchema.omit({
  [ScheduleKey.Id]: true,
})

export const normalScheduleCreateSchema = normalScheduleSchema.omit({
  [ScheduleKey.Id]: true,
})

export const scheduleCreateSchema = z.union([
  visitScheduleCreateSchema,
  normalScheduleCreateSchema,
  recallingScheduleCreateSchema,
]) satisfies ZodType<ScheduleCreate | RecallingScheduleCreate>
