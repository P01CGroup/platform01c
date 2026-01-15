import type { Meta, StoryObj } from '@storybook/react'
import ContactForm from './ContactForm'

const meta: Meta<typeof ContactForm> = {
  title: 'Components/ContactForm',
  component: ContactForm,
  parameters: { layout: 'centered' }
}

export default meta

type Story = StoryObj<typeof ContactForm>

export const Inline: Story = {
  args: { heading: 'Submit an Inquiry', variant: 'inline', context: 'storybook_inline' }
}

export const ModalVariant: Story = {
  args: { variant: 'modal', context: 'storybook_modal' }
}

