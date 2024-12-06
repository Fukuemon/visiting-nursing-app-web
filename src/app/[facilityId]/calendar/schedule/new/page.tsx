'use client'

import { ScheduleCreateContainer } from '@/app/[facilityId]/calendar/schedule/new/_components/ScheduleCreateContainer'

export type Query = {
  start: string
}

export default function EventModal() {
  return (
    <>
      <ScheduleCreateContainer />
    </>
  )
}
