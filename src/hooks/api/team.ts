import type { Team } from '@/schema/team'
import useSWR from 'swr'

const teamListFetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export const useTeamList = (facilityId: string) => {
  const { data, error } = useSWR<Team[], Error>(
    `${process.env.NEXT_PUBLIC_API_URL}/facilities/${facilityId}/teams`,
    teamListFetcher,
  )
  return { teams: data, error }
}
