import type { CalendarEvent } from '@/types/event'
import { atom } from 'jotai'

export const newEventAtom = atom<CalendarEvent[]>([])

export const editEventAtom = atom({
  id: '',
  patient: '',
  startDate: new Date(),
  service: '',
})
