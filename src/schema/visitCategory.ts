import { z } from "zod"

export type VisitCategory = {
  id: string
  name: string
}
export const visitCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
})
