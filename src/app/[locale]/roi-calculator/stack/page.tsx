import { StackBuilder } from '@/components/roi/StackBuilder'
import { NavRibbon } from '@/components/roi/shared'

export const metadata = { title: 'AI ROI · Stack Builder | Recursive Solutions' }

export default function Page() {
  return (
    <>
      <NavRibbon />
      <StackBuilder />
    </>
  )
}
