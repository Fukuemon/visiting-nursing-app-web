import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useRef, type FC } from 'react'

import styles from './style.module.css'

import type { Events } from '@/types/event'

import { TimeGridDayStyleWrapper } from '@/app/[facilityId]/calendar/_components/CalendarTimeGridDayPresentational/timeGridDayStyled'
import { ScheduleDetailModal } from '@/app/[facilityId]/calendar/_components/Schedule/Detail/ScheduleDetailModal'
import Modal from '@/app/_components/Modal'
import { CalendarView } from '@/constants/calendarView'
import { useQueryParams } from '@/hooks/useQueryParams'
import CalendarHandler from '@/lib/calendar'
import type { EventContentArg } from '@fullcalendar/core/index.js'
import { useParams, useRouter } from 'next/navigation'
import { pagesPath } from '@/utils/$path'

type CalendarTimeGridDayPresentational = {
  events?: Events
  userId?: string
}

export const CalendarTimeGridDayPresentational: FC<
  CalendarTimeGridDayPresentational
> = ({ events, userId }) => {
  const router = useRouter()
  const { facilityId } = useParams<{ facilityId: string }>()
  const { queryParams } = useQueryParams()
  const calendarRef = useRef<FullCalendar>(null)
  const calendarHandler = new CalendarHandler(calendarRef, router, facilityId)

  useEffect(() => {
    if (calendarRef.current !== null) {
      const calendarApi = calendarRef.current.getApi()
      if (queryParams.get('date') !== null) {
        calendarApi?.gotoDate(new Date(queryParams.get('date') ?? ''))
      }
    }
  }, [queryParams.get('date')])

  const renderEventContent = (eventContent: EventContentArg) => (
    <Modal className={styles.modal}>
      <Modal.Trigger className={styles.eventContent}>
        <p className={styles.timeText}>{eventContent.timeText}</p>
        <p className={styles.title}>{eventContent.event.title}</p>
      </Modal.Trigger>
      <ScheduleDetailModal
        scheduleId={eventContent.event.id}
        startDate={eventContent.event.start ?? new Date()}
      />
    </Modal>
  )
  const handleDateClick = (arg: DateClickArg) => {
    const start = String(arg.date).replace(/ GMT.*$/, '')
    router.push(
      pagesPath
        ._facilityId(facilityId)
        .calendar.schedule.new.$url({ query: { start, userId } }).path +
        '&tab=normal',
    )
  }

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
          dateClick={handleDateClick}
          allDaySlot={false}
          eventContent={renderEventContent}
        />
      </TimeGridDayStyleWrapper>
    </div>
  )
}
