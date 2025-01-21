import type { ServiceCode } from '@/schema/serviceCode'
import useSWR from 'swr'

const serviceCodeListFetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export const useServiceCodeList = () => {
  const { data, error } = useSWR<ServiceCode[], Error>(
    `${process.env.NEXT_PUBLIC_API_URL}/visit_infos/service_codes`,
    serviceCodeListFetcher,
  )
  return { serviceCodes: data, error }
}
