import type { FC, ReactNode } from 'react'

import Link from 'next/link'

import type { ScheduleKey, VisitScheduleKey } from '@/schema/schedule'
import { useSearchParams } from 'next/navigation'
import styles from './style.module.css'

export type ButtonContentProps = {
  id: ScheduleKey | VisitScheduleKey
  label: string
  content: ReactNode
}

export type SelectPanelProps = {
  questionEditMap: ButtonContentProps[]
}

export const SelectPanel: FC<SelectPanelProps> = ({ questionEditMap }) => {
  const queryParams = useSearchParams()

  return (
    <div className={styles.selectPanel}>
      <h2 className={styles.heading}>編集</h2>
      <div className={styles.buttons}>
        {questionEditMap.map((button) => (
          <Link
            key={button.id}
            className={styles.button}
            href={{
              query: {
                id: button.id,
              },
            }}
            data-active={button.id === queryParams.get('id') ? 'true' : 'false'}
          >
            <span className={styles.label}>{button.label}</span>
            {button.content}
          </Link>
        ))}
      </div>
    </div>
  )
}
