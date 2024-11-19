import type { Position } from '@/schema/position'
import useSWR from 'swr'

const positionListFetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export const usePositionList = (facilityId: string) => {
  const { data, error } = useSWR<Position[], Error>(
    `${process.env.NEXT_PUBLIC_API_URL}/facilities/${facilityId}/positions`,
    positionListFetcher,
  )
  return { positions: data, error }
}
