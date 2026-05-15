import { HybridCalculator } from '@/components/roi/HybridCalculator'
import { NavRibbon } from '@/components/roi/shared'

export const metadata = {
  title: 'AI ROI Calculator · Hybrid (A+D) | Recursive Solutions',
}

export default function Page() {
  return (
    <>
      <NavRibbon />
      <HybridCalculator />
    </>
  )
}
