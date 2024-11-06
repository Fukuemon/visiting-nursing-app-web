export type WeekDays = 'SU' | 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA'
export const weekDayList: Record<number, WeekDays> = {
  0: 'SU',
  1: 'MO',
  2: 'TU',
  3: 'WE',
  4: 'TH',
  5: 'FR',
  6: 'SA',
}
export const WeekDay = {
  sunday: 'sunday',
  monday: 'monday',
  tuesday: 'tuesday',
  wednesday: 'wednesday',
  thursday: 'thursday',
  friday: 'friday',
  saturday: 'saturday',
} as const
export type WeekDay =
  (typeof WeekDay)[keyof typeof WeekDay]

export const WeekDayText: Record<WeekDay, string> = {
  [WeekDay.sunday]: '日',
  [WeekDay.monday]: '月',
  [WeekDay.tuesday]: '火',
  [WeekDay.wednesday]: '水',
  [WeekDay.thursday]: '木',
  [WeekDay.friday]: '金',
  [WeekDay.saturday]: '土',
} as const

export const WeekDayTextFromNumber: Record<number, string> = {
  0: '日',
  1: '月',
  2: '火',
  3: '水',
  4: '木',
  5: '金',
  6: '土',
}
