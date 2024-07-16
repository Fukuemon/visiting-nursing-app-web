 'use client'
import { useState, type ComponentPropsWithoutRef, type FC } from 'react'
import styles from './style.module.css'

export type RadiobuttonProps = ComponentPropsWithoutRef<'input'> & {
  disabled?: boolean
  error?: boolean
  labels: { label: string; value: string }[]
  onChange?: (value: string) => void // 追加
}

export const RadioButton: FC<RadiobuttonProps> = ({
  disabled = false,
  error = false,
  labels = [],
  onChange, // 追加
  ...props
}) => {
  /** 選択中のラジオボタンvalue */
  const [selected, setSelected] = useState('')

  /** ラジオボタン切り替えイベント */
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setSelected(newValue)
    if (onChange !== undefined) {
      onChange(newValue) // 変更を親コンポーネントに通知
    }
  }

  return (
    <div
      className={styles.radiobutton}
      data-disabled={disabled}
      data-error={error}
    >
      {labels.map((label) => (
        <div className={styles.inputGroup} key={label.value}>
          <input
            className={styles.input}
            type="radio"
            data-disabled={disabled}
            data-error={error}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            checked={label.value === selected}
            onChange={changeValue}
            name={props.name} // ラジオボタンのグループ名を指定
            value={label.value} // 各ラジオボタンの値を指定
            {...props}
          />
          <label className={styles.label}>{label.label}</label>
        </div>
      ))}
    </div>
  )
}
