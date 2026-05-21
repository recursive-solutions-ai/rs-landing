import type { Metadata } from 'next'
import { TestBot } from './TestBot'

export const metadata: Metadata = {
	title: 'Test Bot · AI Assistant',
	robots: { index: false, follow: false },
}

export default function Page() {
	return <TestBot />
}
