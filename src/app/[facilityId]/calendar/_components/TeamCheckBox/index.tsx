import { MemberCheckbox } from '@/app/[facilityId]/calendar/_components/MemberCheckbox'
import { Checkbox, CheckboxStateType } from '@/app/_components/Checkbox'
import type { User } from '@/schema/user'
import type { FC } from 'react'
import styles from './style.module.css'

export const TeamCheckbox: FC<{
  teamName: string
  teamMembers: User[]
  showMembers: User[]
  setShowMembers: (members: User[]) => void
}> = ({ teamName, teamMembers, showMembers, setShowMembers }) => {
  const allMembersInTeamSelected = teamMembers.every((member) =>
    showMembers.some((showMember) => showMember.id === member.id),
  )

  const toggleTeamMembers = () => {
    if (allMembersInTeamSelected) {
      setShowMembers(
        showMembers.filter(
          (showMember) =>
            !teamMembers.some((member) => member.id === showMember.id),
        ),
      )
    } else {
      setShowMembers([
        ...showMembers,
        ...teamMembers.filter(
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
        label={`${teamName}チーム`}
        onClick={toggleTeamMembers}
      />
      {teamMembers.map((member) => (
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
