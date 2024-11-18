'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'
import { TextInput } from '@/app/_components/TextInput'

import styles from './style.module.css'

export type NameEditModalProps = {
  onSubmit: (data: { username: string }) => void
  defaultValues: {
    username: string
  }
}

export const NameEditModal: FC<NameEditModalProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { control, handleSubmit, formState, reset } = useForm<{
    username: string
  }>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        username: z
          .string()
          .min(1, { message: 'アカウント名を入力してください' }),
      }),
    ),
  })

  useEffect(() => {
    reset({
      ...defaultValues,
    })
  }, [defaultValues, reset])

  return (
    <Modal.Body
      title="アカウント名"
      isDirty={formState.isDirty}
      onClose={reset}
      stickyFooter={
        <Modal.Closure
          onClick={handleSubmit((data) => {
            onSubmit?.(data)
          })}
        >
          <Button disabled={!formState.isValid} isDiv>
            変更
          </Button>
        </Modal.Closure>
      }
    >
      <div className={styles.nameEditModal}>
        <TextInput control={control} name="username" label="アカウント名" />
      </div>
    </Modal.Body>
  )
}
