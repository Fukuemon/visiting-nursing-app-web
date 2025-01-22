import { CalendarPresentational } from '@/app/[facilityId]/calendar/_components/CalendarPresentational'
import { CalendarSidebar } from '@/app/[facilityId]/calendar/_components/CalendarSidebar'
import { CalendarTimeGridDayParent } from '@/app/[facilityId]/calendar/_components/CalendarTimeGridDayParent'
import { CalendarTimeGridDayPresentational } from '@/app/[facilityId]/calendar/_components/CalendarTimeGridDayPresentational'
import { Loading } from '@/app/_components/Loading'
import { CalendarView } from '@/constants/calendarView'
import { useTeamList } from '@/hooks/api/team'
import { useUserList } from '@/hooks/api/user'
import { useQueryParams } from '@/hooks/useQueryParams'
import type { User } from '@/schema/user'
import type { Events } from '@/types/event'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState, type FC } from 'react'
import styles from './style.module.css'

type CalendarContainerProps = {
  showCancel: boolean
  calendarEvents: Events
}

export const CalendarContainer: FC<CalendarContainerProps> = ({
  showCancel,
  calendarEvents,
}) => {
  const { facilityId } = useParams<{ facilityId: string }>()
  const { queryParams, setQueryParams } = useQueryParams()
  const users = useUserList([facilityId, '', '', '', ''])
  const teams = useTeamList(facilityId)
  const currentUser = {
    id: '01JE2J0PNT3MN60M4M2AHPQCPV',
    username: '山本二郎',
    position: 'member',
    team: 'B',
    facility: 'テスト訪問看護ステーション',
    department: '看護',
    area: 'B',
    policies: [],
    email: 'yamamoto@example.com',
    phone: '',
    created_at: '2024-12-02T11:08:30+09:00',
    updated_at: '2024-12-02T11:08:30+09:00',
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

  const filterEvents = () => {
    // console.log('calendarEvents', calendarEvents)
    if (calendarEvents === null) {
      return
    }
    let filteredEvents = calendarEvents.filter((event) =>
      showMembers.some((member) => member.id === event.extendedProps.userId),
    )
    // console.log('filteredEvents', filteredEvents)
    if (!showCancel) {
      filteredEvents = filteredEvents.filter(
        (event) => !event.extendedProps.isCanceled,
      )
    }
    setVisibleEvents(filteredEvents)
  }

  useEffect(() => {
    filterEvents()
  }, [showMembers, showCancel, calendarEvents])

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
    setQueryParams({ userIds: sortedUsers.map((user) => user.id).join(',') })
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {queryParams.get('tab') !== CalendarView.timeGridDay ? (
        <div className={styles.calender}>
          <CalendarPresentational
            key={width}
            events={visibleEvents}
            currentCalendarView={
              queryParams.get('tab') === CalendarView.timeGridDay ||
              queryParams.get('tab') === CalendarView.dayGridMonth ||
              queryParams.get('tab') === CalendarView.timeGridWeek
                ? queryParams.get('tab') ?? CalendarView.timeGridDay
                : CalendarView.timeGridDay
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
            const memberTeam = teams.teams?.find(
              (team) => team.name === member.team,
            )
            const backgroundColor = memberTeam?.color ?? 'var(--gray-0)'

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
                  style={{
                    backgroundColor,
                  }}
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
          queryParams={queryParams}
        />
      )}
    </div>
  )
}
