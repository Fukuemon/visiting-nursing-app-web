// VisitScheduleDetailList.stories.tsx

import type { ScheduleCategory } from '@/constants/scheduleCatefory'
import { ScheduleType } from '@/constants/scheduleType'
import type { ServiceCode } from '@/constants/serviceCode'
import type { Patient } from '@/types/patient'
import type { RecallingRule } from '@/types/recallingRule'
import type { User } from '@/types/user'
import type { Meta, StoryObj } from '@storybook/react'
import { VisitScheduleDetailList } from './index'

const user: User = {
  id: '1',
  name: '田中太郎',
  team: '医療チームA',
}

const patient: Patient = {
  id: '1',
  name: '佐藤花子',
}

const serviceCode: ServiceCode = '訪看I1'
const scheduleType: ScheduleType = 'visit'
const scheduleCategory: ScheduleCategory = 'normal'
const startTime = new Date(2024, 8, 6, 10, 0) // 2024年9月6日 10:00
const endTime = new Date(2024, 8, 6, 11, 0) // 2024年9月6日 11:00
const destination = '東京都千代田区1-1-1'
const recallingRule: RecallingRule = {
  frequency: 1,
  interval: 1,
  dayOfWeek: 2,
  startDate: new Date(2024, 8, 6, 10, 0),
  endDate: new Date(2025, 8, 6, 11, 0),
}

const meta: Meta = {
  title: 'Schedule/VisitScheduleDetailList',
  component: VisitScheduleDetailList,
}

export default meta
type Story = StoryObj

export const Visit: Story = {
  args: {
    user,
    patient,
    service_code: serviceCode,
    schedule_type: scheduleType,
    schedule_category: scheduleCategory,
    start_time: startTime,
    end_time: endTime,
    destination,
    is_cancelled: false,
  },
}

export const Cancelled: Story = {
  args: {
    user,
    patient,
    service_code: serviceCode,
    schedule_type: scheduleType,
    schedule_category: scheduleCategory,
    start_time: startTime,
    end_time: endTime,
    destination,
    is_cancelled: true,
  },
}

export const RecallingVisit: Story = {
  args: {
    user,
    patient,
    service_code: serviceCode,
    schedule_type: ScheduleType.visitRecalling,
    schedule_category: scheduleCategory,
    start_time: startTime,
    end_time: endTime,
    destination,
    is_cancelled: false,
    recalling_rule: recallingRule,
  },
}

export const RecallingVisitCancel: Story = {
  args: {
    user,
    patient,
    service_code: serviceCode,
    schedule_type: ScheduleType.visitRecalling,
    schedule_category: scheduleCategory,
    start_time: startTime,
    end_time: endTime,
    destination,
    is_cancelled: true,
    recalling_rule: recallingRule,
  },
}
