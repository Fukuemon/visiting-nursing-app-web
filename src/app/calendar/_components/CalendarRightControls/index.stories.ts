import { ToggleStateType } from '@/app/_components/Toggle'
import { CalendarView, CalendarViewText } from '@/constants/calendarView'
import type { Meta, StoryObj } from '@storybook/react'
import { RightControls } from './index'

const meta: Meta<typeof RightControls> = {
  title: 'Calendar/RightControls',
  component: RightControls,
  argTypes: {
    currentCalendarView: {
      control: 'select',
      options: Object.values(CalendarView),
      mapping: CalendarView,
    },
    setCurrentCalendarView: { action: 'setCurrentCalendarView' },
    showCancel: {
      control: 'select',
      options: Object.values(ToggleStateType),
      mapping: ToggleStateType,
    },
    setShowCancel: { action: 'setShowCancel' },
  },
}

export default meta
type Story = StoryObj<typeof RightControls>

export const Primary: Story = {
  args: {
    currentCalendarView: CalendarView.dayGridMonth,
    setCurrentCalendarView: (view: CalendarView) =>
      console.log('Calendar view changed to:', CalendarViewText[view]),
    showCancel: ToggleStateType.DEFAULT,
    setShowCancel: (state: ToggleStateType) =>
      console.log('Show cancel toggled to:', state),
  },
}

export const WeekView: Story = {
  args: {
    ...Primary.args,
    currentCalendarView: CalendarView.timeGridWeek,
  },
}

export const CancelShown: Story = {
  args: {
    ...Primary.args,
    showCancel: ToggleStateType.CHECKED,
  },
}
