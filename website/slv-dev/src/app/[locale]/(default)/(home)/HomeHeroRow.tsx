'use client'

import {
  CloudflareLogoHorizontal,
  CloudflareLogoInvertHorizontal,
  EastVenturesLogoHorizontal,
  EastVenturesLogoInvertHorizontal,
  GoogleCloudLogoHorizontal,
  GoogleCloudLogoInvertHorizontal,
  MiraiseLogoHorizontal,
  MiraiseLogoInvertHorizontal,
  OPOSClimate,
  OPOSClosedCube,
  RijksdienstLogoHorizontal,
  RijksdienstLogoInvertHorizontal,
  SolanaFoundationLogoHorizontal,
  SolanaFoundationLogoInvertHorizontal
} from '@/assets/img'
import { Button } from '@/components/ui/button'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useTheme } from '@/hooks/utils/useTheme'
import {
  CLOUDFLARE_LINK,
  EAST_VENTURES_LINK,
  GOOGLE_CLOUD_LINK,
  MIRAISE_LINK,
  SOLANA_COM_LINK,
  WBSO_LINK
} from '@/constants/links'
import appInfo from '@appInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

const logos = [
  {
    title: 'GoogleCloud',
    logo: GoogleCloudLogoHorizontal,
    logoInvert: GoogleCloudLogoInvertHorizontal,
    href: GOOGLE_CLOUD_LINK
  },
  {
    title: 'Rijksdienst',
    logo: RijksdienstLogoHorizontal,
    logoInvert: RijksdienstLogoInvertHorizontal,
    href: WBSO_LINK
  },
  {
    title: 'Cloudflare',
    logo: CloudflareLogoHorizontal,
    logoInvert: CloudflareLogoInvertHorizontal,
    href: CLOUDFLARE_LINK
  },
  {
    title: 'SolanaFoundation',
    logo: SolanaFoundationLogoHorizontal,
    logoInvert: SolanaFoundationLogoInvertHorizontal,
    href: SOLANA_COM_LINK
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

export default function HomeHeroRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  return (
    <>
      <div className="relative mx-auto max-w-7xl p-3">
        <div className="absolute left-0 top-0 -z-10 opacity-20 dark:opacity-40">
          <Image
            src={OPOSClosedCube}
            alt="Background"
            className="h-72 w-72 -translate-x-12 sm:h-80 sm:w-80 md:h-[512px] md:w-[512px] md:-translate-x-24 md:-translate-y-12 lg:h-[720px] lg:w-[720px] lg:-translate-x-40 lg:-translate-y-24"
            unoptimized
            width={256}
            height={256}
          />
        </div>

        <div className="absolute bottom-0 right-0 -z-10 opacity-10 dark:opacity-40">
          <Image
            src={OPOSClimate}
            alt="Background"
            className="h-56 w-56 sm:h-64 sm:w-64 md:h-96 md:w-96 lg:h-[512px] lg:w-[512px]"
            unoptimized
            width={256}
            height={256}
          />
        </div>

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 py-24 md:py-48 lg:max-w-3xl">
          <h1
            className={cn(
              'p-2 text-center text-4xl font-bold tracking-tighter sm:text-7xl lg:text-8xl',
              mainShardGradation
            )}
          >
            {t('(home).HomeHeroRow.title1')} <br />
            {t('(home).HomeHeroRow.title2')} <br />
            {t('(home).HomeHeroRow.title3')}
          </h1>
          <p
            className={cn(
              '-mt-4 max-w-96 text-center text-sm font-medium sm:max-w-lg sm:text-lg lg:-mt-2 lg:max-w-xl lg:text-xl',
              'text-zinc-500 dark:text-zinc-300'
            )}
          >
            {t('(home).HomeHeroRow.subtitle1')} <br />
            {t('(home).HomeHeroRow.subtitle2')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={appInfo.discordInviteURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
                {t('(home).HomeHeroRow.getStarted')}
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
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
      </div>
    </>
  )
}
