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

import { TimeGridDayStyleWrapper } from '@/app/[facilityId]/calendar/_components/CalendarTimeGridDayPresentational/timeGridDayStyled'
import { CurrentCalendarDateAtom } from '@/app/[facilityId]/calendar/provider/calendar'
import { CalendarView } from '@/constants/calendarView'
import { useQueryParams } from '@/hooks/useQueryParams'
import CalendarHandler from '@/lib/calendar'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'

type CalendarTimeGridDayPresentational = {
  events?: Events
}

export const CalendarTimeGridDayPresentational: FC<
  CalendarTimeGridDayPresentational
> = ({ events }) => {
  const router = useRouter()
  const { facilityId } = useParams<{ facilityId: string }>()
  const { queryParams } = useQueryParams()
  const calendarRef = useRef<FullCalendar>(null)
  const calendarHandler = new CalendarHandler(calendarRef, router, facilityId)
  const [currentCalendarDateAtom, setCurrentCalendarDate] = useAtom(
    CurrentCalendarDateAtom,
  )

  useEffect(() => {
    if (calendarRef.current !== null) {
      const calendarApi = calendarRef.current.getApi()
      if (queryParams.get('date') !== null) {
        calendarApi?.gotoDate(new Date(queryParams.get('date') ?? ''))
      }
    }
  }, [queryParams.get('date')])

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
          titleFormat={{ month: 'short', week: 'short', day: 'numeric' }}
          dayCellContent={calendarHandler.handleDayCellContent}
          dayHeaderContent={calendarHandler.handleDayHeaderContent}
          slotLabelContent={calendarHandler.handleSlotLabelContent}
          slotDuration="00:10"
          selectable
          editable
          droppable
          events={events}
          eventClick={calendarHandler.handleEventClick}
          dateClick={calendarHandler.handleDateClick}
          allDaySlot={false}
        />
      </TimeGridDayStyleWrapper>
    </div>
  )
}
