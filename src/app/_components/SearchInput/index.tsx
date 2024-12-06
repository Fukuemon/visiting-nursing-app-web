'use client'

import { type ComponentPropsWithoutRef } from 'react'

import classNames from 'classnames'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import SearchIcon from '/public/icons/search.svg'

type SearchFieldProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: FieldPath<T>
    control: Control<T>
    isWide?: boolean
  }

export const SearchInput = <T extends FieldValues>({
  name,
  control,
  isWide,
  ...props
}: SearchFieldProps<T>) => {
  const { field } = useController({
    name,
    control,
  })

  return (
    <div
      className={classNames(
        styles.container,
        isWide !== undefined && isWide && styles._wide,
      )}
    >
      <label className={styles.search}>
        <div className={styles.icon}>
          <SearchIcon width={18} height={18} />
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="検索"
          {...field}
          {...props}
        />
      </label>
    </div>
  )
}
