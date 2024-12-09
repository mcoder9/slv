import { Command } from '@cliffy'

// bot Command
export const botCmd = new Command()
  .description('Manage Solana gRPC Geyser Client')

// bot init subcommand
botCmd.command('init')
  .description('Initialize the bot template')
  .option('-q, --queue', 'Use queue mode', { default: false })
  .action((_options: { queue: boolean }) => {
    console.log('Initializing the bot...')
  })
