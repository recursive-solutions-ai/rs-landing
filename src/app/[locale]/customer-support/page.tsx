import type { Metadata } from 'next'
import { CustomerSupportTester } from './CustomerSupportTester'

export const metadata: Metadata = {
  title: 'Customer Support Agent · Embed Tester',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CustomerSupportTester />
}
