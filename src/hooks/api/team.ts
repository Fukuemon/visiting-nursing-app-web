import type { Team } from '@/schema/team'
import useSWR from 'swr'

const TEAM_COLORS = [
  'hsl(47, 85%, 75%)', // 薄い黄色
  'hsl(152, 85%, 75%)', // 薄い緑
  'hsl(354, 85%, 75%)', // 薄いピンク
]

const teamListFetcher = async (url: string) => {
  const res = await fetch(url)
  const data: Team[] = await res.json()
  // チームに順番に色を割り当て
  return data.map((team, index) => ({
    ...team,
    color: TEAM_COLORS[index % TEAM_COLORS.length],
  }))
}

export const useTeamList = (facilityId: string) => {
  const { data, error } = useSWR<Team[], Error>(
    `${process.env.NEXT_PUBLIC_API_URL}/facilities/${facilityId}/teams`,
    teamListFetcher,
  )
  return { teams: data, error }
}
