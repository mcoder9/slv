import { Command } from '@cliffy'

// app Command
export const appCmd = new Command()
  .description('Manage Solana Applications')

// 例: app runサブコマンド
appCmd.command('run')
  .description('Run an application')
  .option('-v, --verbose', 'Enable verbose mode', { default: false })
  .action((options) => {
    console.log('App is running...')
    if (options.verbose) {
      console.log('Verbose mode enabled')
    }
  })
