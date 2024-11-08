import type { CcCategory } from '@/constants/ccCategory'
import { ccCategory } from '@/constants/ccCategory'
import type { ScheduleCategory } from '@/constants/scheduleCategory'
import { scheduleCategoryConstant } from '@/constants/scheduleCategory'
import { scheduleType } from '@/constants/scheduleType'
import type { ServiceCode } from '@/constants/serviceCode'
import { serviceCode } from '@/constants/serviceCode'
import type { ZodType } from 'zod'
import { z } from 'zod'
import type { RecallingSchedule } from './recallingSchedule'
import { recallingScheduleSchema } from './recallingSchedule'

export enum ScheduleKey {
  ScheduleId = 'scheduleId',
  RecallingSchedule = 'recallingSchedule',
  UserId = 'userId',
  RecallingScheduleId = 'recallingScheduleId',
  CcCategory = 'ccCategory',
  CcUserId = 'ccUserId',
  Title = 'title',
  ScheduleDate = 'scheduleDate',
  StartTime = 'startTime',
  EndTime = 'endTime',
  ScheduleType = 'scheduleType',
  Description = 'description',
}

export type BaseSchedule = {
  [ScheduleKey.ScheduleId]: string
  [ScheduleKey.RecallingSchedule]?: RecallingSchedule
  [ScheduleKey.RecallingScheduleId]?: string
  [ScheduleKey.UserId]: string
  [ScheduleKey.CcCategory]?: CcCategory
  [ScheduleKey.CcUserId]?: string
  [ScheduleKey.Title]: string
  [ScheduleKey.ScheduleDate]: Date
  [ScheduleKey.StartTime]: string
  [ScheduleKey.EndTime]: string
  [ScheduleKey.Description]: string
}

const baseScheduleSchema = z.object({
  [ScheduleKey.ScheduleId]: z.string().ulid(),
  [ScheduleKey.RecallingSchedule]: z
    .lazy(() => recallingScheduleSchema)
    .optional(),
  [ScheduleKey.RecallingScheduleId]: z.string().ulid().optional(),
  [ScheduleKey.UserId]: z.string().ulid(),
  [ScheduleKey.CcCategory]: z.nativeEnum(ccCategory).optional(),
  [ScheduleKey.CcUserId]: z.string().ulid().optional(),
  [ScheduleKey.Title]: z.string(),
  [ScheduleKey.ScheduleDate]: z.date(),
  [ScheduleKey.StartTime]: z.string(),
  [ScheduleKey.EndTime]: z.string(),
  [ScheduleKey.Description]: z.string(),
}) satisfies ZodType<BaseSchedule>

export enum VisitScheduleKey {
  PatientId = 'patientId',
  ScheduleCategory = 'scheduleCategory',
  Destination = 'destination',
  ServiceCode = 'serviceCode',
  ServiceTime = 'serviceTime',
  IsCanceled = 'isCanceled',
}

export type VisitSchedule = BaseSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.visit
  [VisitScheduleKey.PatientId]: string
  [VisitScheduleKey.ScheduleCategory]?: ScheduleCategory[]
  [VisitScheduleKey.ServiceCode]: ServiceCode
  [VisitScheduleKey.Destination]: string
  [VisitScheduleKey.IsCanceled]: boolean
  [VisitScheduleKey.ServiceTime]: number
}

export const visitScheduleSchema = baseScheduleSchema.extend({
  [ScheduleKey.ScheduleType]: z.literal(scheduleType.visit),
  [VisitScheduleKey.PatientId]: z.string().ulid(),
  [VisitScheduleKey.ScheduleCategory]: z
    .array(z.nativeEnum(scheduleCategoryConstant))
    .optional(),
  [VisitScheduleKey.ServiceCode]: z.nativeEnum(serviceCode),
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

export type Schedule = NormalSchedule | VisitSchedule

export type VisitScheduleEdit = Omit<
  VisitSchedule,
  ScheduleKey.RecallingSchedule
>
export type NormalScheduleEdit = Omit<
  NormalSchedule,
  ScheduleKey.RecallingSchedule
>
export type ScheduleEdit = VisitScheduleEdit | NormalScheduleEdit

export type VisitScheduleCreate = Omit<
  VisitSchedule,
  ScheduleKey.ScheduleId
>
export type NormalScheduleCreate = Omit<
  NormalSchedule,
  ScheduleKey.ScheduleId
>

export type ScheduleCreate = VisitScheduleCreate | NormalScheduleCreate

export const scheduleSchema = baseScheduleSchema.and(
  z.union([visitScheduleSchema, normalScheduleSchema]),
) satisfies ZodType<Schedule>

export const visitScheduleEditSchema = visitScheduleSchema.omit({
  [ScheduleKey.RecallingSchedule]: true,

}) satisfies ZodType<VisitScheduleEdit>

export const normalScheduleEditSchema = normalScheduleSchema.omit({
  [ScheduleKey.RecallingSchedule]: true,

}) satisfies ZodType<NormalScheduleEdit>

export const scheduleEditSchema = z.union([
  visitScheduleEditSchema,
  normalScheduleEditSchema,
]) satisfies ZodType<ScheduleEdit>

export const visitScheduleCreateSchema = visitScheduleSchema.omit({
  [ScheduleKey.ScheduleId]: true,
})

export const normalScheduleCreateSchema = normalScheduleSchema.omit({
  [ScheduleKey.ScheduleId]: true,
})

export const scheduleCreateSchema = z.union([
  visitScheduleCreateSchema,
  normalScheduleCreateSchema,
]) satisfies ZodType<ScheduleCreate>
