'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'

import { SelectButton } from '@/app/_components/SelectButton'
import { Position } from '@/schema/position'
import styles from './style.module.css'

export type PositionEditModalProps = {
  onSubmit: (data: { position: string }) => void
  defaultValues: { position: string }
  positions: Position[]
}

export const PositionEditModal: FC<PositionEditModalProps> = ({
  onSubmit,
  defaultValues,
  positions,
}) => {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      position: defaultValues.position,
    },
  })

  useEffect(() => {
    reset({
      ...defaultValues,
    })
  }, [defaultValues, reset])

  return (
    <Modal.Body
      title="役職"
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
        <SelectButton
          control={control}
          name="position"
          options={[
            {
              label: 'すべての役職',
              value: '',
            },
            ...positions.map((position) => ({
              label: position.name,
              value: position.name,
            })),
          ]}
        />
      </div>
    </Modal.Body>
  )
}
