import { ScheduleType } from '@/constants/scheduleType'
import type { Meta, StoryObj } from '@storybook/react'
import { NormalScheduleDetailList } from './index'

const meta: Meta<typeof NormalScheduleDetailList> = {
  title: 'Schedule/NormalScheduleDetailList',
  component: NormalScheduleDetailList,
  argTypes: {
    user: { control: 'object' },
    schedule_type: { control: 'select', options: Object.values(ScheduleType) },
    description: { control: 'text' },
    start_time: { control: 'date' },
    end_time: { control: 'date' },
    recalling_rule: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof NormalScheduleDetailList>

export const Default: Story = {
  args: {
    user: { id: '1', name: '山田太郎', team: 'a' },
    schedule_type: ScheduleType.normal,
    description: '通常のスケジュールです。',
    start_time: new Date('2024-09-06T10:00:00'),
    end_time: new Date('2024-09-06T11:00:00'),
  },
}

export const LongDescription: Story = {
  args: {
    user: { id: '1', name: '山田太郎', team: 'a' },
    schedule_type: ScheduleType.normal,
    description:
      '説明説明説明\n説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明説明',
    start_time: new Date('2024-09-06T10:00:00'),
    end_time: new Date('2024-09-06T11:00:00'),
  },
}

export const NormalRecalling: Story = {
  args: {
    user: { id: '2', name: '佐藤花子', team: 'a' },
    schedule_type: ScheduleType.normalRecalling,
    description: 'リコールのスケジュールです。',
    start_time: new Date('2024-09-06T14:00:00'),
    end_time: new Date('2024-09-06T15:00:00'),
    recalling_rule: {
      frequency: 1,
      interval: 1,
      startDate: new Date('2024-09-06T10:00:00'),
      endDate: new Date('2024-09-07T11:00:00'),
    },
  },
}

export const PastEvent: Story = {
  args: {
    user: { id: '3', name: '高橋美咲', team: 'a' },
    schedule_type: ScheduleType.normal,
    description: '過去のイベントです。',
    start_time: new Date('2024-09-05T10:00:00'),
    end_time: new Date('2024-09-05T11:00:00'),
  },
}
