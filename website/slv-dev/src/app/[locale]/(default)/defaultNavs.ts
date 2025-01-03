export enum DEFAULT_PATHS {
  home = '/',
  staking = '/staking',
  company = '/company',
  daos = '/daos',
  products = '/products',
  pressKits = '/press-kits',
  news = '/news',
  privacy = '/legal/privacy-policy'
}

export const defaultHeaderNav = [
  {
    path: DEFAULT_PATHS.products,
    label: 'products.title'
  },
  {
    path: DEFAULT_PATHS.daos,
    label: 'daos.title'
  },
  {
    path: DEFAULT_PATHS.staking,
    label: 'staking.title'
  },
  {
    path: DEFAULT_PATHS.company,
    label: 'company.title'
  },
  {
    path: DEFAULT_PATHS.news,
    label: 'news.title'
  }
]

export const defaultFooterNav1 = [
  {
    path: DEFAULT_PATHS.products,
    label: 'products.title'
  },
  {
    path: DEFAULT_PATHS.daos,
    label: 'daos.title'
  },
  {
    path: DEFAULT_PATHS.staking,
    label: 'staking.title'
  }
]

export const defaultFooterNav2 = [
  {
    path: DEFAULT_PATHS.company,
    label: 'company.title'
  },
  {
    path: DEFAULT_PATHS.news,
    label: 'news.title'
  },
  {
    path: DEFAULT_PATHS.pressKits,
    label: 'press-kits.title'
  },
  {
    path: DEFAULT_PATHS.privacy,
    label: 'legal.privacy'
  }
]
