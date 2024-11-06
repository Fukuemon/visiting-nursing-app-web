import type { User } from '@/schema/user'
import type { Fetcher } from 'swr'
import useSWR from 'swr'
import { ulid } from 'ulid'

export const userIda = ulid()
export const userIdb = ulid()
export const userIdc = ulid()
export const userIdd = ulid()
export const userIde = ulid()
export const userIdf = ulid()
export const userIdg = ulid()
export const userIdh = ulid()
export const userIdi = ulid()

const currentUserFetcher: Fetcher<User> = async (url: string) => {
  const res = {
    name: '田中太郎',
    id: userIda,
    team: 'A',
  }
  return res
}

export const useCurrentUser = () => {
  const { data, isLoading, error } = useSWR<User, Error>(
    process.env.NEXT_PUBLIC_API_URL + `/users/${userIda}`,
    currentUserFetcher,
  )

  return {
    user: data,
    isLoading,
    error,
  }
}

const userFetcher: Fetcher<User> = async (url: string) => {
  const res = {
    name: '田中太郎',
    id: userIda,
    team: 'A',
  }
  return res
  //   const res = await fetch(url)
  //   return res.json()
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
  const res = [
    { name: '田中太郎', id: userIda, team: 'A' },
    { name: '鈴木一郎', id: userIdb, team: 'A' },
    { name: '鈴木二郎', id: userIdc, team: 'A' },
    { name: '鈴木三郎', id: userIdd, team: 'B' },
    { name: '鈴木四郎', id: userIde, team: 'B' },
    { name: '鈴木五郎', id: userIdf, team: 'B' },
    { name: '鈴木六郎', id: userIdg, team: 'C' },
    { name: '山田七郎', id: userIdh, team: 'C' },
    { name: '山田八郎', id: userIdi, team: 'C' },
  ]
  return res
  //   const res = await fetch(url)
  //   return res.json()
}

export const useUserList = () => {
  const { data, isLoading, error } = useSWR<User[], Error>(
    process.env.NEXT_PUBLIC_API_URL + `/users`,
    userListFetcher,
  )

  return {
    users: data,
    isLoading,
    error,
  }
}
