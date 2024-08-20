import type { User } from '@/types/user'
import type { Meta, StoryObj } from '@storybook/react'
import { MemberCheckbox } from './index'

const sampleUser: User = {
  id: '1',
  name: 'John Doe',
  team: 'A',
}

const meta: Meta<typeof MemberCheckbox> = {
  title: 'Calendar/MemberCheckbox',
  component: MemberCheckbox,
  argTypes: {
    member: { control: 'object' },
    showMembers: { control: 'object' },
    setShowMembers: { action: 'setShowMembers' },
  },
}

export default meta
type Story = StoryObj<typeof MemberCheckbox>

export const Unchecked: Story = {
  args: {
    member: sampleUser,
    showMembers: [],
    setShowMembers: (members: User[]) =>
      console.log('Members updated:', members),
  },
}

export const Checked: Story = {
  args: {
    ...Unchecked.args,
    showMembers: [sampleUser],
  },
}

export const MultipleMembers: Story = {
  args: {
    ...Unchecked.args,
    showMembers: [
      { id: '2', name: 'Jane Smith', team: 'A' },
      { id: '3', name: 'Bob Johnson', team: 'B' },
    ],
  },
}
