import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByGroupDir, PageProps } from '@/lib/pages'
import StakingHeroRow from './StakingHeroRow'
import CTARow from '@/components/rows/CTARow'
import VLDAirdropRow from '@/components/rows/VLDAirdropRow'
import Why1SOLnot1elSOLRow from '@/app/[locale]/(default)/staking/Why1SOLnot1elSOLRow'
import ElsolMetricsRow from '@/components/rows/ElsolMetricsRow'
import InstantLiquidityRow from '@/components/rows/InstantLiquidityRow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import HavingLiquidityRow from './HavingLiquidityRow'
import DirectStakingRow from './DirectStakingRow'

const groupDir = 'staking'
const { generateMetadata } = getDataForPageByGroupDir(groupDir)
export { generateMetadata }

export default async function StakingPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <DirectStakingRow />
      <StakingHeroRow />
      <ElsolMetricsRow />
      <Why1SOLnot1elSOLRow />
      <InstantLiquidityRow />
      <HavingLiquidityRow />
      <VLDAirdropRow />
      <ProductsSlideRow />
      <CTARow />
    </>
  )
}
