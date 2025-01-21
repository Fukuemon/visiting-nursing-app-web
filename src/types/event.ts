import type { EventInput } from '@fullcalendar/core/index.js'

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
export type CalendarEvent = EventInput & {
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
export type RecallingCalendarEvent = EventInput & {
  id: string
  title: string
  allDay: false
  backgroundColor?: string
  rrule: {
    freq: string
    interval: number
    dtstart: Date
    until?: Date
    byweekday?: number[]
    bysetpos?: number
  }
  exdate?: string[] | null
  startEditable: true
  duration?: Duration
  extendedProps: {
    userId: string
    isCanceled: boolean
  }
}

export type BackgroundEvent = EventInput & {
  id: string
  title: string
  allDay: false
  rrule: {
    freq: string
    interval: number
    dtstart: Date
    until?: Date
  }
  exdate?: string[] | null
  duration: Duration
  startEditable: false
  display: 'background'
  extendedProps: {
    userId: string
    isCanceled: boolean
  }
}

export type Events = (
  | CalendarEvent
  | RecallingCalendarEvent
  | BackgroundEvent
)[]
