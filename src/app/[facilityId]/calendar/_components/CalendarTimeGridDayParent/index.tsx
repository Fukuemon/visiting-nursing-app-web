import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import { StyleWrapper } from './styled'

import { useParams, useRouter } from 'next/navigation'
import styles from './style.module.css'

import CalendarHandler from '@/lib/calendar'
import jaLocale from '@fullcalendar/core/locales/ja'

import { CalendarRefAtom } from '@/app/[facilityId]/calendar/provider/calendar'
import { CalendarView } from '@/constants/calendarView'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useSetAtom } from 'jotai'

type CalendarTimeGridDayParentProps = object

export const CalendarTimeGridDayParent: FC<
  CalendarTimeGridDayParentProps
> = ({}) => {
  const router = useRouter()
  const { facilityId } = useParams<{ facilityId: string }>()
  const { queryParams } = useQueryParams()
  const calendarRef = useRef<FullCalendar>(null)
  const calendarHandler = new CalendarHandler(calendarRef, router, facilityId)
  const setCalendarRefAtom = useSetAtom(CalendarRefAtom)

  useEffect(() => {
    if (calendarRef.current !== null) {
      const calendarApi = calendarRef.current.getApi()
      if (queryParams.get('date') !== null) {
        calendarApi?.gotoDate(new Date(queryParams.get('date') ?? ''))
      }
    }
  }, [queryParams.get('date')])

  useEffect(() => {
    if (calendarRef.current !== null) {
      setCalendarRefAtom((calendarRefAtom) => [...calendarRefAtom, calendarRef])
    }
  }, [calendarRef])

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
          allDaySlot={false}
        />
      </StyleWrapper>
    </div>
  )
}
