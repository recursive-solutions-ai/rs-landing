import { DelayCalculator } from '@/components/roi/DelayCalculator'
import { NavRibbon } from '@/components/roi/shared'

export const metadata = { title: 'AI ROI · Cost of Delay | Recursive Solutions' }

export default function Page() {
  return (
    <>
      <NavRibbon />
      <DelayCalculator />
    </>
  )
}
