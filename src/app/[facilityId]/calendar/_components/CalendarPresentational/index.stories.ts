import type { Events } from '@/types/event'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarPresentational } from './index'

const events: Events = [
  {
    id: '1',
    userId: 'a',
    title: '訪問',
    start: new Date(),
    end: new Date(),
    isCancel: false,
    startEditable: false,
    durationEditable: false,
  },
]

const meta: Meta = {
  title: 'Calendar/CalendarPresentational',
  component: CalendarPresentational,
}

export default meta
type Story = StoryObj

export const Primary: Story = {
  args: {
    events,
  },
}
