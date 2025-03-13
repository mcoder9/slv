import { redirect } from 'next/navigation'
import { defaultLocale } from './config'
import { createMetadata } from '@/lib/pages'
import { DEFAULT_PATHS } from '@/app/[locale]/(default)/defaultNavs'

export async function generateMetadata() {
  return await createMetadata({
    locale: defaultLocale,
    jsonNamespaces: ['(home)'],
    pathname: DEFAULT_PATHS.home
  })
}

export default function RootPage() {
  redirect(`/${defaultLocale}`)
}
