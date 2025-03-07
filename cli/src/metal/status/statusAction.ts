import { getApiKeyFromYml } from '/lib/getApiKeyFromYml.ts'
import { colors } from '@cliffy/colors'
import { Row, Table } from '@cliffy/table'
import { getStatus } from '/src/metal/getStatus.ts'
import type { Subscription } from '/src/metal/getStatus.ts'

const statusAction = async () => {
  const apiKey = await getApiKeyFromYml()
  console.log(colors.yellow('🔍 Searching for SLV BareMetals...'))
  const metals = await getStatus(apiKey)
  if (!metals.success) {
    console.log(colors.red('Failed to get Metals\nPlease try again later'))
    return false
  }

  const myMetals = metals.message

  if (myMetals.length === 0) {
    console.log(colors.yellow('⚠️ No Bare Metals found'))
    return true
  }

  console.log(colors.white('Your SLV BareMetal Resources:'))

  // Display each metal in a table format
  for (const metal of myMetals) {
    displayMetalTable(metal)
  }

  return true
}

/**
 * Display a single metal subscription in a table format
 */
const displayMetalTable = (metal: Subscription) => {
  const table = new Table()

  // Format dates for better readability
  const startDate = new Date(metal.startDate).toLocaleString()
  const endDate = new Date(metal.endDate).toLocaleString()
  const username = metal.username || 'ubuntu'
  const ip = metal.ip || '-'

  // Format price to show as currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(metal.price / 100).replaceAll('.00', '') // Assuming price is in cents

  // Create table with rows for each property
  table.body([
    new Row(colors.blue('Product Name'), colors.white(metal.productName))
      .border(true),
    new Row(colors.blue('Status'), getStatusWithColor(metal.status)).border(
      true,
    ),
    new Row(colors.blue('IP'), colors.white(metal.ip)).border(true),
    new Row(colors.blue('Login Snippet'), colors.white(`ssh ${username}@${ip}`))
      .border(true),
    new Row(colors.blue('Region'), colors.white(metal.region)).border(true),
    new Row(colors.blue('OS'), colors.white(metal.os)).border(true),
    new Row(colors.blue('CPU'), colors.white(metal.cpu)).border(true),
    new Row(colors.blue('RAM'), colors.white(metal.ram)).border(true),
    new Row(colors.blue('Disk'), colors.white(metal.disk)).border(true),
    new Row(colors.blue('Network'), colors.white(metal.nics)).border(true),
    new Row(colors.blue('Price'), colors.white(formattedPrice + '/month'))
      .border(true),
    new Row(colors.blue('Start Date'), colors.white(startDate)).border(true),
    new Row(colors.blue('End Date'), colors.white(endDate)).border(true),
  ])

  table.render()
  console.log('') // Add empty line for better readability
}

/**
 * Get colored status text based on status value
 */
const getStatusWithColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return colors.green(status)
    case 'provisioning':
      return colors.yellow(status)
    case 'pending':
      return colors.yellow(status)
    case 'cancelled':
      return colors.red(status)
    case 'failed':
      return colors.red(status)
    default:
      return colors.white(status)
  }
}

export { statusAction }
