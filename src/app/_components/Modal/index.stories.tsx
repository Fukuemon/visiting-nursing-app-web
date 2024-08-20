import { Button } from '@/app/_components/Button'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './index'

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    children: { control: 'text' },
    stickyFooter: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Modal Title',
    children: <p>This is the modal content.</p>,
    setIsOpen: () => {},
  },
}

export const WithStickyFooter: Story = {
  args: {
    isOpen: true,
    title: 'Modal with Sticky Footer',
    children: <p>This modal has a sticky footer.</p>,
    stickyFooter: <Button>Submit</Button>,
    setIsOpen: () => {},
  },
}

export const LongContent: Story = {
  args: {
    isOpen: true,
    title: 'Modal with Long Content',
    children: (
      <>
        <p>This modal has long content to demonstrate scrolling.</p>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <p key={i}>This is paragraph {i + 1}.</p>
          ))}
      </>
    ),
    stickyFooter: <Button>Submit</Button>,
    setIsOpen: () => {},
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Closed Modal',
    children: <p>This content should not be visible.</p>,
    setIsOpen: () => {},
  },
}
