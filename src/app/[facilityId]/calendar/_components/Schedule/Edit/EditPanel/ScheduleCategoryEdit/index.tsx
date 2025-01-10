import type { FC } from 'react'

import type { Control } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import type { ScheduleCategory } from '@/constants/scheduleCategory'
import {
  scheduleCategoryConstant,
  ScheduleCategoryText,
} from '@/constants/scheduleCategory'
import type { ScheduleEdit } from '@/schema/schedule'
import { VisitScheduleKey } from '@/schema/schedule'

export type ScheduleCategoryEditProps = {
  control: Control<ScheduleEdit>
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

export const ScheduleCategoryEdit: FC<ScheduleCategoryEditProps> = ({
  control,
}) => {
  const { field } = useController({
    control,
    name: VisitScheduleKey.ScheduleCategory,
  })

  return (
    <div className={styles.scheduleCategoryEdit}>
      <h2 className={styles.heading}>訪問の種類を選んでください</h2>
      <div className={styles.content}>
        {ScheduleCategoryOptions.map((option) => (
          <label key={option.value} className={styles.radioCards}>
            <input
              className={styles.radio}
              type="checkbox"
              {...field}
              value={option.value}
              checked={field.value?.includes(option.value)}
              defaultChecked={field.value?.includes(option.value)}
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
            <span className={styles.label}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
