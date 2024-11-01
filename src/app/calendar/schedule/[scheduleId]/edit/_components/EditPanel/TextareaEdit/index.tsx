import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

export type TextareaEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  placeholder: string
}

export const TextareaEdit = <T extends FieldValues>({
  control,
  name,
  placeholder,
}: TextareaEditProps<T>) => {
  const { field } = useController({
    control,
    name,
  })

  return (
    <div className={styles.textareaEdit}>
      <h2 className={styles.heading}>{placeholder}</h2>
      <textarea
        {...field}
        className={styles.textarea}
        placeholder={placeholder}
      />
    </div>
  )
}
