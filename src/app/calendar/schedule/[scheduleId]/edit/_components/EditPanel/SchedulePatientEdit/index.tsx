import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import Table from '@/app/_components/Table'
import { TextInput } from '@/app/_components/TextInput'
import { usePatientList } from '@/hooks/patient'
import type { Patient } from '@/schema/patient'
import { useState } from 'react'
import styles from './style.module.css'
import SearchIcon from '/public/icons/search.svg'

export type SchedulePatientEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

export const SchedulePatientEdit = <T extends FieldValues>({
  control,
  name,
}: SchedulePatientEditProps<T>) => {
  const { patients, isLoading, error } = usePatientList()

  const { field } = useController({
    name,
    control,
  })

  const [searchText, setSearchText] = useState('')
  const [searchTextTeam, setSearchTextTeam] = useState('')
  const [searchPatients, setSearchPatients] = useState<Patient[]>(
    patients ?? [],
  )
  if (isLoading || patients === undefined) return <div>Loading...</div>
  if (error !== undefined && error.message !== '') {
    throw new Error(error.message)
  }

  const handleSearch = () => {
    const filteredPatients = patients.filter((patient) => {
      const matchesName =
        searchText === '' ||
        patient.name.toLowerCase().includes(searchText.toLowerCase())
      const matchesTeam =
        searchTextTeam === '' ||
        patient.area.toLowerCase().includes(searchTextTeam.toLowerCase())
      return matchesName && matchesTeam
    })
    setSearchPatients(filteredPatients)
  }
  const searchIcon = (
    <button onClick={handleSearch}>
      <SearchIcon />
    </button>
  )
  return (
    <div className={styles.userEdit}>
      <div className={styles.searchInput}>
        <TextInput
          placeholder="患者を検索"
          icon={searchIcon}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <TextInput
          placeholder="エリアを検索"
          icon={searchIcon}
          value={searchTextTeam}
          onChange={(e) => setSearchTextTeam(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
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
            {searchPatients.map((patient) => (
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
