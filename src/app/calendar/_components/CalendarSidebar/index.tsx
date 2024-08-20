import { Checkbox, CheckboxStateType } from '@/app/_components/Checkbox'
import { TextInput } from '@/app/_components/TextInput'
import { MemberCheckbox } from '@/app/calendar/_components/MemberCheckbox'
import { SearchResults } from '@/app/calendar/_components/SearchResults'
import { TeamCheckbox } from '@/app/calendar/_components/TeamCheckBox'
import type { User } from '@/types/user'
import { useState, type FC } from 'react'
import styles from './style.module.css'
import SearchIcon from '/public/icons/search.svg'

type CalendarSidebarProps = {
  me: User
  showMembers: User[]
  setShowMembers: (member: User[]) => void
  allTeams: { name: string; members: User[] }[]
}

export const CalendarSidebar: FC<CalendarSidebarProps> = ({
  allTeams,
  me,
  showMembers,
  setShowMembers,
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchUsers, setSearchUsers] = useState<User[]>([])

  const handleSearch = () => {
    if (searchText !== '') {
      const allUsers = allTeams.flatMap((team) => team.members)
      const filteredUsers = allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()),
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

  const totalMembersCount = allTeams.reduce(
    (count, team) => count + team.members.length,
    0,
  )

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Checkbox
          checkBoxState={
            showMembers.length === totalMembersCount
              ? CheckboxStateType.CHECKED
              : CheckboxStateType.DEFAULT
          }
          label="全体"
          onClick={() =>
            setShowMembers(
              showMembers.length === totalMembersCount
                ? []
                : allTeams.flatMap((team) => team.members),
            )
          }
        />
        <MemberCheckbox
          member={me}
          showMembers={showMembers}
          setShowMembers={setShowMembers}
        />
      </div>
      <div className={styles.members}>
        {allTeams.map((team) => (
          <TeamCheckbox
            key={team.name}
            team={team}
            showMembers={showMembers}
            setShowMembers={setShowMembers}
          />
        ))}
      </div>
      <div className={styles.search}>
        <TextInput
          placeholder="メンバーを検索"
          icon={searchIcon}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
