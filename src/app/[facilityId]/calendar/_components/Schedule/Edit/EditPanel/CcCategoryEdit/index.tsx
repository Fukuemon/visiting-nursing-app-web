import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import { ccCategory, CcCategoryText } from '@/constants/ccCategory'

export type CcCategoryEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  isVisitSchedule: boolean
}

export const ccCategoryOptions = {
  [ccCategory.none]: {
    label: CcCategoryText[ccCategory.none],
  },
  [ccCategory.normal]: {
    label: CcCategoryText[ccCategory.normal],
  },
  [ccCategory.accompany]: {
    label: CcCategoryText[ccCategory.accompany],
  },
  [ccCategory.handover]: {
    label: CcCategoryText[ccCategory.handover],
  },
}

export const CcCategoryEdit = <T extends FieldValues>({
  control,
  name,
  isVisitSchedule,
}: CcCategoryEditProps<T>) => {
  const { field } = useController({
    control,
    name,
  })

  const filteredOptions = isVisitSchedule
    ? ccCategoryOptions
    : {
        [ccCategory.none]: ccCategoryOptions[ccCategory.none],
        [ccCategory.normal]: ccCategoryOptions[ccCategory.normal],
      }

  return (
    <div className={styles.ccCategoryEdit}>
      <h2 className={styles.heading}>複製カテゴリを選んでください</h2>
      <div className={styles.content}>
        {Object.entries(filteredOptions).map(([key, value]) => {
          return (
            <label key={key} className={styles.option}>
              <input
                type="radio"
                className={styles.input}
                {...field}
                value={key}
                checked={field.value === key}
              />
              <span className={styles.label}>{value.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
