import type { User } from '@/schema/user'
import type { Fetcher } from 'swr'
import useSWR from 'swr'
import { ulid } from 'ulid'

export const userIda = '01JE2J0PNT3MN60M4M2AHPQCPV'
export const userIdb = '01JE2H7RFRAXMT1V1GCD95E26Q'
export const userIdc = '01JE2H4JCY3T8F02FJRY9H3M3Q'
export const userIdd = '01JE2H2Z6FXRRZ3QHKQHBH05WP'
export const userIde = '01JE2H17Q5W1RNDTR6KVQ1HHEX'
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
