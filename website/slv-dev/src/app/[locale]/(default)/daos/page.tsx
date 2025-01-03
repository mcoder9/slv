import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByGroupDir, PageProps } from '@/lib/pages'
import DAOsHeroRow from './DAOsHeroRow'
import CTARow from '@/components/rows/CTARow'
import VLDAirdropRow from '@/components/rows/VLDAirdropRow'
import DAOsEpicsRow from '@/components/rows/daos/DAOsEpicsRow'
import DAOsValidatorsRow from '@/components/rows/daos/DAOsValidatorsRow'

const groupDir = 'daos'
const { generateMetadata } = getDataForPageByGroupDir(groupDir)
export { generateMetadata }

export default async function DAOsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <DAOsHeroRow />
      <DAOsEpicsRow />
      <DAOsValidatorsRow />
      <VLDAirdropRow />
      <CTARow />
    </>
  )
}
