import { Checkbox, CheckboxStateType } from '@/app/_components/Checkbox'
import type { User } from '@/types/user'
import type { FC } from 'react'

export const MemberCheckbox: FC<{
  member: User
  showMembers: User[]
  setShowMembers: (members: User[]) => void
}> = ({ member, showMembers, setShowMembers }) => {
  const isChecked = showMembers.some(
    (showMember) => showMember.id === member.id,
  )

  const toggleMember = () => {
    if (isChecked) {
      setShowMembers(
        showMembers.filter((showMember) => showMember.id !== member.id),
      )
    } else {
      setShowMembers([...showMembers, member])
    }
  }

  return (
    <Checkbox
      checkBoxState={
        isChecked ? CheckboxStateType.CHECKED : CheckboxStateType.DEFAULT
      }
      label={member.name}
      onClick={toggleMember}
    />
  )
}
