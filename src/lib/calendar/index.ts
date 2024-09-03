'use client'
import type {
  CalendarApi,
  DayCellContentArg,
  DayHeaderContentArg,
  EventChangeArg,
  EventClickArg,
  SlotLabelContentArg,
} from '@fullcalendar/core/index.js'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'
import type FullCalendar from '@fullcalendar/react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import type { RefObject } from 'react'

export default class CalendarHandler {
  calendarRef: RefObject<FullCalendar>
  calendarApi: CalendarApi | undefined
  router: AppRouterInstance
  constructor(calendarRef: RefObject<FullCalendar>, router: AppRouterInstance) {
    this.calendarRef = calendarRef
    this.router = router
    this.calendarApi = this.calendarRef.current?.getApi()
  }
  handleEventClick = (arg: EventClickArg) => {}
  handleEventChange = (arg: EventChangeArg) => {}
  handleDateClick = (arg: DateClickArg) => {}
  handleViewChange = (currentCalendarView: string) => {
    this.calendarApi?.changeView(currentCalendarView)
  }
  public headerToolbar = {
    start: 'title',
    center: '',
    end: 'today timeGridDay,timeGridWeek,dayGridMonth prev,next',
  }
  handleDayCellContent = (event: DayCellContentArg) =>
    (event.dayNumberText = event.dayNumberText.replace('日', ''))
  handleDayHeaderContent = (event: DayHeaderContentArg) =>
    (event.text = event.text.replace(/.*\//, ''))
  handleSlotLabelContent = (event: SlotLabelContentArg) =>
    (event.text = event.text.replace('時', ':00'))
}
