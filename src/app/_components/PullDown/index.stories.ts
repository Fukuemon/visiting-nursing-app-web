import type { Meta, StoryObj } from '@storybook/react'
import { PullDown } from './index'

const meta: Meta = {
  title: 'Common/PullDown',
  component: PullDown,
}

const options = [
  { value: '訪看I1', label: '訪看I1' },
  { value: '訪看I2', label: '訪看I2' },
  { value: '医', label: '医' },
]

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    title: 'サービス内容',
    options,
  },
}

