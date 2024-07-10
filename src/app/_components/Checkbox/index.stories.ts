import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './index'

const meta: Meta = {
  title: 'Common/Checkbox',
  component: Checkbox,
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    checkBoxState: 'default',
  },
}

export const Checked: Story = {
  args: {
    checkBoxState: 'checked',
  },
}

export const DefaultError: Story = {
  args: {
    checkBoxState: 'default',
    error: true
  },
}

export const CheckedError: Story = {
  args: {
    checkBoxState: 'checked',
    error: true,
  },
}

export const DefaultDisabled: Story = {
  args: {
    checkBoxState: 'default',
    disabled: true,
  },
}

export const CheckedDisabled: Story = {
  args: {
    checkBoxState: 'checked',
    disabled: true,
  },
}