import type { Meta, StoryObj } from '@storybook/react'
import { RadioButton } from './index'

const meta: Meta = {
  title: 'Common/RadioButton',
  component: RadioButton,
}

const labels: { label: string; value: string }[] = [
  { label: 'りんご', value: 'apple' },
  { label: 'バナナ', value: 'banana' },
  { label: 'みかん', value: 'orange' },
]

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    radiobuttonState: 'default',
    labels,
  },
}

export const DefaultError: Story = {
  args: {
    radiobuttonState: 'default',
    error: true,
    labels,
  },
}

export const DefaultDisabled: Story = {
  args: {
    radiobuttonState: 'default',
    disabled: true,
    labels,
  },
}

