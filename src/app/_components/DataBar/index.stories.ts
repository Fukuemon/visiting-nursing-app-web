import type { Meta, StoryObj } from '@storybook/react'
import { DataBar } from './index'

const meta: Meta = {
  title: 'Common/DataBar',
  component: DataBar,
}

const labels: { name: string; id: string }[] = [
  { name: '名前', id: 'name' },
  { name: '担当者', id: 'user' },
  { name: 'エリア', id: 'area' },
]

const data = [
  {
    name: '佐藤三郎',
    user: '伊藤次郎',
    area: 'A',
  },
  {
    name: '佐藤三郎',
    user: '伊藤次郎',
    area: 'A',
  },
  {
    name: '佐藤三郎',
    user: '伊藤次郎',
    area: 'A',
  },
]

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    labels,
    data,
  },
}


