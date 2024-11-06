import type { Patient } from '@/schema/patient'
import useSWR from 'swr'
import { ulid } from 'ulid'

const patientIda = ulid()
const patientIdb = ulid()
const patientIdc = ulid()

const patientFetcher = async (url: string) => {
  const res = {
    name: '鈴木一郎',
    id: '2',
  }
  return res
  //   const res = await fetch(url)
  //   return res.json()
}

export const usePatient = (patientId: string) => {
  const { data, isLoading, error } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + `/patients/${patientId}`,
    patientFetcher,
  )

  return {
    patient: data,
    isLoading,
    error,
  }
}

const patientListFetcher = async (url: string) => {
  const res: Patient[] = [
    { name: '鈴木一郎', id: patientIda, area: 'A' },
    { name: '鈴木二郎', id: patientIdb, area: 'B' },
    { name: '鈴木三郎', id: patientIdc, area: 'C' },
  ]
  return res
  //   const res = await fetch(url)
  //   return res.json()
}

export const usePatientList = () => {
  const { data, isLoading, error } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + `/patients`,
    patientListFetcher,
  )

  return {
    patients: data,
    isLoading,
    error,
  }
}
