'use client'

import { pagesPath } from "@/utils/$path"
import Link from "next/link"

export default function Home() {
  const facilityId = '01J6SMYDSKKKNJCR2Y3242T7YX'
  return (
    <main>
      <Link href={pagesPath._facilityId(facilityId).calendar.$url().path}>
        ログイン
      </Link>
    </main>
  )
}
