import { EmailEditModal } from '@/app/[facilityId]/users/[userId]/_components/EmailEditModal'
import { PhoneNumberEditModal } from '@/app/[facilityId]/users/[userId]/_components/PhoneNumberEditModal'
import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'
import { pagesPath } from '@/utils/$path'

import { DepartmentEditModal } from '@/app/[facilityId]/users/[userId]/_components/DepartmentEditModal'
import { NameEditModal } from '@/app/[facilityId]/users/[userId]/_components/NameEditModal'
import { PasswordResetModal } from '@/app/[facilityId]/users/[userId]/_components/PasswordResetModal'
import { PositionEditModal } from '@/app/[facilityId]/users/[userId]/_components/PositionEditModal'
import { TeamEditModal } from '@/app/[facilityId]/users/[userId]/_components/TeamEditModal'
import { Loading } from '@/app/_components/Loading'
import { useDepartmentList } from '@/hooks/api/department'
import { usePositionList } from '@/hooks/api/position'
import { useTeamList } from '@/hooks/api/team'
import type { User } from '@/schema/user'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import styles from './style.module.css'

export type UserDetailContainerProps = {
  user: User
}

export const UserDetailContainer: FC<UserDetailContainerProps> = ({ user }) => {
  const facilityId = '01J6SMYDSKKKNJCR2Y3242T7YX'
  const teams = useTeamList(facilityId)
  const positions = usePositionList(facilityId)
  const departments = useDepartmentList(facilityId)
  const getButtonLabel = (value: string | null) => {
    return value !== null ? '変更' : '追加'
  }
  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        <h2 className={styles.title}>ユーザー情報</h2>
        <ul className={styles.list}>
          {/* アカウント名 */}
          <li className={styles.listItem}>
            <p className={styles.listTitle}>アカウント名</p>
            <p className={styles.listText}>
              {user.username !== '' ? user.username : '未設定'}
            </p>
            <Modal className={styles.item}>
              <Modal.Trigger className={styles.listButton}>
                {getButtonLabel(user.username)}
              </Modal.Trigger>
              <NameEditModal
                defaultValues={{
                  username: user.username ?? '',
                }}
                onSubmit={async (data) => {
                  // TODO: アカウント名変更処理
                  console.log(data)
                  //   await updateMember({
                  //     memberId,
                  //     familyName: data.familyName,
                  //     givenName: data.givenName,
                  //     familyNameKana: data.familyNameKana,
                  //     givenNameKana: data.givenNameKana,
                  //   })
                  //   await refetch()
                }}
              />
            </Modal>
          </li>

          {/* メールアドレス */}
          <li className={styles.listItem}>
            <p className={styles.listTitle}>メールアドレス</p>
            <p className={styles.listText}>{user.email ?? '未設定'}</p>
            <Modal className={styles.item}>
              <Modal.Trigger className={styles.listButton}>
                {getButtonLabel(user.email)}
              </Modal.Trigger>
              <EmailEditModal
                defaultValues={{
                  email: user.email ?? '',
                }}
                onSubmit={(data) => {
                  // TODO: メールアドレス変更処理
                  console.log(data)
                }}
              />
            </Modal>
          </li>

          {/* 電話番号 */}
          <li className={styles.listItem}>
            <p className={styles.listTitle}>電話番号</p>
            <p className={styles.listText}>
              {user.phone !== undefined ? user.phone : '未設定'}
            </p>
            <Modal className={styles.item}>
              <Modal.Trigger className={styles.listButton}>
                {getButtonLabel(user.phone)}
              </Modal.Trigger>
              <PhoneNumberEditModal
                defaultValue={user?.phone ?? ''}
                onSubmit={async (data) => {
                  // TODO: 電話番号変更処理
                  console.log(data)
                }}
              />
            </Modal>
          </li>

          {/* パスワード */}
          <li className={styles.listItem}>
            <p className={styles.listTitle}>パスワード</p>
            <p className={styles.listText}>ユーザーが設定したパスワード</p>
            <Modal className={styles.item}>
              <Modal.Trigger className={styles.listButton}>
                リセット
              </Modal.Trigger>
              <PasswordResetModal />
            </Modal>
          </li>

          {/* 役職 */}
          <li className={styles.listItem}>
            <p className={styles.listTitle}>役職</p>
            <p className={styles.listText}>
              {user.position !== undefined ? user.position : '未設定'}
            </p>
            <Modal className={styles.item}>
              <Modal.Trigger className={styles.listButton}>変更</Modal.Trigger>
              {positions.positions === undefined ? (
                <Loading />
              ) : (
                <PositionEditModal
                  defaultValues={{
                    position: user.position ?? '',
                  }}
                  onSubmit={async (data) => {
                    // TODO: 役職変更処理
                    console.log(data)
                  }}
                  positions={positions.positions}
                />
              )}
            </Modal>
          </li>

          {/* 部署 */}
          <li className={styles.listItem}>
            <p className={styles.listTitle}>部署</p>
            <p className={styles.listText}>
              {user.department !== undefined ? user.department : '未設定'}
            </p>
            <Modal className={styles.item}>
              <Modal.Trigger className={styles.listButton}>変更</Modal.Trigger>
              {departments.departments === undefined ? (
                <Loading />
              ) : (
                <DepartmentEditModal
                  defaultValues={{
                    department: user.department ?? '',
                  }}
                  onSubmit={async (data) => {
                    // TODO: 部署変更処理
                    console.log(data)
                  }}
                  departments={departments.departments}
                />
              )}
            </Modal>
          </li>

          {/* チーム */}
          <li className={styles.listItem}>
            <p className={styles.listTitle}>チーム</p>
            <p className={styles.listText}>
              {user.team !== undefined ? user.team : '未設定'}
            </p>
            <Modal className={styles.item}>
              <Modal.Trigger className={styles.listButton}>変更</Modal.Trigger>
              {teams.teams === undefined ? (
                <Loading />
              ) : (
                <TeamEditModal
                  defaultValues={{
                    team: user.team ?? '',
                  }}
                  onSubmit={async (data) => {
                    // TODO: チーム変更処理
                    console.log(data)
                  }}
                  teams={teams.teams}
                />
              )}
            </Modal>
          </li>
        </ul>
      </div>

      <div className={styles.deleteUserSection}>
        <Button
          variant="destructive"
          size="M"
          onClick={() => {
            if (confirm('本当に削除しますか？この操作は取り消せません。')) {
              // deleteMember({ memberId })
              router.push(pagesPath.users.$url().path)
            }
          }}
        >
          ユーザーを削除
        </Button>
      </div>
    </div>
  )
}
