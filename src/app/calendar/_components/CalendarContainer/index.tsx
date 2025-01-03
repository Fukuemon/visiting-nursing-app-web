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

const getUserBorderColor = (userId: string): string => {
  // ユーザーIDに基づいて色を割り当てる
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33F1',
    '#33FFF1',
    '#F1FF33',
    '#FF3333',
    '#33FF33',
    '#3333FF',
    '#FFFF33',
    '#33FFFF',
    '#FF33FF',
  ]
  const colorIndex = userId.charCodeAt(0) % colors.length
  return colors[colorIndex]
}

const createEvent = (
  id: string,
  userId: string,
  isCanceled: boolean,
  startDateTime: Date,
  durationMinutes: number = ServiceCodeDuration.訪看I1,
  backgroundColor: string = 'blue',
): CalendarEvent => {
  const endDate = new Date(startDateTime)
  endDate.setMinutes(endDate.getMinutes() + durationMinutes)
  const extendedProps = {
    userId,
    isCanceled,
  }

  // isCanceled が true の場合、backgroundColor を 'red' に設定
  const eventBackgroundColor = isCanceled ? '#fff2f2' : backgroundColor
  const textColor = isCanceled ? 'gray' : 'white'

  // userIdに基づいてborderColorを設定
  const borderColor = getUserBorderColor(userId)

  return {
    id,
    title: '訪問',
    start: startDateTime,
    end: endDate,
    startEditable: true,
    durationEditable: false,
    backgroundColor: eventBackgroundColor,
    borderColor,
    textColor,
    extendedProps,
  }
}

const events: CalendarEvent[] = [
  createEvent('1', 'a', false, new Date(), 30, 'green'),
  createEvent(
    '2',
    'b',
    true,
    new Date(new Date().setDate(new Date().getDate() + 1)),
    30,
    'green',
  ),
  createEvent(
    '3',
    'c',
    true,
    new Date(new Date().setDate(new Date().getDate() + 3)),
    45,
    'green',
  ),
  createEvent(
    '4',
    'd',
    false,
    new Date(new Date().setHours(new Date().getHours() + 2)),
    60,
  ),
  createEvent(
    '5',
    'e',
    false,
    new Date(new Date().setHours(new Date().getHours() + 5)),
    90,
  ),
  createEvent(
    '6',
    'f',
    false,
    new Date(new Date().setDate(new Date().getDate() + 1)),
    120,
  ),
  createEvent(
    '7',
    'g',
    false,
    new Date(new Date().setDate(new Date().getDate() + 2)),
    45,
  ),
  createEvent(
    '8',
    'h',
    false,
    new Date(new Date().setDate(new Date().getDate() + 1)),
    15,
  ),
  createEvent(
    '9',
    'i',
    false,
    new Date(new Date().setDate(new Date().getDate() + 4)),
    30,
  ),
  createEvent(
    '10',
    'j',
    true,
    new Date(new Date().setDate(new Date().getDate() + 1)),
    60,
  ),
  createEvent(
    '11',
    'k',
    false,
    new Date(new Date().setDate(new Date().getDate() + 3)),
    75,
  ),
  createEvent(
    '12',
    'l',
    true,
    new Date(new Date().setDate(new Date().getDate() + 5)),
    120,
  ),
  createEvent(
    '13',
    'a',
    true,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      return d
    })(),
    60,
    'green',
  ),
  createEvent(
    '14',
    'a',
    false,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(1)
      return d
    })(),
    90,
    'green',
  ),
  createEvent(
    '15',
    'b',
    false,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(2)
      return d
    })(),
    45,
    'green',
  ),
  createEvent(
    '16',
    'b',
    false,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(3)
      return d
    })(),
    30,
    'green',
  ),
  createEvent(
    '17',
    'c',
    false,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(4)
      return d
    })(),
    60,
    'green',
  ),
  createEvent(
    '18',
    'c',
    true,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(5)
      return d
    })(),
    120,
    'green',
  ),
  createEvent(
    '19',
    'a',
    false,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(6)
      return d
    })(),
    30,
    'green',
  ),
  createEvent(
    '20',
    'b',
    false,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(7)
      return d
    })(),
    60,
    'green',
  ),
  createEvent(
    '21',
    'c',
    false,
    (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(8)
      return d
    })(),
    90,
    'green',
  ),
]

const allTeams: { name: string; members: User[] }[] = [
  {
    name: 'A',
    members: [
      { id: 'a', name: '山田太郎', team: 'A' },
      { id: 'b', name: '鈴木次郎', team: 'A' },
      { id: 'c', name: '伊藤三郎', team: 'A' },
    ],
  },
  {
    name: 'B',
    members: [
      { id: 'd', name: '山田士郎', team: 'B' },
      { id: 'e', name: '鈴木五郎', team: 'B' },
      { id: 'f', name: '伊藤六郎', team: 'B' },
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
      showMembers.some((member) => member.id === event.extendedProps.userId),
    )

    if (showCancel === 'default') {
      filteredEvents = filteredEvents.filter(
        (event) => !event.extendedProps.isCanceled,
      )
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
              <CalendarTimeGridDayParent />
            </div>
          </div>
          {showMembers.map((member, index) => {
            const memberEvents = visibleEvents.filter(
              (event) => event.extendedProps.userId === member.id,
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
