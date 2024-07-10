'use client'

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import classNames from 'classnames'
import styles from './style.module.css'

export type TextInputProps = ComponentPropsWithoutRef<'input'> & {
  disabled?: boolean
  error?: boolean
  label?: string
  placeholder: string
  icon?: ReactNode
}

export const TextInput: FC<TextInputProps> = ({
  disabled = false,
  error = false,
  label = '',
  placeholder = '',
  icon = '',
  ...props
}) => {
  return (
    <label className={styles.textInput} tabIndex={disabled ? -1 : 0}>
      {label !== '' ? <div className={styles.label}>{label}</div> : null}
      <div className={icon !== '' ? styles.inputArea: ''}>
        {icon !== '' ? <div className={styles.icon}>{icon}</div> : null}
        <input
          className={styles.input}
          type="text"
          data-disabled={disabled}
          data-error={error}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
      </div>
    </label>
  )
}
