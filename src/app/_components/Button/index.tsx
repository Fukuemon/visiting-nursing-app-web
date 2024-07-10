'use client'

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import type { UrlObject } from 'url'

import classNames from 'classnames'
import NextLink from 'next/link'

import styles from './style.module.css'

type BaseProps = {
  variant?: 'primary' | 'secondary'
  size?: 'S' | 'M' | 'L'
  children: ReactNode
  isAnchor?: boolean
  isWide?: boolean
}

type NativeButtonProps = BaseProps &
  ComponentPropsWithoutRef<'button'> & {
    href?: never
  }

type AnchorButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    href: string | UrlObject
    disabled?: boolean
  }

export type ButtonProps = NativeButtonProps | AnchorButtonProps

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'M',
  isAnchor = false,
  isWide,
  children,
  disabled,
  ...props
}) => {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const className = classNames(styles.button, {
    [styles._primary!]: variant === 'primary',
    [styles._secondary!]: variant === 'secondary',
    [styles._large!]: size === 'L',
    [styles._small!]: size === 'S',
    [styles._medium!]: size === 'M',
    [styles._wide!]: isWide,
  })

  return isAnchor ? (
    <NextLink
      className={className}
      disabled={disabled}
      {...(props as AnchorButtonProps)}
    >
      <div className={styles.content}>{children}</div>
    </NextLink>
  ) : (
    <button
      className={classNames(className)}
      disabled={disabled}
      {...(props as NativeButtonProps)}
    >
      <div className={styles.content}>{children}</div>
    </button>
  )
}