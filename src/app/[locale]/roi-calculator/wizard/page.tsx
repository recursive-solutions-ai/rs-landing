import { WizardCalculator } from '@/components/roi/WizardCalculator'
import { NavRibbon } from '@/components/roi/shared'

export const metadata = {
  title: 'AI ROI · Audience Wizard | Recursive Solutions',
}

export default function Page() {
  return (
    <>
      <NavRibbon />
      <WizardCalculator />
    </>
  )
}
