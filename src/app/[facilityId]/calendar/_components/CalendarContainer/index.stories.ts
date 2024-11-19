import type { Meta, StoryObj } from '@storybook/react'
import { CalendarContainer } from './index'

const meta: Meta = {
  title: 'Calendar/CalendarContainer',
  component: CalendarContainer,
}

export default meta
type Story = StoryObj

export const Primary: Story = {
  args: {},
}
