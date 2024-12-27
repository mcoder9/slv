import { Command } from '@cliffy'
import { init } from '@/rpc/init.ts'
import { colors } from '@cliffy/colors'

// rpc Command
export const rpcCmd = new Command()
  .description('Manage Solana RPC Nodes')
  .action(() => {
    rpcCmd.showHelp()
  })

rpcCmd.command('init')
  .description('Initialize a new RPC node configuration')
  .action(async () => {
    console.log(colors.blue('Coming soon...🌝'))
    // await init()
  })

rpcCmd.command('deploy')
  .description('Deploy a new RPC node')
  .action(() => {
    console.log(colors.blue('Coming soon...🌝'))
  })
