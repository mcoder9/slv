import { Command } from '@cliffy'

// rpc Command
export const rpcCmd = new Command()
  .description('Manage Solana RPC Nodes')

rpcCmd.command('info')
  .description('Show RPC node info')
  .action(() => {
    console.log('Showing RPC node info...')
  })
