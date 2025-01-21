import { z } from 'zod'

const visitInfoSchema = z.object({
  id: z.string(),
  patient_name: z.string(),
  assigned_staff_name: z.string(),
  companion_name: z.string(),
  route: z.string().nullable(),
  service_code: z.string(),
  visit_categories: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .nullable(),
})

const scheduleSchema = z.object({
  id: z.string(),
  schedule_type: z.string(),
  date: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  is_over_time_work: z.boolean(),
  staff_id: z.string(),
  staff_name: z.string(),
  visit_info: visitInfoSchema.nullable(),
  title: z.string(),
  description: z.string(),
  cancel_reason: z.string(),
})

const recurringRuleSchema = z.object({
  frequency: z.string(),
  days_of_week: z.number(),
  day_of_month: z.number(),
  week_of_month: z.number(),
  start_date: z.string(),
  end_date: z.string(),
})

const recurringScheduleSchema = scheduleSchema.extend({
  recurring_rule: recurringRuleSchema,
  exclusion_dates: z.array(z.string()).nullable(),
})

export const fetchedScheduleSchema = z.object({
  schedules: z.array(scheduleSchema).nullable(),
  recurring_schedules: z.array(recurringScheduleSchema).nullable(),
})

// 型定義
export type VisitInfo = z.infer<typeof visitInfoSchema>
export type Schedule = z.infer<typeof scheduleSchema>
export type RecurringRule = z.infer<typeof recurringRuleSchema>
export type RecurringSchedule = z.infer<typeof recurringScheduleSchema>
export type FetchedSchedule = z.infer<typeof fetchedScheduleSchema>
