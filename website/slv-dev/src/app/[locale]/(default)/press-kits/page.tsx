import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByGroupDir, PageProps } from '@/lib/pages'
import PressKitsHeroRow from './PressKitsHeroRow'
import CTARow from '@/components/rows/CTARow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import { getArticleForIndex } from '@/lib/articles'
import ArticleIndex from '@/components/articles/ArticleIndex'
import VLDAirdropRow from '@/components/rows/VLDAirdropRow'

const groupDir = 'press-kits'
const { generateMetadata } = getDataForPageByGroupDir(groupDir)
export { generateMetadata }

export default async function CompanyPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const newsData = getArticleForIndex(
    'news',
    ['title', 'thumbnail', 'date'],
    locale
  )

  return (
    <>
      <PressKitsHeroRow />
      <VLDAirdropRow />
      <ProductsSlideRow />
      <CTARow />
      <div className="py-48">
        <ArticleIndex articlesData={newsData} showItemsNum={3} />
      </div>
    </>
  )
}
