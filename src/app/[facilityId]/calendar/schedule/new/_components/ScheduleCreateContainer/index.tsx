import { CreateSchedule } from '@/app/[facilityId]/calendar/schedule/new/_components/CreateSchedule'
import { Loading } from '@/app/_components/Loading'
import { usePatientList } from '@/hooks/api/patient'
import { useServiceCodeList } from '@/hooks/api/serviceCode'
import { useUserList } from '@/hooks/api/user'
import { useParams, useSearchParams } from 'next/navigation'

export const ScheduleCreateContainer = () => {
  const { facilityId } = useParams<{ facilityId: string }>()
  const startParam = useSearchParams().get('start')
  const startDate =
    startParam !== null && startParam !== '' ? new Date(startParam) : new Date()
  console.log(startDate)
  const users = useUserList([facilityId, '', '', '', ''])
  const patients = usePatientList(facilityId)
  const serviceCodes = useServiceCodeList(facilityId)
  const currentUser = {
    id: '01JE2J0PNT3MN60M4M2AHPQCPV',
    username: '山本二郎',
    position: 'member',
    team: 'B',
    facility: 'テスト訪問看護ステーション',
    department: '看護',
    area: 'B',
    policies: [],
    email: 'yamamoto@example.com',
    phone: '',
    created_at: '2024-12-02T11:08:30+09:00',
    updated_at: '2024-12-02T11:08:30+09:00',
  }

  if (users.error !== undefined || patients.error !== undefined) {
    const errorMessage =
      users.error?.message ?? patients.error?.message ?? 'Unknown error'
    throw new Error(errorMessage)
  }

  return users.users === undefined ||
    currentUser === undefined ||
    patients.patients === undefined ||
    serviceCodes.serviceCodes === undefined ? (
    <Loading />
  ) : (
    <CreateSchedule
      users={users.users}
      patients={patients.patients}
      serviceCodes={serviceCodes.serviceCodes}
      currentUserId={currentUser.id}
      startDate={startDate}
    />
  )
}
