import { METAL_API_URL } from '@cmn/constants/url.ts'
import type { MetalType, ProductResponse } from '/src/metal/getMetals.ts'

const getMetalsWithPaymentLink = async (
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
      METAL_API_URL + '/metal/list-baremetals-with-payment-link?metalType=' +
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

export { getMetalsWithPaymentLink }
