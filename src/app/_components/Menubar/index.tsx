import { pagesPath } from '@/utils/$path'
import classNames from 'classnames'
import { easeOut, motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import styles from './style.module.css'
import ChartIcon from '/public/icons/bar-chart-4.svg'
import CalendarIcon from '/public/icons/calendar.svg'
import PatientIcon from '/public/icons/contact-round.svg'
import UsersIcon from '/public/icons/users.svg'

type MenubarProps = {
  isOpen: boolean
  currentLink: string
}

export const Menubar: FC<MenubarProps> = ({ isOpen, currentLink }) => {
  const { facilityId } = useParams<{ facilityId: string }>()
  const links = [
    {
      href: pagesPath._facilityId(facilityId).calendar.$url().path,
      label: 'カレンダー',
      icon: <CalendarIcon />,
    },
    { href: '/patient', label: '患者', icon: <PatientIcon /> },
    {
      href: pagesPath._facilityId(facilityId).users.$url().path,
      label: '職員情報',
      icon: <UsersIcon />,
    },
    { href: '/indicators', label: '経営数値', icon: <ChartIcon /> },
  ]
  return (
    <motion.div
      className={styles.menubarContainer}
      animate={isOpen ? 'open' : 'close'}
      transition={{
        duration: 0.2,
        ease: easeOut,
      }}
      variants={{
        open: {
          x: '0',
        },
        close: {
          x: '-100%',
        },
      }}
    >
      <div className={styles.menuContent}>
        <div className={styles.links}>
          {links.map((link) => (
            <div
              className={classNames(styles.linkContainer, {
                [styles._currentLink]: currentLink === link.href,
              })}
            >
              <Link key={link.href} className={styles.link} href={link.href}>
                <div className={styles.linkIcon}>{link.icon}</div>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
