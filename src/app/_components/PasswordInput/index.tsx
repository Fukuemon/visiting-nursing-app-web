import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { TextInput } from '@/app/_components/TextInput'

import styles from './style.module.css'

import EyeClosedIcon from '/public/icons/eye-closed.svg'
import EyeOpenedIcon from '/public/icons/eye-opened.svg'

type Props<T extends FieldValues> = ComponentPropsWithoutRef<'input'> & {
  name: FieldPath<T>
  control: Control<T>
  label: string
  policy?: string
}

export const PasswordInput = <T extends FieldValues>({
  name,
  control,
  label,
  policy,
  ...props
}: Props<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  return (
    <div className={styles.passwordInput}>
      <div className={styles.passwordInputBody}>
        <TextInput
          name={name}
          control={control}
          label={label}
          type={isPasswordVisible ? 'text' : 'password'}
          {...props}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </button>
      </div>
      {policy !== undefined && <p className={styles.policy}>{policy}</p>}
    </div>
  )
}
