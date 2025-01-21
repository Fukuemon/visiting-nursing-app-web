export const ScheduleType = {
  normal: 'normal',
  visit: 'visit',
  visitRecalling: 'visitRecalling',
  normalRecalling: 'normalRecalling',
} as const

export enum scheduleType {
  normal = '01JG8Z4740VMSJXKXPRV3NDR2R',
  visit = '01JG8Z3XZVD7M11CGETHQNAA6W',
  visitRecalling = 'visitRecalling',
  normalRecalling = 'normalRecalling',
}

export type ScheduleType = (typeof ScheduleType)[keyof typeof ScheduleType]

export const ScheduleTypeText: Record<ScheduleType, string> = {
  [ScheduleType.normal]: '通常',
  [ScheduleType.visit]: '訪問',
  [ScheduleType.visitRecalling]: '繰り返し訪問',
  [ScheduleType.normalRecalling]: '繰り返し通常',
} as const
