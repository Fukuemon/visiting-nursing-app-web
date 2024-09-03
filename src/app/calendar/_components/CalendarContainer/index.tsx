import type { ToggleStateType } from '@/app/_components/Toggle'
import { CalendarPresentational } from '@/app/calendar/_components/CalendarPresentational'
import { CalendarSidebar } from '@/app/calendar/_components/CalendarSidebar'
import { CalendarTimeGridDayParent } from '@/app/calendar/_components/CalendarTimeGridDayParent'
import { CalendarTimeGridDayPresentational } from '@/app/calendar/_components/CalendarTimeGridDayPresentational'
import { CalendarView } from '@/constants/calendarView'
import { ServiceCodeDuration } from '@/constants/serviceCode'
import type { CalendarEvent, Events } from '@/types/event'
import type { User } from '@/types/user'
import { useEffect, useRef, useState, type FC } from 'react'
import styles from './style.module.css'

const createEvent = (
  id: string,
  userId: string,
  isCancel: boolean,
  offsetDays: number = 0,
): CalendarEvent => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + offsetDays)
  const endDate = new Date(startDate)
  endDate.setMinutes(endDate.getMinutes() + ServiceCodeDuration.訪看I1)

  return {
    id,
    title: '訪問',
    userId,
    start: startDate,
    end: endDate,
    startEditable: false,
    durationEditable: false,
    isCancel,
  }
}

const events: CalendarEvent[] = [
  createEvent('1', 'a', false),
  createEvent('2', 'b', true, 1),
  createEvent('3', 'c', true, 3),
  createEvent('4', 'c', true, 1),
]

const allTeams: { name: string; members: User[] }[] = [
  {
    name: 'A',
    members: [
      { id: 'a', name: '山田太郎', team: 'A' },
      { id: 'b', name: '山田次郎', team: 'A' },
      { id: 'c', name: '山田三郎', team: 'A' },
    ],
  },
  {
    name: 'B',
    members: [
      { id: 'd', name: '山田士郎', team: 'B' },
      { id: 'e', name: '山田五郎', team: 'B' },
      { id: 'f', name: '山田六郎', team: 'B' },
      { id: 'g', name: '山田菜々郎', team: 'B' },
    ],
  },
]

const me = { id: 'a', name: '山田太郎', team: 'A' }

type CalendarContainerProps = {
  currentCalendarView: string
  showCancel: ToggleStateType
}

export const CalendarContainer: FC<CalendarContainerProps> = ({
  currentCalendarView,
  showCancel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [showMembers, setShowMembers] = useState<User[]>([me])
  const [visibleEvents, setVisibleEvents] = useState<Events>([])
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([])
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollPositions = useRef<number[]>([]) // スクロール位置を保存する配列

  const handleScroll = (index: number) => {
    const scrollTop = scrollRefs.current[index]?.scrollTop ?? 0
    scrollPositions.current[index] = scrollTop // スクロール位置を保存
    scrollRefs.current.forEach((ref, i) => {
      if (i !== index && ref !== null) {
        ref.scrollTop = scrollTop
      }
    })
  }

  const filterEvents = () => {
    let filteredEvents = events.filter((event) =>
      showMembers.some((member) => member.id === event.userId),
    )

    if (showCancel === 'default') {
      filteredEvents = filteredEvents.filter((event) => event.isCancel)
    }

    setVisibleEvents(filteredEvents)
  }

  useEffect(() => {
    filterEvents()
  }, [showMembers, showCancel])

  useEffect(() => {
    const currentElement = containerRef.current
    if (currentElement !== null) {
      const handleResize = (entries: ResizeObserverEntry[]) => {
        if (resizeTimeoutRef.current !== null) {
          clearTimeout(resizeTimeoutRef.current)
        }
        resizeTimeoutRef.current = setTimeout(() => {
          for (const entry of entries) {
            setWidth(entry.contentRect.width)
          }
        }, 100) // 0.15秒に一度の間隔で更新
      }

      const resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(currentElement)

      return () => {
        resizeObserver.unobserve(currentElement)
        if (resizeTimeoutRef.current !== null) {
          clearTimeout(resizeTimeoutRef.current)
        }
      }
    }
  }, [])

  useEffect(() => {
    // 初期ロード時にスクロール位置を半分に設定
    scrollRefs.current.forEach((ref, index) => {
      if (ref !== null) {
        const halfScroll = ref.scrollHeight / 2 - ref.clientHeight / 2
        ref.scrollTop = halfScroll
        scrollPositions.current[index] = halfScroll
      }
    })
  }, []) // 空の依存配列で初回ロード時のみ実行

  useEffect(() => {
    // スクロール位置を復元
    scrollRefs.current.forEach((ref, index) => {
      if (ref !== null && scrollPositions.current[index] !== undefined) {
        ref.scrollTop = scrollPositions.current[index]
      }
    })
  }, [width]) // widthが変更されたときにスクロール位置を復元

  return (
    <div ref={containerRef} className={styles.container}>
      {currentCalendarView !== CalendarView.timeGridDay ? (
        <div className={styles.calender}>
          <CalendarPresentational
            key={width}
            events={visibleEvents}
            currentCalendarView={currentCalendarView}
          />
        </div>
      ) : (
        <div className={styles.timeGridDayContainer}>
          <div className={styles.parentContainer}>
            <div
              key="time"
              className={styles.parentBody}
              ref={(el) => {
                scrollRefs.current[0] = el
              }}
              onScroll={() => handleScroll(0)}
            >
              <p className={styles.name}>時間</p>
              <CalendarTimeGridDayParent />
            </div>
          </div>
          {showMembers.map((member, index) => {
            const memberEvents = visibleEvents.filter(
              (event) => event.userId === member.id,
            )

            return (
              <div
                key={member.id}
                className={styles.timeGridDay}
                ref={(el) => {
                  scrollRefs.current[index + 1] = el
                }}
                onScroll={() => handleScroll(index + 1)}
              >
                <p className={styles.name}>{member.name}</p>
                <CalendarTimeGridDayPresentational
                  key={width}
                  events={memberEvents}
                />
              </div>
            )
          })}
          <div className={styles.parentContainer}>
            <div
              key="additional"
              className={styles.parentBody}
              ref={(el) => {
                scrollRefs.current[showMembers.length + 1] = el
              }}
              onScroll={() => handleScroll(showMembers.length + 1)}
            >
              <p className={styles.name}>時間</p>
              <CalendarTimeGridDayParent />
            </div>
          </div>
        </div>
      )}
      <CalendarSidebar
        allTeams={allTeams}
        me={me}
        showMembers={showMembers}
        setShowMembers={setShowMembers}
      />
    </div>
  )
}
