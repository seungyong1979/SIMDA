import type { Metadata } from 'next'
import { getSettings } from '@/lib/settings'
import ContactClient from './ContactClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact',
  description: '심다에게 연락하세요. 촬영, 출판, 굿즈, 협업 등.',
}

export default function ContactPage() {
  const settings = getSettings()
  const t = settings.texts

  return (
    <ContactClient
      heading={t.contactHeading || '연락해 주세요.'}
      subtext={t.contactSubtext || '촬영, 출판, 굿즈 납품, 협업 등 어떤 이야기든 환영합니다.'}
    />
  )
}
