'use client'

import { UserList } from '@/app/[facilityId]/users/_components/UserList'
import { Loading } from '@/app/_components/Loading'
import { SearchInput } from '@/app/_components/SearchInput'
import { SelectButton } from '@/app/_components/SelectButton'
import { useDepartmentList } from '@/hooks/api/department'
import { usePositionList } from '@/hooks/api/position'
import { useTeamList } from '@/hooks/api/team'
import { useUserList } from '@/hooks/api/user'
import { useDebounce } from '@/hooks/useDebounce'
import type { UserSearchParams } from '@/schema/user'
import { useForm } from 'react-hook-form'
import styles from './style.module.css'

export const UsersContainer = () => {
  const facilityId = '01J6SMYDSKKKNJCR2Y3242T7YX'
  const { control, watch, handleSubmit } = useForm<UserSearchParams>({
    defaultValues: {
      username: '',
      team: '',
      position: '',
      department: '',
    },
  })
  const users = useUserList([
    facilityId,
    watch('username'),
    watch('position'),
    watch('department'),
    watch('team'),
  ])

  const teams = useTeamList(facilityId)
  const positions = usePositionList(facilityId)
  const departments = useDepartmentList(facilityId)

  useDebounce<{ search: string }>(
    () => {
      users.mutate()
    },
    {
      value: { search: watch('username') },
      debounceMs: 500,
    },
  )

  if (users.error !== undefined) return <div>Error: {users.error.message}</div>

  return (
    <div>
      <form
        className={styles.searchInput}
        onSubmit={handleSubmit(() => {
          users.mutate()
        })}
      >
        <SearchInput control={control} name="username" />
        {positions.positions === undefined ? (
          <Loading />
        ) : (
          <SelectButton
            control={control}
            name="position"
            options={[
              {
                label: 'すべての役職',
                value: '',
              },
              ...positions.positions.map((position) => ({
                label: position.name,
                value: position.name,
              })),
            ]}
          />
        )}
        {departments.departments === undefined ? (
          <Loading />
        ) : (
          <SelectButton
            control={control}
            name="department"
            options={[
              {
                label: 'すべての部署',
                value: '',
              },
              ...departments.departments.map((department) => ({
                label: department.name,
                value: department.name,
              })),
            ]}
          />
        )}
        {teams.teams === undefined ? (
          <Loading />
        ) : (
          <SelectButton
            control={control}
            name="team"
            options={[
              {
                label: 'すべてのチーム',
                value: '',
              },
              ...teams.teams.map((team) => ({
                label: team.name,
                value: team.name,
              })),
            ]}
          />
        )}
      </form>
      {users.users === undefined ? (
        <Loading />
      ) : (
        <UserList users={users.users} />
      )}
    </div>
  )
}
