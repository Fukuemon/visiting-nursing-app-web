import type { FC } from 'react'

import type { Control } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import type { ScheduleCategory } from '@/constants/scheduleCategory'
import {
  scheduleCategoryConstant,
  ScheduleCategoryText,
} from '@/constants/scheduleCategory'
import type { ScheduleCreate } from '@/schema/schedule'
import { VisitScheduleKey } from '@/schema/schedule'
import { VisitCategory } from '@/schema/visitCategory'

export type ScheduleCategoryCreateProps = {
  control: Control<ScheduleCreate>
  visitCategories: VisitCategory[]
}

export const ScheduleCategoryOptions = [
  {
    label: ScheduleCategoryText.night,
    value: scheduleCategoryConstant.night,
  },
  {
    label: ScheduleCategoryText.emergency,
    value: scheduleCategoryConstant.emergency,
  },
  {
    label: ScheduleCategoryText.hospitalization,
    value: scheduleCategoryConstant.hospitalization,
  },
]

export const ScheduleCategoryCreate: FC<ScheduleCategoryCreateProps> = ({
  control,
  visitCategories,
}) => {
  const { field } = useController({
    control,
    name: VisitScheduleKey.ScheduleCategory,
  })

  return (
    <div className={styles.scheduleCategoryCreate}>
      <h2 className={styles.heading}>訪問の種類を選んでください</h2>
      <div className={styles.content}>
        {visitCategories.map((visitCategory) => (
          <label key={visitCategory.id} className={styles.radioCards}>
            <input
              className={styles.radio}
              type="checkbox"
              {...field}
              value={visitCategory.id}
              checked={field.value?.includes(visitCategory.id)}
              defaultChecked={field.value?.includes(visitCategory.id)}
              onChange={(e) => {
                if (typeof field.value === 'boolean') {
                  field.onChange(!field.value)
                } else {
                  const valueCopy = [...(field.value ?? [])]

                  if (e.target.checked) {
                    valueCopy.push(e.target.value as ScheduleCategory)
                  } else {
                    valueCopy.splice(
                      valueCopy.indexOf(e.target.value as ScheduleCategory),
                      1,
                    )
                  }
                  field.onChange(valueCopy)
                }
              }}
            />
            <span className={styles.label}>{visitCategory.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
