import {
  AlibabaCloudLogoHorizontal,
  AlibabaCloudLogoInvertHorizontal,
  AWSLogoHorizontal,
  AWSLogoInvertHorizontal,
  CherryServersLogoHorizontal,
  CherryServersLogoInvertHorizontal,
  CloudflareLogoHorizontal,
  CloudflareLogoInvertHorizontal,
  EquinixLogoHorizontal,
  EquinixLogoInvertHorizontal,
  GoogleCloudLogoHorizontal,
  GoogleCloudLogoInvertHorizontal,
  HostCircleLogoHorizontal,
  HostCircleLogoInvertHorizontal,
  LatitudeLogoHorizontal,
  LatitudeLogoInvertHorizontal,
  MecarneLogoHorizontal,
  MecarneLogoInvertHorizontal,
  // HivelocityLogoHorizontal,
  // HivelocityLogoInvertHorizontal,
} from '@/assets/img'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { LogoCarousel } from '@/components/common/LogoCarousel'

export const globalDCPartnerLogos = [
  {
    name: 'Latitude',
    src: LatitudeLogoHorizontal,
    invertSrc: LatitudeLogoInvertHorizontal,
  },
  {
    name: 'Equinix',
    src: EquinixLogoHorizontal,
    invertSrc: EquinixLogoInvertHorizontal,
  },
  {
    name: 'CherryServers',
    src: CherryServersLogoHorizontal,
    invertSrc: CherryServersLogoInvertHorizontal,
  },
  {
    name: 'Mecarne',
    src: MecarneLogoHorizontal,
    invertSrc: MecarneLogoInvertHorizontal,
  },
  {
    name: 'HostCircle',
    src: HostCircleLogoHorizontal,
    invertSrc: HostCircleLogoInvertHorizontal,
  },
  {
    name: 'Cloudflare',
    src: CloudflareLogoHorizontal,
    invertSrc: CloudflareLogoInvertHorizontal,
  },
  {
    name: 'GoogleCloud',
    src: GoogleCloudLogoHorizontal,
    invertSrc: GoogleCloudLogoInvertHorizontal,
  },
  {
    name: 'AWS',
    src: AWSLogoHorizontal,
    invertSrc: AWSLogoInvertHorizontal,
  },
  {
    name: 'AlibabaCloud',
    src: AlibabaCloudLogoHorizontal,
    invertSrc: AlibabaCloudLogoInvertHorizontal,
  },
  // {
  //   name: 'Hivelocity',
  //   src: HivelocityLogoHorizontal,
  //   invertSrc: HivelocityLogoInvertHorizontal,
  // },
]

export default function GlobalDCPartnerRow() {
  const t = useTranslations()
  return (
    <>
      <div className="relative mx-auto max-w-7xl px-8 pb-12 sm:px-12 lg:px-3">
        <h2
          className={cn(
            'mx-auto max-w-3xl text-center text-lg font-bold tracking-tight sm:text-xl md:text-2xl lg:text-3xl',
            mainShardGradation,
          )}
        >
          Global Data Center Partner
        </h2>
        <LogoCarousel logos={globalDCPartnerLogos} columns={3} />
      </div>
    </>
  )
}
