import { BenchmarksCalculator } from '@/components/roi/BenchmarksCalculator'
import { NavRibbon } from '@/components/roi/shared'

export const metadata = { title: 'AI ROI · Industry Benchmarks | Recursive Solutions' }

export default function Page() {
  return (
    <>
      <NavRibbon />
      <BenchmarksCalculator />
    </>
  )
}
