import type FullCalendar from '@fullcalendar/react'
import { atom } from 'jotai'
import type { RefObject } from 'react'

export const CalendarRefAtom = atom([] as RefObject<FullCalendar>[])
export const CurrentCalendarDateAtom = atom(new Date())
