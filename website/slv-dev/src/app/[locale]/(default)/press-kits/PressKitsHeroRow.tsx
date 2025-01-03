'use client'

import { OPOSClimate, OPOSClosedCube } from '@/assets/img'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/utils/useTheme'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import {
  ELSOUL_DISCORD_INVITE_LINK,
  ELSOUL_LABO_PRESS_KITS_DOWNLOAD_LINK_EN,
  ELSOUL_LABO_PRESS_KITS_DOWNLOAD_LINK_JA
} from '@/constants/links'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DownloadIcon } from '@radix-ui/react-icons'

export default function PressKitsHeroRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme } = useTheme()

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
              {t('press-kits.title')}
            </h2>
            <p
              className={cn(
                'text-lg font-medium tracking-tight sm:max-w-xl sm:text-xl lg:-mt-2',
                'text-zinc-500 dark:text-zinc-300'
              )}
            >
              {t('press-kits.description')}
            </p>
            <div className="flex w-full max-w-xl flex-wrap gap-4">
              <Link
                href={
                  locale === 'ja'
                    ? ELSOUL_LABO_PRESS_KITS_DOWNLOAD_LINK_JA
                    : ELSOUL_LABO_PRESS_KITS_DOWNLOAD_LINK_EN
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  {t('press-kits.download')}
                </Button>
              </Link>
              <Link
                href={ELSOUL_DISCORD_INVITE_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
                  Discord
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
