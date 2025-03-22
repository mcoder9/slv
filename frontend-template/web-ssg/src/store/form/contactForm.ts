import { atomWithStorage } from 'jotai/utils'

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export const contactFormAtom = atomWithStorage<ContactFormData>(
  'contactFormData',
  {
    name: '',
    email: '',
    message: ''
  },
  undefined,
  { getOnInit: true }
)
