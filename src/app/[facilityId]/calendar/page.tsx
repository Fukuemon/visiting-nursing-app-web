'use client'
import { CalendarContainer } from '@/app/[facilityId]/calendar/_components/CalendarContainer'
import { Header } from '@/app/_components/Header'
import { IconButton } from '@/app/_components/IconButton'
import { Menubar } from '@/app/_components/Menubar'
import { ToggleStateType } from '@/app/_components/Toggle'
import { CalendarView } from '@/constants/calendarView'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './style.module.css'
import MenuIcon from '/public/icons/menu.svg'
import UserIcon from '/public/icons/user.svg'

import { LeftControls } from '@/app/[facilityId]/calendar/_components/CalendarLeftControls'
import { RightControls } from '@/app/[facilityId]/calendar/_components/CalendarRightControls'
import { useCalendarNavigation } from '@/app/[facilityId]/calendar/hooks/useCalendarNavigation'
import { CurrentCalendarDateAtom } from '@/app/[facilityId]/calendar/provider/calendar'
import { useAtom } from 'jotai'

import { DatePicker } from '@/app/_components/DatePicker'
import { Loading } from '@/app/_components/Loading'
import { useScheduleList } from '@/hooks/api/schedule'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useForm } from 'react-hook-form'

export default function CalendarPage() {
  const [isMenubarOpen, setIsMenuBarOpen] = useState(false)
  const { queryParams, setQueryParams } = useQueryParams()
  const [showCancel, setShowCancel] = useState(ToggleStateType.DEFAULT)
  const pathname = usePathname()
  const router = useRouter()
  const [currentCalendarDate, setCurrentCalendarDate] = useAtom(
    CurrentCalendarDateAtom,
  )
  const schedules = useScheduleList()
  useEffect(() => {
    if (queryParams.get('date') === null) {
      setQueryParams({ date: new Date() })
    }
  }, [])

  useEffect(() => {
    if (currentCalendarDate !== null) {
      setQueryParams({ date: currentCalendarDate })
      setValue('date', currentCalendarDate)
    }
  }, [currentCalendarDate])

  const { handlePrev, handleNext, handleToday } = useCalendarNavigation(
    queryParams.get('tab') ?? CalendarView.timeGridDay,
    currentCalendarDate ?? new Date(),
    setCurrentCalendarDate,
  )

  const { control, watch, setValue } = useForm<{ date: Date }>({
    defaultValues: {
      date: new Date(queryParams.get('date') ?? new Date()),
    },
  })

  useEffect(() => {
    if (watch('date')) {
      setQueryParams({ date: watch('date') })
    }
  }, [watch('date')])

  const menubar = <Menubar currentLink={pathname} isOpen={isMenubarOpen} />

  const leftIcon = (
    <IconButton onClick={() => setIsMenuBarOpen(!isMenubarOpen)}>
      <MenuIcon height={32} width={32} />
    </IconButton>
  )

  const rightIcon = (
    <IconButton onClick={() => router.push('/profile')}>
      <UserIcon height={32} width={32} />
    </IconButton>
  )

  return (
    <div className={styles.pageContainer}>
      <Header
        leftIcon={leftIcon}
        left={
          <LeftControls
            onPrev={handlePrev}
            onNext={handleNext}
            onToday={handleToday}
          />
        }
        center={<DatePicker name="date" control={control} label="日付" />}
        right={
          <RightControls
            showCancel={showCancel}
            setShowCancel={setShowCancel}
          />
        }
        rightIcon={rightIcon}
        menubar={menubar}
        isMenubarOpen={isMenubarOpen}
      >
        {schedules.schedules === undefined ? (
          <Loading />
        ) : (
          <CalendarContainer
            showCancel={showCancel}
            schedules={schedules.schedules}
          />
        )}
      </Header>
    </div>
  )
}
