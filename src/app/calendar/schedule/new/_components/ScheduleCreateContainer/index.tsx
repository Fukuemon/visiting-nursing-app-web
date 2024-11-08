import { CreateSchedule } from '@/app/calendar/schedule/new/_components/CreateSchedule'
import { usePatientList } from '@/hooks/patient'
import { useCurrentUser, useUserList } from '@/hooks/user'
import { useSearchParams } from 'next/navigation'

export const ScheduleCreateContainer = () => {
  const startParam = useSearchParams().get('start')
  const startDate =
    startParam !== null && startParam !== '' ? new Date(startParam) : new Date()
  console.log(startDate)
  const users = useUserList()
  const patients = usePatientList()
  const currentUser = useCurrentUser()
  if (
    users.isLoading ||
    users.users === undefined ||
    currentUser.isLoading ||
    currentUser.user === undefined ||
    patients.isLoading ||
    patients.patients === undefined
  )
    return <div>Loading...</div>
  if (
    users.error !== undefined ||
    currentUser.error !== undefined ||
    patients.error !== undefined
  ) {
    const errorMessage =
      users.error?.message ??
      currentUser.error?.message ??
      patients.error?.message ??
      'Unknown error'
    throw new Error(errorMessage)
  }

  return (
    <CreateSchedule
      users={users.users}
      patients={patients.patients}
      currentUserId={currentUser.user.id}
      startDate={startDate}
    />
  )
}
