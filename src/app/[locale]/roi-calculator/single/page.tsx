import { SingleNumberCalculator } from '@/components/roi/SingleNumberCalculator'
import { NavRibbon } from '@/components/roi/shared'

export const metadata = { title: 'AI ROI · Single Big Number | Recursive Solutions' }

export default function Page() {
  return (
    <>
      <NavRibbon />
      <SingleNumberCalculator />
    </>
  )
}
