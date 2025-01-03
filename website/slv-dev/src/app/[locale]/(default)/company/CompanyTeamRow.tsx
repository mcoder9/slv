'use client'

import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { FumitakeKawasakiImg, ShotaKishiImg, JamesNeveImg } from '@/assets/img'
import {
  FUMITAKE_KAWASAKI_GITHUB_LINK,
  FUMITAKE_KAWASAKI_LINKEDIN_LINK,
  FUMITAKE_KAWASAKI_X_LINK,
  FUMITAKE_KAWEASAKI_GOOGLE_SCHOLAR_LINK,
  SHOTA_KISHI_GITHUB_LINK,
  SHOTA_KISHI_GOOGLE_SCHOLAR_LINK,
  SHOTA_KISHI_LINKEDIN_LINK,
  SHOTA_KISHI_X_LINK,
  JAMES_NEVE_GITHUB_LINK,
  JAMES_NEVE_GOOGLE_SCHOLAR_LINK,
  JAMES_NEVE_LINKEDIN_LINK,
  JAMES_NEVE_X_LINK
} from '@/constants/links'
import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
  faGoogleScholar
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/utils/useTheme'
import Image from 'next/image'

const members = [
  {
    name: 'FumitakeKawasaki',
    img: FumitakeKawasakiImg,
    xLink: FUMITAKE_KAWASAKI_X_LINK,
    linkedinLink: FUMITAKE_KAWASAKI_LINKEDIN_LINK,
    githubLink: FUMITAKE_KAWASAKI_GITHUB_LINK,
    googleScholarLink: FUMITAKE_KAWEASAKI_GOOGLE_SCHOLAR_LINK
  },
  {
    name: 'ShotaKishi',
    img: ShotaKishiImg,
    xLink: SHOTA_KISHI_X_LINK,
    linkedinLink: SHOTA_KISHI_LINKEDIN_LINK,
    githubLink: SHOTA_KISHI_GITHUB_LINK,
    googleScholarLink: SHOTA_KISHI_GOOGLE_SCHOLAR_LINK
  },
  {
    name: 'JamesNeve',
    img: JamesNeveImg,
    xLink: JAMES_NEVE_X_LINK,
    linkedinLink: JAMES_NEVE_LINKEDIN_LINK,
    githubLink: JAMES_NEVE_GITHUB_LINK,
    googleScholarLink: JAMES_NEVE_GOOGLE_SCHOLAR_LINK
  }
]

export default function CompanyTeamRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme } = useTheme()

  return (
    <>
      <div className="relative mx-auto max-w-7xl p-3">
        <div className="relative mx-auto grid items-center gap-16 py-24 md:py-48">
          <div className="grid w-full gap-4 p-4">
            <h2
              className={cn(
                'py-2 text-center text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl',
                mainShardGradation
              )}
            >
              {t('company.CompanyTeamRow.title')}
            </h2>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-20">
            {members.map((member, index) => (
              <div
                key={member.name}
                className="flex max-w-xs flex-col items-center justify-center gap-2 text-center"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  className="rounded-full"
                  unoptimized
                  width={256}
                  height={256}
                />
                <div className="grid">
                  <h3
                    className={cn(
                      'mt-2 text-lg font-bold sm:text-xl md:text-2xl',
                      mainShardGradation
                    )}
                  >
                    {t(`company.CompanyTeamRow.${member.name}.name`)}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {t(`company.CompanyTeamRow.${member.name}.role`)}
                  </p>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t(`company.CompanyTeamRow.${member.name}.bio`)}
                </p>
                <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`${member.xLink}`}
                    className="hover:opacity-80"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
                    />
                  </a>
                  <a
                    href={`${member.linkedinLink}`}
                    className="hover:opacity-80"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
                    />
                  </a>
                  <a
                    href={`${member.githubLink}`}
                    className="hover:opacity-80"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
                    />
                  </a>
                  <a
                    href={`${member.googleScholarLink}`}
                    className="hover:opacity-80"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      icon={faGoogleScholar}
                      className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
