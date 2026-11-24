import VillageMap from '@/components/how-lucy-works/VillageMap'

export const metadata = { robots: { index: false, follow: false } }

export default function Page() {
  return (
    <div style={{ background: '#050816', minHeight: '100vh', padding: '24px' }}>
      <VillageMap />
    </div>
  )
}
