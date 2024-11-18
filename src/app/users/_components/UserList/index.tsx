import Table from '@/app/_components/Table'
import type { User } from '@/schema/user'
import { pagesPath } from '@/utils/$path'
import Link from 'next/link'
import styles from './style.module.css'
// import ArrowBottomIcon from '/public/icons/arrow-bottom.svg'
// import ArrowTopIcon from '/public/icons/arrow-top.svg'

export type UserListProps = {
  users: User[]
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <div className={styles.userList}>
      <Table>
        <Table.Header>
          <Table.Row className={styles.userRow}>
            <Table.Cell>名前</Table.Cell>
            <Table.Cell>役職</Table.Cell>
            <Table.Cell>部署</Table.Cell>
            <Table.Cell>チーム</Table.Cell>
            <Table.Cell>エリア</Table.Cell>
            {/* <Table.Cell>
              <div className={styles.monthlyOperatingHours}>
                月稼働時間
                <button onClick={toggleSortOrder}>
                  {sortOrder === 'asc' ? (
                    <ArrowTopIcon width={16} height={16} />
                  ) : (
                    <ArrowBottomIcon width={16} height={16} />
                  )}
                </button>
              </div>
            </Table.Cell> */}
          </Table.Row>
        </Table.Header>
        {users.map((user) => (
          <Table.Row className={styles.userRow} key={user.id}>
            <Table.Cell>
              <Link
                className={styles.link}
                href={pagesPath.users._userId(user.id).$url().path}
              >
                {user.username}
              </Link>
            </Table.Cell>
            <Table.Cell>{user.position}</Table.Cell>
            <Table.Cell>{user.department}</Table.Cell>
            <Table.Cell>{user.team}</Table.Cell>
            <Table.Cell>{user.area}</Table.Cell>
            {/* <Table.Cell>{user.monthlyOperatingHours}</Table.Cell> */}
          </Table.Row>
        ))}
      </Table>
    </div>
  )
}
