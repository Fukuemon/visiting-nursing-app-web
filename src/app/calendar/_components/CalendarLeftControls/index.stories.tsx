import type { Meta, StoryObj } from '@storybook/react'
import { LeftControls } from './index'

const meta: Meta<typeof LeftControls> = {
  title: 'Calendar/LeftControls',
  component: LeftControls,
  argTypes: {
    onPrev: { action: 'onPrev clicked' },
    onNext: { action: 'onNext clicked' },
    onToday: { action: 'onToday clicked' },
  },
}

export default meta
type Story = StoryObj<typeof LeftControls>

export const Primary: Story = {
  args: {
    onPrev: () => console.log('Previous clicked'),
    onNext: () => console.log('Next clicked'),
    onToday: () => console.log('Today clicked'),
  },
}
