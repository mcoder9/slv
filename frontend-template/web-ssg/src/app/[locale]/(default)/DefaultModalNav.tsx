'use client'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/routing'

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  DiscordIconLink,
  GitHubLink,
  TwitterIconLink,
  YouTubeLink
} from '@/components/common/icons'
import { defaultHeaderNav } from './defaultNavs'
import { LanguageToggle } from '@/components/config/LanguageToggle'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export default function DefaultModalNav() {
  const [open, setOpen] = useState(false)
  const t = useTranslations()
  const pathname = usePathname()
  const isActivePath = (path: string) => pathname.includes(path)

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label={t('common.toggleNavigationMenu')}
          >
            <HamburgerMenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="flex h-screen flex-col p-5">
          <SheetTitle>
            <VisuallyHidden>{t('common.navigationMenu')}</VisuallyHidden>
          </SheetTitle>
          <nav className="grid gap-2 text-lg font-medium">
            <div className="mb-6 flex flex-row items-start">
              <LogoHorizontalLink
                className="w-24"
                onClick={() => {
                  setOpen(false)
                }}
              />
            </div>
            {defaultHeaderNav.map((navItem) => (
              <Link
                href={navItem.path}
                key={navItem.label}
                className={cn(
                  isActivePath(navItem.path)
                    ? 'text-blue-500 dark:text-blue-300'
                    : 'text-zinc-500 dark:text-zinc-300',
                  'mx-[-0.65rem] flex items-center gap-4 px-3 py-2 text-sm hover:opacity-70'
                )}
                onClick={() => setOpen(false)}
              >
                {t(navItem.label)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="flex flex-row items-center gap-3">
              <LanguageToggle />
              <GitHubLink />
              <TwitterIconLink />
              <DiscordIconLink />
              <YouTubeLink />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
