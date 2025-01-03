'use client'

import {
  OPOSClimate,
  OPOSClosedCube,
  RijksdienstLogoHorizontal,
  RijksdienstLogoInvertHorizontal,
  SolanaFoundationLogoHorizontal,
  SolanaFoundationLogoInvertHorizontal,
  EastVenturesLogoHorizontal,
  EastVenturesLogoInvertHorizontal,
  MiraiseLogoHorizontal,
  MiraiseLogoInvertHorizontal
} from '@/assets/img'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/utils/useTheme'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import {
  SOLANA_COM_LINK,
  WBSO_LINK,
  MIRAISE_LINK,
  EAST_VENTURES_LINK
} from '@/constants/links'

const logos = [
  {
    title: 'SolanaFoundation',
    logo: SolanaFoundationLogoHorizontal,
    logoInvert: SolanaFoundationLogoInvertHorizontal,
    href: SOLANA_COM_LINK
  },
  {
    title: 'Rijksdienst',
    logo: RijksdienstLogoHorizontal,
    logoInvert: RijksdienstLogoInvertHorizontal,
    href: WBSO_LINK
  },
  {
    title: 'EastVentures',
    logo: EastVenturesLogoHorizontal,
    logoInvert: EastVenturesLogoInvertHorizontal,
    href: EAST_VENTURES_LINK
  },
  {
    title: 'Miraise',
    logo: MiraiseLogoHorizontal,
    logoInvert: MiraiseLogoInvertHorizontal,
    href: MIRAISE_LINK
  }
]

export default function CompanyHeroRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  return (
    <>
      <div className="relative mx-auto max-w-7xl p-3">
        <div className="absolute left-0 top-0 -z-10 opacity-10 dark:opacity-20">
          <Image
            src={OPOSClosedCube}
            alt="Background"
            className="h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 lg:h-[336px] lg:w-[336px]"
            unoptimized
            width={256}
            height={256}
          />
        </div>

        <div className="absolute bottom-0 right-0 -z-10 opacity-20 dark:opacity-40">
          <Image
            src={OPOSClimate}
            alt="Background"
            className="h-56 w-56 sm:h-64 sm:w-64 md:h-96 md:w-96 lg:h-[440px] lg:w-[440px]"
            unoptimized
            width={256}
            height={256}
          />
        </div>

        <div className="relative mx-auto grid items-center gap-8 py-24 md:grid-cols-3 md:py-48">
          <div className="grid w-full gap-4 p-4 md:col-span-2">
            <h2
              className={cn(
                'py-2 text-5xl font-bold tracking-tighter sm:text-7xl lg:text-8xl',
                mainShardGradation
              )}
            >
              {t('company.title')}
            </h2>
            <p
              className={cn(
                'text-lg font-medium tracking-tight sm:max-w-xl sm:text-xl lg:-mt-2',
                'text-zinc-500 dark:text-zinc-300'
              )}
            >
              {t('company.description')}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-start gap-4">
              {logos.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={theme === 'light' ? item.logo : item.logoInvert}
                    alt="Background"
                    className="w-20 sm:w-24 md:w-28"
                    unoptimized
                    width={256}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl p-4"></div>
        </div>
      </div>
    </>
  )
}
