import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useRef, type FC } from 'react'

import styles from './style.module.css'

import type { Events } from '@/types/event'

import { TimeGridDayStyleWrapper } from '@/app/calendar/_components/CalendarTimeGridDayPresentational/timeGridDayStyled'
import { CurrentCalendarDateAtom } from '@/app/calendar/provider/calendar'
import { CalendarView } from '@/constants/calendarView'
import CalendarHandler from '@/lib/calendar'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

type CalendarTimeGridDayPresentational = {
  events?: Events
}

export const CalendarTimeGridDayPresentational: FC<
  CalendarTimeGridDayPresentational
> = ({ events }) => {
  const router = useRouter()
  const calendarRef = useRef<FullCalendar>(null)
  const calendarHandler = new CalendarHandler(calendarRef, router)
  const [currentCalendarDateAtom, setCurrentCalendarDate] = useAtom(
    CurrentCalendarDateAtom,
  )

  useEffect(() => {
    if (calendarRef.current !== null) {
      const calendarApi = calendarRef.current.getApi()
      calendarApi?.gotoDate(currentCalendarDateAtom)
    }
  }, [currentCalendarDateAtom])

  return (
    <div className={styles.container}>
      <TimeGridDayStyleWrapper>
        <FullCalendar
          ref={calendarRef}
          plugins={[
            timeGridPlugin,
            dayGridPlugin,
            interactionPlugin,
            rrulePlugin,
            momentTimezonePlugin,
          ]}
          initialView={CalendarView.timeGridDay}
          locale={jaLocale}
          timeZone="Asia/Tokyo"
          contentHeight="auto"
          nowIndicator
          navLinks
          titleFormat={{ month: 'short', week: 'short', day: 'numeric' }}
          dayCellContent={calendarHandler.handleDayCellContent}
          dayHeaderContent={calendarHandler.handleDayHeaderContent}
          slotLabelContent={calendarHandler.handleSlotLabelContent}
          slotDuration="00:10"
          eventDurationEditable={false}
          events={events}
          eventClick={calendarHandler.handleEventClick}
          dateClick={calendarHandler.handleDateClick}
        />
      </TimeGridDayStyleWrapper>
    </div>
  )
}
