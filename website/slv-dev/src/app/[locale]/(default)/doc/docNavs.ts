import { Section } from '@/lib/articles'

export const docMenuData: Section[] = [
  {
    title: 'doc.nav.general.getting-started',
    route: '/doc/general/getting-started',
    items: [
      {
        title: 'doc.nav.testnet-validator.title',
        subItems: [
          {
            title: 'doc.nav.testnet-validator.quickstart',
            route: '/doc/testnet-validator/quickstart'
          }
        ]
      },
      {
        title: 'doc.nav.mainnet-validator.title',
        subItems: [
          {
            title: 'doc.nav.mainnet-validator.quickstart',
            route: '/doc/mainnet-validator/quickstart'
          }
        ]
      },
      {
        title: 'doc.nav.rpc.title',
        subItems: [
          {
            title: 'doc.nav.rpc.quickstart',
            route: '/doc/rpc/quickstart'
          }
        ]
      },
      {
        title: 'doc.nav.metal.title',
        subItems: [
          {
            title: 'doc.nav.metal.quickstart',
            route: '/doc/metal/quickstart'
          }
        ]
      },
      {
        title: 'doc.nav.geyser.title',
        subItems: [
          {
            title: 'doc.nav.geyser.quickstart',
            route: '/doc/geyser/quickstart'
          }
        ]
      },
      {
        title: 'doc.nav.swap.title',
        subItems: [
          {
            title: 'doc.nav.swap.quickstart',
            route: '/doc/swap/quickstart'
          }
        ]
      },
      {
        title: 'doc.nav.app.title',
        subItems: [
          {
            title: 'doc.nav.app.quickstart',
            route: '/doc/app/quickstart'
          }
        ]
      },
      {
        title: 'doc.nav.bot.title',
        subItems: [
          {
            title: 'doc.nav.bot.quickstart',
            route: '/doc/bot/quickstart'
          }
        ]
      }
    ]
  }
]
