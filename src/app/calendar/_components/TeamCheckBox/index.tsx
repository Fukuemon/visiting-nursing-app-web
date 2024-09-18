import { Checkbox, CheckboxStateType } from '@/app/_components/Checkbox'
import { MemberCheckbox } from '@/app/calendar/_components/MemberCheckbox'
import type { User } from '@/types/user'
import type { FC } from 'react'
import styles from './style.module.css'

export const TeamCheckbox: FC<{
  team: { name: string; members: User[] }
  showMembers: User[]
  setShowMembers: (members: User[]) => void
}> = ({ team, showMembers, setShowMembers }) => {
  const allMembersInTeamSelected = team.members.every((member) =>
    showMembers.some((showMember) => showMember.id === member.id),
  )

  const toggleTeamMembers = () => {
    if (allMembersInTeamSelected) {
      setShowMembers(
        showMembers.filter(
          (showMember) =>
            !team.members.some((member) => member.id === showMember.id),
        ),
      )
    } else {
      setShowMembers([
        ...showMembers,
        ...team.members.filter(
          (member) =>
            !showMembers.some((showMember) => showMember.id === member.id),
        ),
      ])
    }
  }

  return (
    <div className={styles.team}>
      <Checkbox
        checkBoxState={
          allMembersInTeamSelected
            ? CheckboxStateType.CHECKED
            : CheckboxStateType.DEFAULT
        }
        label={`${team.name}チーム`}
        onClick={toggleTeamMembers}
      />
      {team.members.map((member) => (
        <div key={member.id} className={styles.member}>
          <MemberCheckbox
            member={member}
            showMembers={showMembers}
            setShowMembers={setShowMembers}
          />
        </div>
      ))}
    </div>
  )
}
