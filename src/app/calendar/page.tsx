'use client'
import { Header } from '@/app/_components/Header'
import { IconButton } from '@/app/_components/IconButton'
import { Menubar } from '@/app/_components/Menubar'
import { ToggleStateType } from '@/app/_components/Toggle'
import { CalendarContainer } from '@/app/calendar/_components/CalendarContainer'
import { CalendarView } from '@/constants/calendarView'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './style.module.css'
import MenuIcon from '/public/icons/menu.svg'
import UserIcon from '/public/icons/user.svg'

import { LeftControls } from '@/app/calendar/_components/CalendarLeftControls'
import { RightControls } from '@/app/calendar/_components/CalendarRightControls'
import { useCalendarNavigation } from '@/app/calendar/hooks/useCalendarNavigation'
import { CurrentCalendarDateAtom } from '@/app/calendar/provider/calendar'
import { LINKS } from '@/constants/navLinks'
import { useAtom } from 'jotai'

export default function CalendarPage() {
  const [isMenubarOpen, setIsMenuBarOpen] = useState(false)
  const [currentCalendarView, setCurrentCalendarView] = useState<CalendarView>(
    CalendarView.dayGridMonth,
  )
  const [showCancel, setShowCancel] = useState(ToggleStateType.DEFAULT)
  const pathname = usePathname()
  const router = useRouter()
  const [currentCalendarDate, setCurrentCalendarDate] = useAtom(
    CurrentCalendarDateAtom,
  )

  const { handlePrev, handleNext, handleToday } = useCalendarNavigation(
    currentCalendarView,
    currentCalendarDate,
    setCurrentCalendarDate,
  )

  const menubar = (
    <Menubar links={LINKS} currentLink={pathname} isOpen={isMenubarOpen} />
  )

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
        center={currentCalendarDate.toLocaleDateString()}
        right={
          <RightControls
            currentCalendarView={currentCalendarView}
            setCurrentCalendarView={setCurrentCalendarView}
            showCancel={showCancel}
            setShowCancel={setShowCancel}
          />
        }
        rightIcon={rightIcon}
        menubar={menubar}
        isMenubarOpen={isMenubarOpen}
      >
        <CalendarContainer
          currentCalendarView={currentCalendarView}
          showCancel={showCancel}
        />
      </Header>
    </div>
  )
}
