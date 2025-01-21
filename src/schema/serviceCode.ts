import { z } from "zod"

export type ServiceCode = {
  id: string
  code: string
  service_time_range_start: number
  service_time_range_end: number
}

export const serviceCodeSchema = z.object({
  id: z.string(),
  code: z.string(),
  service_time_range_start: z.number(),
  service_time_range_end: z.number(),
})
    