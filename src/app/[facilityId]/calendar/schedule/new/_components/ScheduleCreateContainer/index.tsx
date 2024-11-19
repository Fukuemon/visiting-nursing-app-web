import { CreateSchedule } from '@/app/[facilityId]/calendar/schedule/new/_components/CreateSchedule'
import { Loading } from '@/app/_components/Loading'
import { usePatientList } from '@/hooks/api/patient'
import { useUserList } from '@/hooks/api/user'
import { useSearchParams } from 'next/navigation'

export const ScheduleCreateContainer = () => {
  const facilityId = '01J6SMYDSKKKNJCR2Y3242T7YX'
  const startParam = useSearchParams().get('start')
  const startDate =
    startParam !== null && startParam !== '' ? new Date(startParam) : new Date()
  console.log(startDate)
  const users = useUserList([facilityId, '', '', '', ''])
  const patients = usePatientList()
  const currentUser = {
    id: '01J6SMYDSKKKNJCR2Y3242T7YX',
    username: '鈴木一郎',
  }

  if (users.error !== undefined || patients.error !== undefined) {
    const errorMessage =
      users.error?.message ?? patients.error?.message ?? 'Unknown error'
    throw new Error(errorMessage)
  }

  return users.users === undefined ||
    currentUser === undefined ||
    patients.patients === undefined ? (
    <Loading />
  ) : (
    <CreateSchedule
      users={users.users}
      patients={patients.patients}
      currentUserId={currentUser.id}
      startDate={startDate}
    />
  )
}
