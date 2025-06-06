'use client'

import { Blink, useAction } from '@dialectlabs/blinks'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import { solanaEndpoint } from '@/components/providers/SolanaWalletProvider'
import { useTheme } from '@/hooks/utils/useTheme'
import { useWallet } from '@solana/wallet-adapter-react'
import ConnectYourWalletCard from '@/components/solana/ConnectYourWalletCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useAtom } from 'jotai'
import { solanaBalanceAtom } from '@/store/solana'

type Props = {
  actionUrl: string
}

export default function BlinksComponent({ actionUrl }: Props) {
  const { publicKey } = useWallet()
  const { adapter } = useActionSolanaWalletAdapter(solanaEndpoint)
  const { action, isLoading } = useAction({
    url: actionUrl
  })
  const [solanaBalance] = useAtom(solanaBalanceAtom)
  const { theme, mounted } = useTheme()

  return (
    <>
      {mounted && publicKey ? (
        <>
          {action && !isLoading ? (
            <Blink
              key={solanaBalance.updated}
              blink={action}
              adapter={adapter}
              stylePreset={theme === 'light' ? 'x-light' : 'x-dark'}
            />
          ) : (
            <Skeleton className="h-80 w-full sm:h-[512px] lg:h-[720px]" />
          )}
        </>
      ) : (
        <>
          <ConnectYourWalletCard />
        </>
      )}
    </>
  )
}
