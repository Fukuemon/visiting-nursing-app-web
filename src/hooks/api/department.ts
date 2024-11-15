import type { Department } from '@/schema/department'
import useSWR from 'swr'

const departmentListFetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export const useDepartmentList = (facilityId: string) => {
  const { data, error } = useSWR<Department[], Error>(
    `${process.env.NEXT_PUBLIC_API_URL}/facilities/${facilityId}/departments`,
    departmentListFetcher,
  )
  return { departments: data, error }
}
