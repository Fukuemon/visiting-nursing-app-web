'use client'

import { CalendarView } from "@/constants/calendarView"
import { pagesPath } from "@/utils/$path"
import Link from "next/link"

export default function Home() {
  const facilityId = '01J6SMYDSKKKNJCR2Y3242T7YX'
  return (
    <main>
      <Link href={pagesPath._facilityId(facilityId).calendar.$url({query: {tab: CalendarView.timeGridDay}}).path}>
        ログイン
      </Link>
    </main>
  )
}
