import { CalendarPresentational } from '@/app/[facilityId]/calendar/_components/CalendarPresentational'
import { CalendarSidebar } from '@/app/[facilityId]/calendar/_components/CalendarSidebar'
import { CalendarTimeGridDayParent } from '@/app/[facilityId]/calendar/_components/CalendarTimeGridDayParent'
import { CalendarTimeGridDayPresentational } from '@/app/[facilityId]/calendar/_components/CalendarTimeGridDayPresentational'
import { Loading } from '@/app/_components/Loading'
import type { ToggleStateType } from '@/app/_components/Toggle'
import { CalendarView } from '@/constants/calendarView'
import { useTeamList } from '@/hooks/api/team'
import { useUserList } from '@/hooks/api/user'
import { useQueryParams } from '@/hooks/useQueryParams'
import type { User } from '@/schema/user'
import type { CalendarEvent, Events } from '@/types/event'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState, type FC } from 'react'
import styles from './style.module.css'

import { eventBackgroundColorCode } from '@/constants/eventBackground'
import { scheduleType } from '@/constants/scheduleType'
import { Schedule } from '@/schema/schedule'

const createEvent = (schedule: Schedule): CalendarEvent => {
  const startDate = new Date(schedule.scheduleDate)
  const endDate = new Date(schedule.scheduleDate)
  startDate.setHours(parseInt(schedule.startTime.slice(0, 2)))
  startDate.setMinutes(parseInt(schedule.startTime.slice(3)))
  endDate.setHours(parseInt(schedule.endTime.slice(0, 2)))
  endDate.setMinutes(parseInt(schedule.endTime.slice(3)))
  let eventBackgroundColor = eventBackgroundColorCode[schedule.scheduleType]

  if (schedule.scheduleType === scheduleType.normal) {
    return {
      id: schedule.scheduleId,
      title: schedule.title,
      start: startDate,
      end: endDate,
      startEditable: true,
      durationEditable: false,
      backgroundColor: eventBackgroundColor,
      // borderColor,
      textColor: 'white',
      extendedProps: {
        userId: schedule.userId,
        isCanceled: false,
      },
    }
  }

  const extendedProps = {
    userId: schedule.userId,
    isCanceled: schedule.isCanceled,
  }
  const textColor = schedule.isCanceled ? 'gray' : 'white'

  if (schedule.isCanceled) {
    eventBackgroundColor = eventBackgroundColorCode.canceled
    return {
      id: schedule.scheduleId,
      title: schedule.description,
      start: startDate,
      end: endDate,
      startEditable: true,
      durationEditable: false,
      backgroundColor: eventBackgroundColor,
      textColor,
      extendedProps,
    }
  }

  return {
    id: schedule.scheduleId,
    title: schedule.title,
    start: startDate,
    end: endDate,
    startEditable: true,
    durationEditable: false,
    backgroundColor: eventBackgroundColor,
    textColor,
    extendedProps,
  }
}

type CalendarContainerProps = {
  showCancel: ToggleStateType
  schedules: Schedule[]
}

const getTeamIndexColor = (teamIndex: number): string => {
  const colors = ['#FFF8DC', '#E0FFD1', '#FFB6C1', '#B0E0E6'] // 4種類の色
  return colors[teamIndex % colors.length]
}

export const CalendarContainer: FC<CalendarContainerProps> = ({
  showCancel,
  schedules,
}) => {
  const { facilityId } = useParams<{ facilityId: string }>()
  const { queryParams } = useQueryParams()
  const users = useUserList([facilityId, '', '', '', ''])
  const teams = useTeamList(facilityId)
  const currentUser = {
    id: '01JAYFC3Q3HGJZ6DP3DN9EPZZR',
    username: 'テストメンバー1',
    position: 'member',
    team: 'C',
    facility: 'テスト訪問看護ステーション',
    department: '看護',
    area: 'B',
    policies: [],
    email: '',
    phone: '+0123456789',
    created_at: '2024-10-24T14:18:15+09:00',
    updated_at: '2024-10-24T14:18:15+09:00',
  }
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [showMembers, setShowMembers] = useState<User[]>([currentUser])
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

  const calendarEvents: CalendarEvent[] = schedules.map(createEvent)

  const filterEvents = () => {
    let filteredEvents = calendarEvents.filter((event) =>
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

  const setShowMembersSorted = (users: User[]) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a.team < b.team) return -1
      if (a.team > b.team) return 1
      return 0
    })
    setShowMembers(showMembers.length === users.length ? [] : sortedUsers)
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {queryParams.get('tab') !== CalendarView.timeGridDay ? (
        <div className={styles.calender}>
          <CalendarPresentational
            key={width}
            events={visibleEvents}
            currentCalendarView={
              queryParams.get('tab') ?? CalendarView.timeGridDay
            }
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

            // チームのインデックスを取得
            const teamIndex = showMembers.findIndex(
              (m) => m.team === member.team,
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
                <p
                  className={styles.name}
                  style={{ backgroundColor: getTeamIndexColor(teamIndex) }}
                >
                  {member.username}
                </p>
                <CalendarTimeGridDayPresentational
                  key={width}
                  events={memberEvents}
                />
              </div>
            )
          })}
        </div>
      )}
      {users.users === undefined ||
      teams.teams === undefined ||
      currentUser === undefined ? (
        <Loading />
      ) : (
        <CalendarSidebar
          users={users.users}
          teams={teams.teams}
          currentUser={currentUser}
          showMembers={showMembers}
          setShowMembers={setShowMembersSorted}
        />
      )}
    </div>
  )
}
