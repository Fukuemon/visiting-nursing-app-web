import type { User } from '@/types/user'
import type { Meta, StoryObj } from '@storybook/react'
import { TeamCheckbox } from './index'

const sampleTeam = {
  name: 'A',
  members: [
    { id: '1', name: '山田太郎', team: 'A' },
    { id: '2', name: '佐藤花子', team: 'A' },
    { id: '3', name: '鈴木一郎', team: 'A' },
  ],
}

const meta: Meta<typeof TeamCheckbox> = {
  title: 'Calendar/TeamCheckbox',
  component: TeamCheckbox,
  argTypes: {
    team: { control: 'object' },
    showMembers: { control: 'object' },
    setShowMembers: { action: 'setShowMembers' },
  },
}

export default meta
type Story = StoryObj<typeof TeamCheckbox>

export const NoMembersSelected: Story = {
  args: {
    team: sampleTeam,
    showMembers: [],
    setShowMembers: (members: User[]) =>
      console.log('Members updated:', members),
  },
}

export const SomeMembersSelected: Story = {
  args: {
    ...NoMembersSelected.args,
    showMembers: [sampleTeam.members[0], sampleTeam.members[2]],
  },
}

export const AllMembersSelected: Story = {
  args: {
    ...NoMembersSelected.args,
    showMembers: sampleTeam.members,
  },
}

export const EmptyTeam: Story = {
  args: {
    ...NoMembersSelected.args,
    team: { ...sampleTeam, members: [] },
  },
}
