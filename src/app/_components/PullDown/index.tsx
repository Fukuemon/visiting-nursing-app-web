// PullDownコンポーネント
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import styles from './style.module.css'

export type PullDownProps = {
  disabled?: boolean
  error?: boolean
  options: { value: string; label: string }[]
  onChange?: (value: string) => void // 追加
}

export const PullDown: FC<PullDownProps> = ({
  disabled = false,
  error = false,
  options,
  onChange, // 追加
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('選択してください')
  const selectWrapperRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (value: string, label: string) => {
    setSelectedValue(label)
    setIsOpen(false)
    if (onChange !== undefined) {
      onChange(value) // 選択された値を親コンポーネントに通知
    }
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      selectWrapperRef.current !== null &&
      !selectWrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen])

  return (
    <div className={styles.pullDown}>
      <div className={styles.customSelectWrapper} ref={selectWrapperRef}>
        <div
          className={`${styles.customSelect} ${isOpen ? styles.opened : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.customSelectTrigger}>{selectedValue}</span>
          <div className={styles.customOptions}>
            {options.map((option) => (
              <span
                key={option.value}
                className={`${styles.customOption} ${selectedValue === option.label ? styles.selection : ''}`}
                onClick={() => handleOptionClick(option.value, option.label)}
              >
                {option.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
