'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import styles from './style.module.css'

import CloseIcon from '/public/icons/close.svg'

const ModalContext = createContext<{
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

const PortalModal = ({
  children,
  className,
  onOpen,
  onClose,
}: ComponentPropsWithoutRef<'div'> & {
  onOpen?: () => void
  onClose?: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      onOpen?.()
    } else {
      onClose?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ModalContext.Provider>
  )
}

const Trigger = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'button'>) => {
  const { isOpen, setIsOpen } = useContext(ModalContext)
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}

const Closure = ({
  onClick,
  children,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  isDiv?: boolean
}) => {
  const { setIsOpen } = useContext(ModalContext)

  return (
    <button
      type="button"
      onClick={() => {
        if (disabled === false || disabled === undefined) return
        setIsOpen(false)
        onClick?.()
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

type ModalBodyProps = ComponentPropsWithoutRef<'div'> & {
  title?: string
  stickyFooter?: ReactNode
  isDirty?: boolean
  onClose?: () => void
}
const Body = ({
  children,
  title,
  stickyFooter,
  isDirty,
  onClose,
}: ModalBodyProps) => {
  const { isOpen, setIsOpen } = useContext(ModalContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleClose = () => {
    if (isDirty === false || isDirty === undefined) {
      // if (!window.confirm('変更が破棄されますがよろしいですか？')) {
      //   return
      // }
    }
    onClose?.()
    setIsOpen(false)
  }

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={classNames(styles.overlay)}
            onClick={() => handleClose()}
          />
          <motion.div
            key="modal"
            className={styles.modal}
            initial={{
              opacity: 0,
              y: window.matchMedia('(min-width: 720px)').matches
                ? 'calc(-50% + 20px)'
                : 'calc(-50% + 100%)',
              x: '-50%',
            }}
            animate={{ opacity: 1, y: 'calc(-50% + 0px)' }}
            exit={{
              opacity: 0,
              y: window.matchMedia('(min-width: 720px)').matches
                ? 'calc(-50% + 20px)'
                : 'calc(-50% + 50px)',
            }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.header}>
              <button
                onClick={handleClose}
                type="button"
                className={styles.closeButton}
              >
                <CloseIcon width={24} height={24} />
              </button>
              <h3 className={styles.heading}>{title}</h3>
            </div>
            <div style={{ overflowY: 'auto' }}>{children}</div>
            {stickyFooter !== undefined && (
              <div className={styles.stickyFooter}>{stickyFooter}</div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return mounted ? createPortal(modalContent, document.body) : null
}

const UnstyledBody = ({ children, isDirty, onClose }: ModalBodyProps) => {
  const { isOpen, setIsOpen } = useContext(ModalContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleClose = () => {
    if (isDirty === false || isDirty === undefined) {
      // if (!window.confirm('変更が破棄されますがよろしいですか？')) {
      //   return
      // }
    }
    onClose?.()
    setIsOpen(false)
  }

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={classNames(styles.overlay)}
            onClick={() => handleClose()}
          />
          <motion.div
            key="modal"
            className={styles.unstyledModal}
            initial={{
              opacity: 0,
              y: window.matchMedia('(min-width: 720px)').matches
                ? 'calc(-50% + 20px)'
                : 'calc(-50% + 100%)',
              x: '-50%',
            }}
            animate={{ opacity: 1, y: 'calc(-50% + 0px)' }}
            exit={{
              opacity: 0,
              y: window.matchMedia('(min-width: 720px)').matches
                ? 'calc(-50% + 20px)'
                : 'calc(-50% + 50px)',
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return mounted ? createPortal(modalContent, document.body) : null
}

PortalModal.Body = Body
PortalModal.UnstyledBody = UnstyledBody
PortalModal.Trigger = Trigger
PortalModal.Closure = Closure

export default PortalModal
