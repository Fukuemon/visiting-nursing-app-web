'use client'
import { CalendarContainer } from '@/app/[facilityId]/calendar/_components/CalendarContainer'
import { Header } from '@/app/_components/Header'
import { IconButton } from '@/app/_components/IconButton'
import { Menubar } from '@/app/_components/Menubar'
import { ToggleStateType } from '@/app/_components/Toggle'
import { CalendarView } from '@/constants/calendarView'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './style.module.css'
import MenuIcon from '/public/icons/menu.svg'
import UserIcon from '/public/icons/user.svg'

import { LeftControls } from '@/app/[facilityId]/calendar/_components/CalendarLeftControls'
import { RightControls } from '@/app/[facilityId]/calendar/_components/CalendarRightControls'
import { useCalendarNavigation } from '@/app/[facilityId]/calendar/hooks/useCalendarNavigation'
import { CurrentCalendarDateAtom } from '@/app/[facilityId]/calendar/provider/calendar'
import { pagesPath } from '@/utils/$path'
import { useAtom } from 'jotai'

export default function CalendarPage() {
  const { facilityId } = useParams<{ facilityId: string }>()

  const LINKS = [
    {
      href: pagesPath._facilityId(facilityId).calendar.$url().path,
      label: 'カレンダー',
    },
    { href: '/patient', label: '患者' },
    {
      href: pagesPath._facilityId(facilityId).users.$url().path,
      label: '職員情報',
    },
    { href: '/indicators', label: '経営数値' },
  ]

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
