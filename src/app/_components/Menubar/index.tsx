import classNames from 'classnames'
import { easeOut, motion } from 'framer-motion'
import Link from 'next/link'
import type { FC } from 'react'
import styles from './style.module.css'

type MenubarProps = {
  isOpen: boolean
  currentLink: string
  links: { href: string; label: string }[]
}

export const Menubar: FC<MenubarProps> = ({ isOpen, currentLink, links }) => {
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
            <Link
              key={link.href}
              className={classNames(styles.link, {
                [styles.currentLink]: currentLink === link.href,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
