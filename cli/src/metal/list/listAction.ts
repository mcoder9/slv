import { prompt, Select } from '@cliffy/prompt'
import { getMetalsWithPaymentLink } from '/src/metal/getMetalsWithPaymentLink.ts'
import { getMetals, type MetalType } from '/src/metal/getMetals.ts'
import { getApiKeyFromYml } from '/lib/getApiKeyFromYml.ts'
import { colors } from '@cliffy/colors'
import { DISCORD_LINK } from '@cmn/constants/url.ts'
import { Row, Table } from '@cliffy/table'

const listAction = async (defaultMetalType?: string) => {
  const app = '📦 APP - For Trade Bot, DApp and More!'
  const rpc = '⚡️ RPC - For Solana RPC Node'
  const mainnet = '💰 For Solana Mainnet Validator'
  const testnet = '🧪 For Solana Testnet Validator'
  let metalType = ''
  if (defaultMetalType) {
    metalType = defaultMetalType
  } else {
    const { bareMetalType } = await prompt([
      {
        name: 'bareMetalType',
        message: '🛡️ Select SLV BareMetal Type',
        type: Select,
        options: [
          testnet,
          mainnet,
          rpc,
          app,
        ],
        default: 'validator',
      },
    ])

    switch (bareMetalType) {
      case app:
        metalType = 'app'
        break
      case rpc:
        metalType = 'rpc'
        break
      case mainnet:
        metalType = 'mainnet'
        break
      case testnet:
        metalType = 'testnet'
        break
      default:
        metalType = 'testnet'
        break
    }
  }

  const apiKey = await getApiKeyFromYml()
  console.log(colors.yellow('🔍 Searching for SLV BareMetals...'))
  const metals = await getMetalsWithPaymentLink(apiKey, metalType as MetalType)
  if (!metals.success) {
    // @ts-ignore: First Time Payment Link
    const paymentLink = metals.link
    const metalsWithoutLink = await getMetals(
      apiKey,
      metalType as MetalType,
    )
    if (!metalsWithoutLink.success) {
      console.log(colors.red('Failed to get Metals'))
      return false
    }
    const metalProducts = metalsWithoutLink.message
    const options = metalProducts.map((product) => {
      return {
        name: colors.white(product.name + ' - ' + product.price + ' €/month'),
        value: '',
      }
    })
    await prompt([
      {
        name: 'paymentLink',
        message: '🛡️ Select SLV BareMetal Type',
        type: Select,
        options,
      },
    ])
    const text = `🔗 Secure Your Authorization to Unlock Full Features  

👉 ${paymentLink}

※ This is a one-time €1 payment to unlock full features.`
    console.log(colors.white(text))
    return false
  }
  const metalProducts = metals.message
  const options = metalProducts.map((product) => {
    return {
      name: colors.white(product.name + ' - ' + product.price + ' €/month'),
      value: product.productId,
    }
  })
  const { productId } = await prompt([
    {
      name: 'productId',
      message: '🛡️ Select a SLV BareMetal to Purchase',
      type: Select,
      options,
    },
  ])
  const productInfo = metalProducts.find((product) =>
    product.productId === productId
  )
  if (!productInfo) {
    console.log(colors.red('Failed to get product info'))
    return false
  }
  const { paymentLink } = productInfo
  // Show Product Details with Figure
  const table = new Table()
  table.body([
    new Row(colors.blue('Product Name'), colors.white(productInfo.name))
      .border(true),
    new Row(colors.blue('Region'), colors.white(productInfo.region)).border(
      true,
    ),
    new Row(colors.blue('CPU'), colors.white(productInfo.cpu)).border(true),
    new Row(colors.blue('RAM'), colors.white(productInfo.ram)).border(true),
    new Row(colors.blue('Disk'), colors.white(productInfo.disk)).border(true),
    new Row(colors.blue('Network'), colors.white(productInfo.nics)).border(
      true,
    ),
    new Row(
      colors.blue('Price'),
      colors.white('€' + productInfo.price + '/month'),
    )
      .border(true),
  ])
  table.render()
  console.log('')

  const text = `🔗 Payment Link: 
${paymentLink}

After completing the payment, you will be able to register your SSH public key with the following command:

$ slv metal status

Login information will appear within a few minutes to an hour after registering your key.

If the login details don’t show up after some time, please reach out via a support ticket on Discord.

ValidatorsDAO Discord: ${DISCORD_LINK}`
  console.log(colors.white(text))
  return true
}

export { listAction }
