'use client'

import { Header } from '@/app/_components/Header'
import { IconButton } from '@/app/_components/IconButton'
import { Menubar } from '@/app/_components/Menubar'
import { UsersContainer } from '@/app/users/_components/UsersContainer'
import { LINKS } from '@/constants/navLinks'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import MenuIcon from '/public/icons/menu.svg'

export default function Users() {
  const [isMenubarOpen, setIsMenubarOpen] = useState(false)
  const pathname = usePathname()
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
