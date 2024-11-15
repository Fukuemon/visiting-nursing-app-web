'use client'

import type { ComponentPropsWithoutRef } from 'react'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

export type TextFieldProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: FieldPath<T>
    control: Control<T>
    label: string
    unit?: string
    note?: string
  }

export const TextInput = <T extends FieldValues>({
  name,
  control,
  label,
  note,
  unit,
  ...props
}: TextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <div className={styles.textInput}>
      <div className={styles.unitContainer}>
        <div className={styles.container}>
          <input
            className={styles.input}
            type="text"
            placeholder=" "
            {...field}
            {...props}
          />
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        </div>
        {unit !== undefined && <span className={styles.unit}>{unit}</span>}
      </div>
      {note !== undefined && <span className={styles.note}>{note}</span>}
      {error !== undefined && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}
