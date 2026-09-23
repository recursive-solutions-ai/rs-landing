import { socialImageMetadata } from '@/lib/social-image'
import type { Metadata } from 'next'
import { CustomerSupportTester } from './CustomerSupportTester'

export const metadata: Metadata = {
  ...socialImageMetadata('Customer Support Agent · Embed Tester'),
  title: 'Customer Support Agent · Embed Tester',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CustomerSupportTester />
}
