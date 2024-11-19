'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'
import { TextInput } from '@/app/_components/TextInput'

import styles from './style.module.css'

export type EmailEditModalProps = {
  onSubmit: (data: { email: string }) => void
  defaultValues: { email: string }
}

export const EmailEditModal: FC<EmailEditModalProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: defaultValues.email,
    },
  })

  useEffect(() => {
    reset({
      ...defaultValues,
    })
  }, [defaultValues, reset])

  return (
    <Modal.Body
      title="メールアドレス"
      isDirty={formState.isDirty}
      onClose={reset}
      stickyFooter={
        <Modal.Closure
          onClick={handleSubmit((data) => {
            onSubmit?.(data)
          })}
        >
          <Button isDiv>変更</Button>
        </Modal.Closure>
      }
    >
      <div className={styles.emailEditModal}>
        <TextInput control={control} name="email" label="メールアドレス" />
      </div>
    </Modal.Body>
  )
}
