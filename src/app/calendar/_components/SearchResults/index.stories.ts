import type { User } from '@/types/user'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchResults } from './index'

const sampleUsers: User[] = [
  { id: '1', name: '山田太郎', team: 'A' },
  { id: '2', name: '佐藤花子', team: 'B' },
  { id: '3', name: '鈴木一郎', team: 'C' },
  { id: '4', name: '高橋美咲', team: 'C' },
]

const meta: Meta<typeof SearchResults> = {
  title: 'Calendar/SearchResults',
  component: SearchResults,
  argTypes: {
    searchUsers: { control: 'object' },
    showMembers: { control: 'object' },
    setShowMembers: { action: 'setShowMembers' },
  },
}

export default meta
type Story = StoryObj<typeof SearchResults>

export const NoSelection: Story = {
  args: {
    searchUsers: sampleUsers,
    showMembers: [],
    setShowMembers: (members: User[]) =>
      console.log('Members updated:', members),
  },
}

export const SomeSelected: Story = {
  args: {
    ...NoSelection.args,
    showMembers: [sampleUsers[0], sampleUsers[2]],
  },
}

export const AllSelected: Story = {
  args: {
    ...NoSelection.args,
    showMembers: sampleUsers,
  },
}

export const EmptyResults: Story = {
  args: {
    ...NoSelection.args,
    searchUsers: [],
  },
}
