import { Checkbox, CheckboxStateType } from '@/app/_components/Checkbox'
import { SearchInput } from '@/app/_components/SearchInput'
import { MemberCheckbox } from '@/app/calendar/_components/MemberCheckbox'
import { SearchResults } from '@/app/calendar/_components/SearchResults'
import { TeamCheckbox } from '@/app/calendar/_components/TeamCheckBox'
import { Team } from '@/schema/team'
import type { User } from '@/schema/user'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import styles from './style.module.css'
import SearchIcon from '/public/icons/search.svg'

type CalendarSidebarProps = {
  currentUser: User
  showMembers: User[]
  setShowMembers: (member: User[]) => void
  users: User[]
  teams: Team[]
}

export const CalendarSidebar: FC<CalendarSidebarProps> = ({
  currentUser,
  showMembers,
  setShowMembers,
  users,
  teams,
}) => {
  const { control, watch } = useForm<{ searchText: string }>({
    defaultValues: {
      searchText: '',
    },
  })
  const searchText = watch('searchText')
  const [searchUsers, setSearchUsers] = useState<User[]>([])

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

  const searchIcon = (
    <button onClick={handleSearch}>
      <SearchIcon />
    </button>
  )

  useEffect(() => {
    handleSearch()
  }, [searchText])

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
