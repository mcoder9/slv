import { Command } from '@cliffy'
import { init } from '@/rpc/init.ts'
import { initJupiterAPI } from '@/rpc/jupiter/initJupiter.ts'
import { colors } from '@cliffy/colors'
import { updateAllowedIps } from '/lib/config/updateAllowedIps.ts'
import { listRPCs } from '@/rpc/listRPCs.ts'
import { deployRPCMainnet } from '/src/rpc/deploy/deployRPCMainnet.ts'
import { deployJupiter, listJupiters } from '/src/rpc/jupiter/deployJupiter.ts'
import { updateDefaultVersion } from '/lib/config/updateDefaultVersion.ts'
import type { InventoryType } from '@cmn/types/config.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'
import { runAnsilbe } from '/lib/runAnsible.ts'

// rpc Command
export const rpcCmd = new Command()
  .description('Manage Solana RPC Nodes')
  .action(() => {
    rpcCmd.showHelp()
  })

rpcCmd.command('init')
  .description('Initialize a new RPC node configuration')
  .action(async () => {
    await init()
  })

rpcCmd.command('deploy')
  .description('Deploy a new RPC node')
  .option(
    '-n, --network <network>',
    'Network to deploy RPC node on (mainnet/testnet)',
  )
  .option('-p, --pubkey <pubkey>', 'Deploy RPC node for a specific pubkey')
  .action(async (options) => {
    const network = options.network || 'mainnet'
    if (network === 'testnet') {
      console.log(
        colors.yellow(
          '⚠️ Testnet RPC deployment is not supported yet\nPlease ask for help in the #slv-chat channel',
        ),
      )
    } else {
      await deployRPCMainnet(options.pubkey)
    }
  })

rpcCmd.command('setup:jupiter')
  .description('Setup Jupiter Self-hosted SWAP API')
  .action(async () => {
    await initJupiterAPI()
  })

rpcCmd.command('deploy:jupiter')
  .description('Deploy Jupiter Self-hosted SWAP API')
  .option('-p, --name <name>', 'Name of the Jupiter API to deploy')
  .action(async (options) => {
    await deployJupiter(options.name)
  })

rpcCmd.command('list:jupiter')
  .description('List all Jupiter API instances')
  .option('-n, --name <name>', 'Filter by name')
  .action(async (options) => {
    await listJupiters(options.name)
  })

rpcCmd.command('restart')
  .description('Restart RPC Node')
  .option('-n, --network <network>', 'Network to deploy validators', {
    default: 'mainnet',
  })
  .option('-p, --pubkey <pubkey>', 'Public Key of Validator.')
  .action(async (options) => {
    const inventoryType: InventoryType = 'mainnet_rpcs'
    const templateRoot = getTemplatePath()

    const playbook = `${templateRoot}/ansible/mainnet-rpc/restart_node.yml`
    const result = options.pubkey
      ? await runAnsilbe(playbook, inventoryType, options.pubkey)
      : await runAnsilbe(playbook, inventoryType)
    if (result) {
      console.log(colors.white('✅ Successfully Restarted Validator'))
      return
    }
  })

rpcCmd.command('update:version')
  .description('Update RPC Version')
  .option('-p, --pubkey <pubkey>', 'Public Key of Validator.')
  .option('-n, --network <network>', 'Network to deploy validators', {
    default: 'mainnet',
  })
  .action(async (options) => {
    await updateDefaultVersion()
    const inventoryType: InventoryType = 'mainnet_rpcs'
    const templateRoot = getTemplatePath()

    const playbook = `${templateRoot}/ansible/mainnet-rpc/install_jito.yml`
    if (options.pubkey) {
      await runAnsilbe(playbook, inventoryType, options.pubkey)
      return
    }
    await runAnsilbe(playbook, inventoryType)
    return
  })

rpcCmd.command('update:script')
  .description('Update Validator Startup Config')
  .option('-p, --pubkey <pubkey>', 'Public Key of Validator.')
  .option('-n, --network <network>', 'Network to deploy validators', {
    default: 'mainnet',
  })
  .action(async (options) => {
    const inventoryType = 'mainnet_rpcs'
    const templateRoot = getTemplatePath()
    const playbook =
      `${templateRoot}/ansible/mainnet-rpc/update_startup_config.yml`
    if (options.pubkey) {
      await runAnsilbe(playbook, inventoryType, options.pubkey)
      return
    }
    await runAnsilbe(playbook, inventoryType, options.pubkey)
  })

rpcCmd.command('update:allowed-ips')
  .description('Update allowed IPs for mainnet RPC nodes')
  .action(async () => {
    await updateAllowedIps('mainnet_rpcs')
  })

rpcCmd.command('list')
  .description('List all RPC nodes')
  .option('-n, --network <network:string>', 'Network type (mainnet/testnet)', {
    default: 'mainnet',
  })
  .option('-i, --identity <identity:string>', 'Filter by identity key')
  .action(async (options) => {
    await listRPCs(options.network as 'mainnet' | 'testnet', options.identity)
  })
