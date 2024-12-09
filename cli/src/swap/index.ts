import { Command } from '@cliffy'

// swap Command
export const swapCmd = new Command()
  .description('Manage Solana Swap')

swapCmd.command('execute')
  .description('Execute a swap')
  .option('-a, --amount <amount:number>', 'Amount to swap')
  .action((options) => {
    console.log('Executing swap...')
    if (typeof options.amount === 'number') {
      console.log(`Amount: ${options.amount}`)
    }
  })
