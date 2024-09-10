export type RecallingRule = {
  frequency: number
  interval: number
  startDate: Date
  endDate: Date
  dayOfWeek?: number
  dayOfMonth?: number
  weekOfMonth?: number
}
