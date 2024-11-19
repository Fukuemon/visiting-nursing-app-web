import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController, useForm } from 'react-hook-form'

import { Loading } from '@/app/_components/Loading'
import { SearchInput } from '@/app/_components/SearchInput'
import { SelectButton } from '@/app/_components/SelectButton'
import Table from '@/app/_components/Table'
import { useTeamList } from '@/hooks/api/team'
import { useUserList } from '@/hooks/api/user'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './style.module.css'

export type ScheduleUserEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

export const ScheduleUserEdit = <T extends FieldValues>({
  control,
  name,
}: ScheduleUserEditProps<T>) => {
  const facilityId = '01J6SMYDSKKKNJCR2Y3242T7YX'
  const { teams, error: teamsError } = useTeamList(facilityId)
  const {
    control: controlSearch,
    watch: watchSearch,
    handleSubmit,
  } = useForm<{
    username: string
    team: string
  }>({ defaultValues: { username: '', team: '' } })
  const { users, error, mutate } = useUserList([
    facilityId,
    watchSearch('username'),
    '',
    '',
    watchSearch('team'),
  ])

  const { field } = useController({
    name,
    control,
  })

  if (error !== undefined && error.message !== '') {
    throw new Error(error.message)
  }
  if (teamsError !== undefined && teamsError.message !== '') {
    throw new Error(teamsError.message)
  }

  useDebounce<{ search: string }>(
    () => {
      mutate()
    },
    {
      value: { search: watchSearch('username') },
      debounceMs: 500,
    },
  )
  return (
    <div className={styles.userEdit}>
      <form
        className={styles.searchInput}
        onSubmit={handleSubmit(() => {
          mutate()
        })}
      >
        <SearchInput
          placeholder="メンバーを検索"
          control={controlSearch}
          name="username"
        />
        {teams === undefined ? (
          <Loading />
        ) : (
          <SelectButton
            control={controlSearch}
            name="team"
            options={[
              {
                label: 'すべてのチーム',
                value: '',
              },
              ...teams.map((team) => ({
                label: team.name,
                value: team.name,
              })),
            ]}
          />
        )}
      </form>
      <div className={styles.table}>
        <Table>
          <Table.Header>
            <Table.Row className={styles.userRow}>
              <Table.Cell expanded>名前</Table.Cell>
              <Table.Cell>チーム</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users?.map((user) => (
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
                    <span className={styles.label}>{user.username}</span>
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
