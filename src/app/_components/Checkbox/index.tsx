'use client'

import type { ComponentPropsWithoutRef, FC } from 'react'

import CheckIcon from '/public/icons/check.svg'
import MinusIcon from '/public/icons/minus.svg'

import styles from './style.module.css'

export enum CheckboxStateType {
  DEFAULT = 'default',
  CHECKED = 'checked',
  MINUS = 'minus',
}

export type CheckboxProps = ComponentPropsWithoutRef<'input'> & {
  checkBoxState: CheckboxStateType
  disabled?: boolean
  error?: boolean
  label?: string
}

export const Checkbox: FC<CheckboxProps> = ({
  checkBoxState,
  disabled = false,
  error = false,
  label = '',
  ...props
}) => {
  return (
    <div className={styles.container}>
      <label
        className={styles.checkbox}
        data-active={checkBoxState !== CheckboxStateType.DEFAULT}
        data-disabled={disabled}
        data-error={error}
        tabIndex={disabled ? -1 : 0}
      >
        <input type="checkbox" hidden disabled={disabled} {...props} />
        <div
          className={styles.icon}
          data-active={checkBoxState !== CheckboxStateType.DEFAULT}
        >
          {checkBoxState === 'checked' && <CheckIcon width={16} height={16} />}
          {checkBoxState === 'minus' && <MinusIcon width={16} height={16} />}
        </div>
        {label !== '' && <span className={styles.label}>{label}</span>}
      </label>
    </div>
  )
}
