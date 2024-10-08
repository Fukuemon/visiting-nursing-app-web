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
  title: string
  start: Date
  end: Date
  startEditable: boolean
  durationEditable: boolean
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  extendedProps: {
    userId: string
    isCanceled: boolean
  }
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

export type Events = (CalendarEvent)[]
