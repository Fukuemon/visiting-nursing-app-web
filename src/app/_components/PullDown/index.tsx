// PullDownコンポーネント
import { useEffect, useRef, useState } from 'react'
import styles from './style.module.css'

export type Option<T = string> = {
  value: T
  label: string
}

export type PullDownProps<T = string> = {
  disabled?: boolean
  error?: boolean
  options: Option<T>[]
  initial?: Option<T>
  onChange?: (value: T) => void
}

export const PullDown = <T extends string | number = string>({
  disabled = false,
  error = false,
  initial,
  options,
  onChange,
}: PullDownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option<T>>(() => {
    if (initial !== undefined) {
      return initial
    }
    return { value: options[0].value, label: options[0].label }
  })

  const selectWrapperRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: Option<T>) => {
    setSelectedOption(option)
    setIsOpen(false)
    if (onChange !== undefined) {
      onChange(option.value)
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
          <span className={styles.customSelectTrigger}>
            {selectedOption.label}
          </span>
          <div className={styles.customOptions}>
            {options.map((option) => (
              <span
                key={String(option.value)}
                className={`${styles.customOption} ${selectedOption.value === option.value ? styles.selection : ''}`}
                onClick={() => handleOptionClick(option)}
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
