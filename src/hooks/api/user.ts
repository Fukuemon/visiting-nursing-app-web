import type { User } from '@/schema/user'
import type { Fetcher } from 'swr'
import useSWR from 'swr'
import { ulid } from 'ulid'

export const userIda = '01JAYGNY3TV8N9ACMKDAW7RCRN'
export const userIdb = '01JAYFC3Q3HGJZ6DP3DN9EPZZR'
export const userIdc = '01JAYFA0T9H84RE135JTPEBEF2'
export const userIdd = '01JAYF6Q11Q8BKBY53VW7ZV5WJ'
export const userIde = ulid()
export const userIdf = ulid()
export const userIdg = ulid()
export const userIdh = ulid()
export const userIdi = ulid()

const currentUserFetcher: Fetcher<User> = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export const useCurrentUser = (userId: string) => {
  const { data, isLoading, error } = useSWR<User, Error>(
    process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`,
    currentUserFetcher,
  )

  return {
    user: data,
    isLoading,
    error,
  }
}

const userFetcher: Fetcher<User> = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export const useUser = (userId: string) => {
  const { data, isLoading, error } = useSWR<User, Error>(
    process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`,
    userFetcher,
  )

  return {
    user: data,
    isLoading,
    error,
  }
}

const userListFetcher: Fetcher<User[]> = async (url: string) => {
  const res = await fetch(url)
  const users = await res.json()
  return users
}

export const useUserList = ([
  facilityId,
  username,
  position,
  department,
  team,
]: [string, string, string, string, string]) => {
  const { data, error, mutate } = useSWR<User[], Error>(
    process.env.NEXT_PUBLIC_API_URL +
      `/facilities/${facilityId}/users?username=${username}&position=${position}&department=${department}&team=${team}`,
    userListFetcher,
  )

  return {
    users: data,
    error,
    mutate,
  }
}