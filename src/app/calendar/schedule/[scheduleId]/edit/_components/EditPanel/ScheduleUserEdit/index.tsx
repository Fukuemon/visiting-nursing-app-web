import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import Table from '@/app/_components/Table'
import { TextInput } from '@/app/_components/TextInput'
import { useUserList } from '@/hooks/user'
import type { User } from '@/types/user'
import { useState } from 'react'
import styles from './style.module.css'
import SearchIcon from '/public/icons/search.svg'

export type ScheduleUserEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

export const ScheduleUserEdit = <T extends FieldValues>({
  control,
  name,
}: ScheduleUserEditProps<T>) => {
  const { users, isLoading, error } = useUserList()

  const { field } = useController({
    name,
    control,
  })

  const [searchText, setSearchText] = useState('')
  const [searchTextTeam, setSearchTextTeam] = useState('')
  const [searchUsers, setSearchUsers] = useState<User[]>(users ?? [])
  if (isLoading || users === undefined) return <div>Loading...</div>
  if (error !== undefined && error.message !== '') {
    throw new Error(error.message)
  }

  const handleSearch = () => {
    const filteredUsers = users.filter((user) => {
      const matchesName =
        searchText === '' ||
        user.name.toLowerCase().includes(searchText.toLowerCase())
      const matchesTeam =
        searchTextTeam === '' ||
        user.team.toLowerCase().includes(searchTextTeam.toLowerCase())
      return matchesName && matchesTeam
    })
    setSearchUsers(filteredUsers)
  }
  const searchIcon = (
    <button onClick={handleSearch}>
      <SearchIcon />
    </button>
  )
  return (
    <div className={styles.userEdit}>
      <div className={styles.searchInput}>
        <TextInput
          placeholder="メンバーを検索"
          icon={searchIcon}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <TextInput
          placeholder="チームを検索"
          icon={searchIcon}
          value={searchTextTeam}
          onChange={(e) => setSearchTextTeam(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
      </div>
      <div className={styles.table}>
        <Table>
          <Table.Header>
            <Table.Row className={styles.userRow}>
              <Table.Cell expanded>名前</Table.Cell>
              <Table.Cell>チーム</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {searchUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <label className={styles.option}>
                    <input
                      type="radio"
                      className={styles.input}
                      {...field}
                      value={user.id}
                      checked={field.value === user.id}
                    />
                    <span className={styles.label}>{user.name}</span>
                    <span className={styles.label}>{user.team}</span>
                  </label>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
