import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController, useForm } from 'react-hook-form'

import { SearchInput } from '@/app/_components/SearchInput'
import Table from '@/app/_components/Table'
import { usePatientList } from '@/hooks/api/patient'
import styles from './style.module.css'

export type SchedulePatientEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

export const SchedulePatientEdit = <T extends FieldValues>({
  control,
  name,
}: SchedulePatientEditProps<T>) => {
  const { field } = useController({
    name,
    control,
  })

  const { control: searchControl, watch } = useForm<{
    patientName: string
    patientArea: string
  }>({
    defaultValues: {
      patientName: '',
      patientArea: '',
    },
  })
  const { patients, isLoading, error } = usePatientList()

  if (isLoading || patients === undefined) return <div>Loading...</div>
  if (error !== undefined && error.message !== '') {
    throw new Error(error.message)
  }

  return (
    <div className={styles.userEdit}>
      <div className={styles.searchInput}>
        <SearchInput
          placeholder="患者を検索"
          name="patientName"
          control={searchControl}
        />
      </div>
      <div className={styles.table}>
        <Table>
          <Table.Header>
            <Table.Row className={styles.userRow}>
              <Table.Cell expanded>名前</Table.Cell>
              <Table.Cell>エリア</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {patients.map((patient) => (
              <Table.Row key={patient.id}>
                <Table.Cell>
                  <label className={styles.option}>
                    <input
                      type="radio"
                      className={styles.input}
                      {...field}
                      value={patient.id}
                      checked={field.value === patient.id}
                    />
                    <span className={styles.label}>{patient.name}</span>
                    <span className={styles.label}>{patient.area}</span>
                  </label>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
