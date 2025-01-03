import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByGroupDir, PageProps } from '@/lib/pages'
import CompanyHeroRow from './CompanyHeroRow'
import CTARow from '@/components/rows/CTARow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import CompanyInfoRow from './CompanyInfoRow'
import CompanyTeamRow from './CompanyTeamRow'
import { getArticleForIndex } from '@/lib/articles'
import ArticleIndex from '@/components/articles/ArticleIndex'

const groupDir = 'company'
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
      <CompanyHeroRow />
      <CompanyInfoRow />
      <CompanyTeamRow />
      <ProductsSlideRow />
      <CTARow />
      <div className="py-48">
        <ArticleIndex articlesData={newsData} showItemsNum={3} />
      </div>
    </>
  )
}
