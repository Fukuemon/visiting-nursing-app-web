import { CalendarView } from '@/constants/calendarView'
import { useCallback } from 'react'

export const useCalendarNavigation = (
  currentCalendarView: string,
  currentCalendarDate: Date,
  setCurrentCalendarDate: (date: Date) => void,
) => {
  const handlePrev = useCallback(() => {
    const newDate = new Date(currentCalendarDate)
    if (currentCalendarView === CalendarView.timeGridDay) {
      newDate.setDate(newDate.getDate() - 1)
    } else if (currentCalendarView === CalendarView.timeGridWeek) {
      newDate.setDate(newDate.getDate() - 7)
    } else if (currentCalendarView === CalendarView.dayGridMonth) {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentCalendarDate(newDate)
  }, [currentCalendarView, currentCalendarDate, setCurrentCalendarDate])

  const handleNext = useCallback(() => {
    const newDate = new Date(currentCalendarDate)
    if (currentCalendarView === CalendarView.timeGridDay) {
      newDate.setDate(newDate.getDate() + 1)
    } else if (currentCalendarView === CalendarView.timeGridWeek) {
      newDate.setDate(newDate.getDate() + 7)
    } else if (currentCalendarView === CalendarView.dayGridMonth) {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentCalendarDate(newDate)
  }, [currentCalendarView, currentCalendarDate, setCurrentCalendarDate])

  const handleToday = useCallback(() => {
    setCurrentCalendarDate(new Date())
  }, [setCurrentCalendarDate])

  return { handlePrev, handleNext, handleToday }
}
