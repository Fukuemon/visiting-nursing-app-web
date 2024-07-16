'use client'

import type { ComponentPropsWithoutRef, FC } from 'react'

import styles from './style.module.css'

export enum ToggleStateType {
  DEFAULT = 'default',
  CHECKED = 'checked',
}

export type ToggleProps = ComponentPropsWithoutRef<'input'> & {
  toggleState: ToggleStateType
  disabled?: boolean
  error?: boolean
  label?: string
}

export const Toggle: FC<ToggleProps> = ({
  toggleState,
  disabled = false,
  error = false,
  label = '',
  ...props
}) => {
  return (
    <label
      className={styles.toggle}
      data-active={toggleState !== ToggleStateType.DEFAULT}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        className={styles.input}
        type="checkbox"
        hidden
        disabled={disabled}
        {...props}
      />
      <div
        className={styles.base}
        data-active={toggleState !== ToggleStateType.DEFAULT}
        data-disabled={disabled}
        data-error={error}
      >
        <div className={styles.circle}></div>
      </div>
      {label !== '' && <span className={styles.label}>{label}</span>}
    </label>
  )
}
