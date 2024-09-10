export const ScheduleCategory = {
  normal: 'normal',
  emergency: 'emergency',
  hospitalization: 'hospitalization',

} as const

export type ScheduleCategory = (typeof ScheduleCategory)[keyof typeof ScheduleCategory]

export const ScheduleCategoryText: Record<ScheduleCategory, string> = {
  [ScheduleCategory.normal]: '通常',
  [ScheduleCategory.emergency]: '緊急',
  [ScheduleCategory.hospitalization]: '入院',
} as const
