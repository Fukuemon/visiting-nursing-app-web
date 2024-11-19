'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'

import { SelectButton } from '@/app/_components/SelectButton'
import { Department } from '@/schema/department'
import styles from './style.module.css'

export type DepartmentEditModalProps = {
  onSubmit: (data: { department: string }) => void
  defaultValues: { department: string }
  departments: Department[]
}

export const DepartmentEditModal: FC<DepartmentEditModalProps> = ({
  onSubmit,
  defaultValues,
  departments,
}) => {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      department: defaultValues.department,
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
          name="department"
          options={[
            {
              label: 'すべての役職',
              value: '',
            },
            ...departments.map((department) => ({
              label: department.name,
              value: department.name,
            })),
          ]}
        />
      </div>
    </Modal.Body>
  )
}
