import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import classNames from 'classnames'

import styles from './style.module.css'

import { IconButton } from '@/app/_components/IconButton'

import CloseIcon from '/public/icons/close.svg'

type ModalBodyProps = ComponentPropsWithoutRef<'div'> & {
  title?: string
  stickyFooter?: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export const Modal = ({
  children,
  title,
  stickyFooter,
  isOpen,
  setIsOpen,
}: ModalBodyProps) => {
  return (
    <>
      {isOpen && (
        <div
          className={classNames(styles.overlay)}
          onClick={() => setIsOpen(false)}
        />
      )}
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.header}>
            <IconButton
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <CloseIcon width={28} height={28} />
            </IconButton>
            <h3 className={styles.heading}>{title}</h3>
          </div>
          {children}
          <div className={styles.stickyFooter}>{stickyFooter}</div>
        </div>
      )}
    </>
  )
}
export default Modal
