import type { Meta, StoryObj } from '@storybook/react'
import { Menubar } from './index'

const meta: Meta<typeof Menubar> = {
  title: 'Common/Menubar',
  component: Menubar,
}

export default meta
type Story = StoryObj<typeof Menubar>

const links = [
  { href: '/calendar', label: 'カレンダー' },
  { href: '/patient', label: '患者' },
  { href: '/staff', label: '職員情報' },
  { href: '/indicators', label: '経営数値' },
]

export const Open: Story = {
  args: {
    isOpen: true,
    currentLink: '/calendar',
    links,
  },
}
