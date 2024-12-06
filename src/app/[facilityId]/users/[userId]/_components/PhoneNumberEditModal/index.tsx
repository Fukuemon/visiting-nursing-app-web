import type { FC } from 'react'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'
import { TextInput } from '@/app/_components/TextInput'

import styles from './style.module.css'

export type PhoneNumberEditModalProps = {
  defaultValue: string
  onSubmit: (data: string) => void
}

export const PhoneNumberEditModal: FC<PhoneNumberEditModalProps> = ({
  defaultValue,
  onSubmit,
}) => {
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      phone: defaultValue,
    },
  })

  useEffect(() => {
    reset({ phone: defaultValue })
  }, [defaultValue, reset])

  return (
    <Modal.Body
      isDirty={formState.isDirty}
      title="電話番号"
      stickyFooter={
        <Modal.Closure
          onClick={handleSubmit((data) => {
            onSubmit(data.phone)
          })}
        >
          <Button isDiv>保存</Button>
        </Modal.Closure>
      }
    >
      <div className={styles.phoneNumberEditModal}>
        <TextInput control={control} name="phone" label="電話番号" />
      </div>
    </Modal.Body>
  )
}
