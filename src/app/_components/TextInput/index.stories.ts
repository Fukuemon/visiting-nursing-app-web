import type { Meta, StoryObj } from '@storybook/react'
import { TextInput } from './index'
import { ReactNode } from 'react'

const meta: Meta = {
  title: 'Common/TextInput',
  component: TextInput,
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    placeholder: 'default',
  },
}

export const Label: Story = {
  args: {
    label: 'label',
  },
}

export const Icon: Story = {
  args: {
    placeholder: 'icon',
    icon: '○'
  },
}

export const DefaultError: Story = {
  args: {
    checkBoxState: 'default',
    error: true,
  },
}

export const DefaultDisabled: Story = {
  args: {
    checkBoxState: 'default',
    disabled: true,
  },
}

