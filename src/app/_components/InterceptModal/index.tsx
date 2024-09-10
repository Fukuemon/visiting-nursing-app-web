'use client'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import classNames from 'classnames'

import styles from './style.module.css'

import { IconButton } from '@/app/_components/IconButton'

import { useRouter } from 'next/navigation'
import CloseIcon from '/public/icons/close.svg'

type InterceptModalBodyProps = ComponentPropsWithoutRef<'div'> & {
  title?: string
  stickyFooter?: ReactNode
}
export const InterceptModal = ({
  children,
  title,
  stickyFooter,
}: InterceptModalBodyProps) => {
  const router = useRouter()
  return (
    <>
      (
      <div
        className={classNames(styles.overlay)}
        onClick={() => router.back()}
      />
      ) (
      <div className={styles.modal}>
        <div className={styles.header}>
          <IconButton
            onClick={() => {
              router.back()
            }}
          >
            <CloseIcon width={28} height={28} />
          </IconButton>
          <h3 className={styles.heading}>{title}</h3>
        </div>
        {children}
        <div className={styles.stickyFooter}>{stickyFooter}</div>
      </div>
      )
    </>
  )
}
export default InterceptModal
