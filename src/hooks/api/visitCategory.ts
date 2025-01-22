import { VisitCategory } from "@/schema/visitCategory"
import useSWR from "swr"

const visitCategoryListFetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export const useVisitCategoryList = () => {
  const { data, error } = useSWR<VisitCategory[], Error>(
    `${process.env.NEXT_PUBLIC_API_URL}/visit_infos/visit_categories`,
    visitCategoryListFetcher,
  )
  return { visitCategories: data, error }
}
