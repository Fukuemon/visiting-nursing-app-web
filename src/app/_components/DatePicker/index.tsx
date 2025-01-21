'use client'

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import styles from './style.module.css'
import Calendar from '/public/icons/calendar.svg'

export type DatePickerProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: FieldPath<T>
    control: Control<T>
    label: string
    isWide?: boolean
  }

export const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  isWide = false,
  ...props
}: DatePickerProps<T>) => {
  const previousValidDate = useRef<Date | null>(null)
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue =
      event.target.value !== '' ? new Date(event.target.value) : null
    if (dateValue !== null && !isNaN(dateValue.getTime())) {
      previousValidDate.current = dateValue
      field.onChange(dateValue)
    } else {
      field.onChange(previousValidDate.current)
    }
  }

  const getValue = () => {
    const value = field.value as Date | null
    if (value === null) return ''

    if (!isNaN(value.getTime())) {
      previousValidDate.current = value
      const year = value.getFullYear()
      const month = String(value.getMonth() + 1).padStart(2, '0')
      const day = String(value.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    if (previousValidDate.current !== null) {
      const prevDate = previousValidDate.current
      const year = prevDate.getFullYear()
      const month = String(prevDate.getMonth() + 1).padStart(2, '0')
      const day = String(prevDate.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    return ''
  }

  useEffect(() => {
    const value = field.value as Date | null
    if (value !== null && !isNaN(value.getTime())) {
      previousValidDate.current = value
    }
  }, [field.value])

  return (
    <div className={styles.datePicker} data-wide={isWide}>
      <label
        className={styles.container}
        data-wide={isWide}
        htmlFor={field.name}
      >
        <input
          type="date"
          className={styles.input}
          {...field}
          {...props}
          onChange={handleChange}
          value={getValue()}
        />
        <span className={styles.label}>{label}</span>
        <div className={styles.icon}>
          <Calendar width={20} height={20} />
        </div>
      </label>
      {error != null && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}
