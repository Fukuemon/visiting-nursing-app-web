'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { Button } from '@/app/_components/Button'
import Modal from '@/app/_components/Modal'

import { SelectButton } from '@/app/_components/SelectButton'
import { Team } from '@/schema/team'
import styles from './style.module.css'

export type TeamEditModalProps = {
  onSubmit: (data: { team: string }) => void
  defaultValues: { team: string }
  teams: Team[]
}

export const TeamEditModal: FC<TeamEditModalProps> = ({
  onSubmit,
  defaultValues,
  teams,
}) => {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      team: defaultValues.team,
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
          name="team"
          options={[
            {
              label: 'すべての役職',
              value: '',
            },
            ...teams.map((team) => ({
              label: team.name,
              value: team.name,
            })),
          ]}
        />
      </div>
    </Modal.Body>
  )
}
