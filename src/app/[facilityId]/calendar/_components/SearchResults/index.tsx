import { Checkbox, CheckboxStateType } from '@/app/_components/Checkbox'
import type { User } from '@/schema/user'
import type { FC } from 'react'
import styles from './style.module.css'

export const SearchResults: FC<{
  searchUsers: User[]
  showMembers: User[]
  setShowMembers: (members: User[]) => void
}> = ({ searchUsers, showMembers, setShowMembers }) => (
  <div className={styles.searchMembers}>
    <table className={styles.table}>
      <thead>
        <tr className={styles.heading}>
          <th></th>
          <th>名前</th>
          <th>チーム</th>
        </tr>
      </thead>
      <tbody>
        {searchUsers.map((member) => (
          <tr key={member.id} className={styles.row}>
            <td>
              <span>
                <Checkbox
                  checkBoxState={
                    showMembers.some(
                      (showMember) => showMember.id === member.id,
                    )
                      ? CheckboxStateType.CHECKED
                      : CheckboxStateType.DEFAULT
                  }
                  onClick={() =>
                    showMembers.some(
                      (showMember) => showMember.id === member.id,
                    )
                      ? setShowMembers(
                          showMembers.filter(
                            (showMember) => showMember.id !== member.id,
                          ),
                        )
                      : setShowMembers([...showMembers, member])
                  }
                />
              </span>
            </td>
            <td>
              <span>{member.username}</span>
            </td>
            <td>
              <span>{member.team}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
