export const ScheduleType = {
  normal: 'normal',
  normalRecalling: 'normalRecalling',
  visit: 'visit',
  visitRecalling: 'visitRecalling',
} as const

export enum scheduleType {
  normal= 'normal',
  normalRecalling= 'normalRecalling',
  visit= 'visit',
  visitRecalling= 'visitRecalling',
}

export type ScheduleType = (typeof ScheduleType)[keyof typeof ScheduleType]

export const ScheduleTypeText: Record<ScheduleType, string> = {
  [ScheduleType.normal]: '通常',
  [ScheduleType.normalRecalling]: '通常繰り返し',
  [ScheduleType.visit]: '訪問',
  [ScheduleType.visitRecalling]: '定期訪問',
} as const

