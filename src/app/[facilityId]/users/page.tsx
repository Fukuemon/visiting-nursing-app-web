'use client'

import { UsersContainer } from '@/app/[facilityId]/users/_components/UsersContainer'
import { Header } from '@/app/_components/Header'
import { IconButton } from '@/app/_components/IconButton'
import { Menubar } from '@/app/_components/Menubar'
import { pagesPath } from '@/utils/$path'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import MenuIcon from '/public/icons/menu.svg'

export default function Users() {
  const [isMenubarOpen, setIsMenubarOpen] = useState(false)
  const { facilityId } = useParams<{ facilityId: string }>()
  const pathname = usePathname()
  const LINKS = [
    {
      href: pagesPath._facilityId(facilityId).calendar.$url().path,
      label: 'カレンダー',
    },
    { href: '/patient', label: '患者' },
    {
      href: pagesPath._facilityId(facilityId).users.$url().path,
      label: '職員情報',
    },
    { href: '/indicators', label: '経営数値' },
  ]
  const menubar = (
    <Menubar links={LINKS} currentLink={pathname} isOpen={isMenubarOpen} />
  )
  const leftIcon = (
    <IconButton onClick={() => setIsMenubarOpen(!isMenubarOpen)}>
      <MenuIcon height={32} width={32} />
    </IconButton>
  )
  return (
    <Header
      center={<h1>職員一覧</h1>}
      menubar={menubar}
      isMenubarOpen={isMenubarOpen}
      leftIcon={leftIcon}
    >
      <UsersContainer />
    </Header>
  )
}
