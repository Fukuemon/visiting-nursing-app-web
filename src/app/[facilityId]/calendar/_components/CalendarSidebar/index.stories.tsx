import type { User } from '@/types/user'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarSidebar } from './index'

const sampleMe: User = { id: '1', name: '山田太郎', team: 'A' }

const sampleTeams = [
  {
    name: 'A',
    members: [
      { id: '1', name: '山田太郎', team: 'A' },
      { id: '2', name: '佐藤花子', team: 'A' },
    ],
  },
  {
    name: 'B',
    members: [
      { id: '3', name: '鈴木一郎', team: 'B' },
      { id: '4', name: '高橋美咲', team: 'B' },
    ],
  },
]

const meta: Meta<typeof CalendarSidebar> = {
  title: 'Calendar/CalendarSidebar',
  component: CalendarSidebar,
  argTypes: {
    me: { control: 'object' },
    showMembers: { control: 'object' },
    setShowMembers: { action: 'setShowMembers' },
    allTeams: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof CalendarSidebar>

export const Default: Story = {
  args: {
    me: sampleMe,
    showMembers: [sampleMe],
    setShowMembers: (members: User[]) =>
      console.log('Members updated:', members),
    allTeams: sampleTeams,
  },
}

export const AllSelected: Story = {
  args: {
    ...Default.args,
    showMembers: [sampleMe, ...sampleTeams.flatMap((team) => team.members)],
  },
}

export const SomeSelected: Story = {
  args: {
    ...Default.args,
    showMembers: [
      sampleMe,
      sampleTeams[0].members[0],
      sampleTeams[1].members[1],
    ],
  },
}

export const NoTeams: Story = {
  args: {
    ...Default.args,
    allTeams: [],
  },
}
