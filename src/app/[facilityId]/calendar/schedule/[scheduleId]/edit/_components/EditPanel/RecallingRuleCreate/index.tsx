'use client'

import { DatePicker } from '@/app/_components/DatePicker'
import type { RecallingScheduleCreate } from '@/schema/recallingSchedule'
import {
  RecallingFrequency,
  RecallingScheduleKey,
} from '@/schema/recallingSchedule'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import { useController, useWatch, type Control } from 'react-hook-form'
import styles from './style.module.css'

export type RecallingRuleCreateProps = {
  control: Control<RecallingScheduleCreate>
  setValue: UseFormSetValue<RecallingScheduleCreate>
}

export const RecallingRuleCreate = ({
  control,
  setValue,
}: RecallingRuleCreateProps) => {
  const { field: frequencyField } = useController({
    control,
    name: RecallingScheduleKey.Frequency,
  })

  const { field: dayOfWeekField } = useController({
    control,
    name: RecallingScheduleKey.DayOfWeek,
  })

  const { field: weekOfMonthField } = useController({
    control,
    name: RecallingScheduleKey.WeekOfMonth,
  })

  const startDate = useWatch({
    control,
    name: RecallingScheduleKey.StartDate,
  })

  const endDate = useWatch({
    control,
    name: RecallingScheduleKey.EndDate,
  })

  const [isIndefinite, setIsIndefinite] = useState(endDate === undefined)

  const handleIndefiniteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked
    setIsIndefinite(isChecked)
    if (isChecked) {
      setValue(RecallingScheduleKey.EndDate, undefined)
    } else {
      setValue(RecallingScheduleKey.EndDate, startDate)
    }
  }

  useEffect(() => {
    if (!isIndefinite) {
      setValue(RecallingScheduleKey.EndDate, startDate)
    }
  }, [startDate])

  useEffect(() => {
    // 終了日が訪問日より前の場合は終了日を訪問日にする
    if (
      !isIndefinite &&
      startDate !== undefined &&
      endDate !== undefined &&
      startDate > endDate
    ) {
      setValue(RecallingScheduleKey.EndDate, startDate)
    }
  }, [startDate, endDate])

  const frequencyOptions = {
    [RecallingFrequency.Weekly]: {
      label: '毎週',
    },
    [RecallingFrequency.Monthly]: {
      label: '毎月',
    },
  }

  const dayOfWeekOptions = {
    [0]: {
      label: '日',
    },
    [1]: {
      label: '月',
    },
    [2]: {
      label: '火',
    },
    [3]: {
      label: '水',
    },
    [4]: {
      label: '木',
    },
    [5]: {
      label: '金',
    },
    [6]: {
      label: '土',
    },
  }

  const weekOfMonthOptions = {
    [1]: {
      label: '第1週',
    },
    [2]: {
      label: '第2週',
    },
    [3]: {
      label: '第3週',
    },
    [4]: {
      label: '第4週',
    },
    [5]: {
      label: '第5週',
    },
  }

  return (
    <div className={styles.recallingRuleEdit}>
      <h1 className={styles.title}>繰り返し</h1>
      <div className={classNames(styles.inputs, styles.repeat)}>
        <div className={styles.contents}>
          {Object.entries(frequencyOptions).map(([key, value]) => {
            return (
              <label key={key} className={styles.option}>
                <input
                  type="radio"
                  className={styles.input}
                  {...frequencyField}
                  value={key}
                  checked={frequencyField.value === key}
                />
                <span className={styles.label}>{value.label}</span>
              </label>
            )
          })}
        </div>
        {frequencyField.value === RecallingFrequency.Monthly && (
          <>
            <p>週</p>
            <div className={styles.contents}>
              {Object.entries(weekOfMonthOptions).map(([key, value]) => {
                return (
                  <label key={key} className={styles.option}>
                    <input
                      type="radio"
                      className={styles.input}
                      {...weekOfMonthField}
                      value={key}
                      checked={String(weekOfMonthField.value) === key}
                      onChange={(e) =>
                        weekOfMonthField.onChange(parseInt(e.target.value, 10))
                      }
                    />
                    <span className={styles.label}>{value.label}</span>
                  </label>
                )
              })}
            </div>
          </>
        )}
        <p>曜日</p>
        <div className={styles.contents}>
          {Object.entries(dayOfWeekOptions).map(([key, value]) => {
            return (
              <label key={key} className={styles.option}>
                <input
                  type="radio"
                  className={styles.input}
                  {...dayOfWeekField}
                  value={key}
                  checked={String(dayOfWeekField.value) === key}
                  onChange={(e) =>
                    dayOfWeekField.onChange(parseInt(e.target.value, 10))
                  }
                />
                <span className={styles.label}>{value.label}</span>
              </label>
            )
          })}
        </div>
        <div className={styles.contents}>
          <label className={styles.option}>
            <input
              type="radio"
              className={styles.input}
              checked={isIndefinite}
              onChange={handleIndefiniteChange}
            />
            <span className={styles.label}>無期限</span>
          </label>

          <label className={styles.option}>
            <input
              type="radio"
              className={styles.input}
              checked={!isIndefinite}
              onChange={() => setIsIndefinite(false)}
              onClick={() => setValue(RecallingScheduleKey.EndDate, startDate)}
            />
            <span className={styles.label}>終了日</span>
          </label>
        </div>
        {!isIndefinite && (
          <DatePicker
            label="終了日"
            control={control}
            name={RecallingScheduleKey.EndDate}
            isWide
          />
        )}
      </div>
    </div>
  )
}
