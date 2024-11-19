import type { FC } from 'react'

import { useForm } from 'react-hook-form'

import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'
import { PasswordInput } from '@/app/_components/PasswordInput'
import styles from './style.module.css'

export type PasswordResetModalProps = object

export const PasswordResetModal: FC<PasswordResetModalProps> = ({}) => {
  // TODO: パスワードの更新処理
  // const { mutateAsync: updateMember } =
  //   trpc.manager.member.update.useMutation();

  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      password: '',
    },
  })

  return (
    <Modal.Body
      isDirty={formState.isDirty}
      title="パスワードリセット"
      stickyFooter={
        <Modal.Closure
          onClick={handleSubmit(async (data) => {
            try {
              // await resetPassword({
              //   memberId,
              //   temporaryPassword: data.password,
              // });
              alert('パスワードリセットに成功しました')
            } catch (error) {
              console.error(error)
              alert('パスワードリセットに失敗しました')
            }
          })}
        >
          <Button isDiv>リセット</Button>
        </Modal.Closure>
      }
    >
      <div className={styles.passwordResetModal}>
        <div className={styles.passwordInput}>
          <PasswordInput
            control={control}
            name="password"
            label="初期パスワード"
            policy="▲半角英数字、8文字以上"
          />
        </div>
      </div>
    </Modal.Body>
  )
}
