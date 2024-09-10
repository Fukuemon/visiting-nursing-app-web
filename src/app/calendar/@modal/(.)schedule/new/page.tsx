'use client'

import InterceptModal from '@/app/_components/InterceptModal'

export type Query = {
  start: string
}

export default function EventModal() {
  // const params = useSearchParams();
  // const event: NewCalendarEventProps = {
  //   start: params.get("start") || "",
  // };

  return (
    <>
      <InterceptModal>new event modal</InterceptModal>
    </>
  )
}
