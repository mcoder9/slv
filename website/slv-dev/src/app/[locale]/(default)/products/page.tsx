import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByGroupDir, PageProps } from '@/lib/pages'
import ProductsHeroRow from './ProductsHeroRow'
import CTARow from '@/components/rows/CTARow'
import VLDAirdropRow from '@/components/rows/VLDAirdropRow'
import ProductsValidatorsSolutionsRow from '@/components/rows/products/ProductsValidatorsSolutionsRow'
import ProductsSolvRow from '@/components/rows/products/ProductsSolvRow'
import ProductsElsolRow from '@/components/rows/products/ProductsElsolRow'
import ProductsErpcRow from '@/components/rows/products/ProductsErpcRow'
import ProductsSkeetRow from '@/components/rows/products/ProductsSkeetRow'
import ProductsBuidlersCollectiveRow from '@/components/rows/products/ProductsBuidlersCollectiveRow'

const groupDir = 'products'
const { generateMetadata } = getDataForPageByGroupDir(groupDir)
export { generateMetadata }

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <ProductsHeroRow />
      <ProductsSkeetRow />
      <ProductsSolvRow />
      <ProductsValidatorsSolutionsRow />
      <ProductsElsolRow />
      <ProductsErpcRow />
      <ProductsBuidlersCollectiveRow />
      <VLDAirdropRow />
      <CTARow />
    </>
  )
}
