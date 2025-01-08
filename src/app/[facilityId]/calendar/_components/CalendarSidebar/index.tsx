import { MemberCheckbox } from '@/app/[facilityId]/calendar/_components/MemberCheckbox'
import { SearchResults } from '@/app/[facilityId]/calendar/_components/SearchResults'
import { TeamCheckbox } from '@/app/[facilityId]/calendar/_components/TeamCheckBox'
import { Checkbox, CheckboxStateType } from '@/app/_components/Checkbox'
import { SearchInput } from '@/app/_components/SearchInput'
import type { Team } from '@/schema/team'
import type { User } from '@/schema/user'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './style.module.css'

type CalendarSidebarProps = {
  currentUser: User
  showMembers: User[]
  setShowMembers: (member: User[]) => void
  users: User[]
  teams: Team[]
  queryParams: URLSearchParams
}

export const CalendarSidebar: FC<CalendarSidebarProps> = ({
  currentUser,
  showMembers,
  setShowMembers,
  users,
  teams,
  queryParams,
}) => {
  const { control, watch } = useForm<{ searchText: string }>({
    defaultValues: {
      searchText: '',
    },
  })
  const searchText = watch('searchText')
  const [searchUsers, setSearchUsers] = useState<User[]>([])
  useEffect(() => {
    setShowMembers(
      queryParams.get('userIds') !== null
        ? queryParams
            .get('userIds')
            ?.split(',')
            .map((id) => users.find((user) => user.id === id))
            .filter((user): user is User => user !== undefined) ?? [currentUser]
        : [currentUser],
    )
  }, [users])

  const handleSearch = () => {
    if (searchText !== '') {
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchText.toLowerCase()),
      )
      setSearchUsers(filteredUsers)
    } else {
      setSearchUsers([])
    }
  }

  useEffect(() => {
    handleSearch()
  }, [searchText])

  useEffect(() => {
    if (showMembers.length === 0) {
      setShowMembers([currentUser])
    }
  }, [currentUser, setShowMembers, showMembers])

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Checkbox
          checkBoxState={
            showMembers.length === users.length
              ? CheckboxStateType.CHECKED
              : CheckboxStateType.DEFAULT
          }
          label="全体"
          onClick={() =>
            setShowMembers(showMembers.length === users.length ? [] : users)
          }
        />
        <MemberCheckbox
          member={currentUser}
          showMembers={showMembers}
          setShowMembers={setShowMembers}
          label="自分"
        />
      </div>
      <div className={styles.members}>
        {teams.map((team) => (
          <TeamCheckbox
            key={team.name}
            teamName={team.name}
            teamMembers={users.filter((user) => user.team === team.name)}
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            color={team.color}
          />
        ))}
      </div>
      <div className={styles.search}>
        <SearchInput
          placeholder="メンバーを検索"
          name="searchText"
          control={control}
        />
        <SearchResults
          searchUsers={searchUsers}
          showMembers={showMembers}
          setShowMembers={setShowMembers}
        />
      </div>
    </div>
  )
}
