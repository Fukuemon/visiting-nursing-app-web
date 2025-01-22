import type { FC } from 'react'

import { ScheduleCategoryText, type ScheduleCategory } from '@/constants/scheduleCategory'
import styles from './style.module.css'
import { VisitCategory } from '@/schema/visitCategory'

export type ScheduleCategorySelectProps = {
  scheduleCategory?: string[]
  visitCategories: VisitCategory[]
}

export const ScheduleCategorySelect: FC<ScheduleCategorySelectProps> = ({
  scheduleCategory,
  visitCategories,
}) => {
  return (
    <div className={styles.scheduleCategorySelect}>
      {scheduleCategory !== undefined && scheduleCategory.length > 0 ? (
        scheduleCategory.map((item) => (
          <span key={item}>{visitCategories.find(category => category.id === item)?.name}</span>
        ))
      ) : (
        <span>通常</span>
      )}
    </div>
  )
}
