import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { StyleWrapper } from './styled'

import { useRouter } from 'next/navigation'
import styles from './style.module.css'

import CalendarHandler from '@/lib/calendar'
import type { Events } from '@/types/event'
import jaLocale from '@fullcalendar/core/locales/ja'

import { CurrentCalendarDateAtom } from '@/app/calendar/provider/calendar'
import { useAtom } from 'jotai'

type CalendarContainerProps = {
  events?: Events
  currentCalendarView: string
}

export const CalendarPresentational: FC<CalendarContainerProps> = ({
  events,
  currentCalendarView,
}) => {
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

  useEffect(() => {
    calendarHandler.handleViewChange(currentCalendarView)
  }, [currentCalendarView])

  return (
    <div className={styles.container}>
      <StyleWrapper>
        <FullCalendar
          ref={calendarRef}
          plugins={[
            timeGridPlugin,
            dayGridPlugin,
            interactionPlugin,
            rrulePlugin,
            momentTimezonePlugin,
          ]}
          initialView={currentCalendarView}
          locale={jaLocale}
          timeZone="Asia/Tokyo"
          // contentHeight="auto"
          height="auto"
          nowIndicator
          navLinks
          titleFormat={{ month: 'short', week: 'short', day: 'numeric' }}
          dayCellContent={calendarHandler.handleDayCellContent}
          dayHeaderContent={calendarHandler.handleDayHeaderContent}
          slotLabelContent={calendarHandler.handleSlotLabelContent}
          slotDuration="00:10"
          eventDurationEditable={false}
          events={events}
        />
      </StyleWrapper>
    </div>
  )
}
