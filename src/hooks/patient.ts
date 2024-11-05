import useSWR from 'swr'

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
  const res = {
    patients: [
      { name: '鈴木一郎', id: '2' },
      { name: '鈴木二郎', id: '3' },
      { name: '鈴木三郎', id: '4' },
    ],
  }
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
