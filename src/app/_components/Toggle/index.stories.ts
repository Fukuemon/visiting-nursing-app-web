import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './index'

const meta: Meta = {
  title: 'Common/Toggle',
  component: Toggle,
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    toggleState: 'default',
    label: 'toggle'
  },
}

export const Checked: Story = {
  args: {
    toggleState: 'checked',
    label: 'toggle',
  },
}

export const DefaultError: Story = {
  args: {
    toggleState: 'default',
    label: 'toggle',
    error: true
  },
}

export const CheckedError: Story = {
  args: {
    toggleState: 'checked',
    label: 'toggle',
    error: true,
  },
}

export const DefaultDisabled: Story = {
  args: {
    toggleState: 'default',
    label: 'toggle',
    disabled: true,
  },
}

export const CheckedDisabled: Story = {
  args: {
    toggleState: 'checked',
    label: 'toggle',
    disabled: true,
  },
}
