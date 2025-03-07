import { METAL_API_URL } from '@cmn/constants/url.ts'

export type MetalType =
  | 'mainnet'
  | 'testnet'
  | 'rpc'
  | 'app'
  | 'dedicated'
  | 'baremetal'
  | 'all'

export type Product = {
  productId: string
  paymentLink: string
  name: string
  price: string // 数値にするなら number でもOK
  description: string
  cpu: string
  ram: string
  disk: string
  nics: string
  region: string
  status: string
  tags: string
  isMainnet: string // boolean にするなら変換処理が必要
  isTestnet: string
  isRPC: string
  isDedicated?: string // 最後のデータには無いので optional にしています
}

export type ProductResponse = {
  success: boolean
  message: Product[]
}

const getMetals = async (
  apiKey: string,
  metalType: MetalType,
) => {
  try {
    const myHeaders = new Headers()
    myHeaders.append('x-token', 'solv')
    myHeaders.append(
      'Authorization',
      `Bearer ${apiKey}`,
    )
    myHeaders.append('Content-Type', 'application/json')
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    }
    const response = await fetch(
      METAL_API_URL + '/metal/list-baremetals?metalType=' +
        metalType,
      requestOptions,
    )
    const result = await response.json() as ProductResponse
    return result
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get metals')
  }
}

export { getMetals }
