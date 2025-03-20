import { runAnsilbe } from '/lib/runAnsible.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'
import { Confirm, prompt } from '@cliffy/prompt'
import { colors } from '@cliffy/colors'
import { genOrReadJupiterInventory } from '/lib/genOrReadJupiterInventory.ts'
import { Row, Table } from '@cliffy/table'
import rpcLog from '/lib/config/rpcLog.ts'

// Simple function to list Jupiter instances
const listJupiters = async (name?: string) => {
  const inventory = await genOrReadJupiterInventory()
  const header = [
    'Name',
    'Host',
    'User',
    'RPC URLs',
    'Port',
  ]
  const table = new Table()
  table.header(Row.from(header).border())
  table.border(true)

  if (
    !inventory.jupiter.hosts ||
    Object.keys(inventory.jupiter.hosts).length === 0
  ) {
    console.log(colors.yellow('⚠️ No Jupiter instances found'))
    return false
  }

  for (const [key, host] of Object.entries(inventory.jupiter.hosts)) {
    if (name && key !== name) {
      continue
    }
    table.push(
      Row.from([
        host.name,
        host.ansible_host,
        host.ansible_user,
        host.rpc_url,
        host.port.toString(),
      ]).border(),
    )
  }
  table.render()
  return true
}

const deployJupiter = async (name?: string) => {
  const inventoryType = 'jupiter'
  const templateRoot = getTemplatePath()

  const hasJupiters = await listJupiters(name)
  if (!hasJupiters) {
    console.log(colors.yellow('⚠️ No Jupiter instances to deploy'))
    return false
  }

  const confirm = await prompt([{
    type: Confirm,
    name: 'continue',
    message: 'Do you want to continue?',
    default: true,
  }])
  if (!confirm.continue) {
    console.log(colors.blue('Cancelled...🌝'))
    return false
  }

  const yml = `${templateRoot}/ansible/jupiter/init.yml`
  const result = name
    ? await runAnsilbe(yml, inventoryType, name)
    : await runAnsilbe(yml, inventoryType)

  if (result) {
    console.log(colors.green('✅ Successfully Deployed Jupiter API'))
    rpcLog()
    return true
  }

  console.log(colors.red('❌ Failed to deploy Jupiter API'))
  return false
}

export { deployJupiter, listJupiters }
