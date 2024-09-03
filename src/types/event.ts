export type CalendarEventProps = {
  id: string
  start: string
  end: string
}
export type NewCalendarEventProps = {
  start: string
}

export type Duration = {
  minute: number
}
export type CalendarEvent = {
  id: string
  userId: string
  title: string
  start: Date
  end: Date
  isCancel: boolean
  startEditable: boolean
  durationEditable: boolean
}
export type BackgroundEvent = {
  id: string
  userId: string
  title: string
  rrule: string
  duration: Duration
  startEditable: false
  display: 'background'
}

export type Events = (CalendarEvent | BackgroundEvent)[]
