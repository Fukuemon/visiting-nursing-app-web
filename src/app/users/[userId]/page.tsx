'use client'
import { useRouter } from 'next/navigation'

import { Loading } from '@/app/_components/Loading'
import { UserDetailContainer } from '@/app/users/[userId]/_components/UserDetailContainer'
import { useUser } from '@/hooks/api/user'
import { Header } from '@/app/_components/Header'
import { IconButton } from '@/app/_components/IconButton'
import BackIcon from '/public/icons/arrow-left.svg'
import { pagesPath } from '@/utils/$path'

export default function ManagerMemberSettingPage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const { user, error } = useUser(userId)

  // const { mutateAsync: updateMember } = trpc.manager.member.update.useMutation()

  // const { mutateAsync: deleteMember } = trpc.manager.member.delete.useMutation()
  const router = useRouter()

  if (error !== undefined && error.message !== '') {
    throw new Error(`Error: ${error.message}`)
  }

  if (user === undefined) {
    return <Loading />
  }

  console.log(user)

  const leftIcon = (
    <IconButton onClick={() => router.push(pagesPath.users.$url().path)}>
      <BackIcon height={32} width={32} />
    </IconButton>
  )

  return (
    <Header
      center={<h1>職員詳細</h1>}
      leftIcon={leftIcon}
    >
      <UserDetailContainer user={user} />
    </Header>
  )
}
