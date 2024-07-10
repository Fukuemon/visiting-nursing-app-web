'use client'

import { Button } from '@/app/_components/Button'
import styles from './style.module.css'

import type { FC } from 'react'
import { IconButton } from '@/app/_components/IconButton'

import EditIcon from '/public/icons/square-pen.svg'
import TrashIcon from '/public/icons/trash-2.svg'

export type DataBarProps = {
  disabled?: boolean
  error?: boolean
  onEditClick: () => void
  onTrashClick: () => void
  onDataClick: () => void
  labels: { name: string; id: string }[]
  data: Record<string, string>[]
}

export const DataBar: FC<DataBarProps> = ({
  disabled = false,
  error = false,
  onEditClick,
  onTrashClick,
  onDataClick,
  labels,
  data,
}) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.label}>
          {labels.map((label) => (
            <th className={styles.labelName} key={label.id}>
              {label.name}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((item, index) => (
          <tr key={index} onClick={() => onDataClick()} className={styles.data}>
            {labels.map((label) => (
              <td className={styles.col} key={label.id}>
                {item[label.id]}
              </td>
            ))}
            <td className={styles.icons}>
              <IconButton onClick={() => onEditClick()}>
                <EditIcon className={styles.icon} />
              </IconButton>
              <IconButton onClick={() => onTrashClick()}>
                <TrashIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
