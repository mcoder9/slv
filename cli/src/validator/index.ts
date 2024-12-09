import { Command } from '@cliffy'

// validator Command
export const validatorCmd = new Command()
  .description('Manage Solana Validator Nodes')

validatorCmd.command('start')
  .description('Start the validator node')
  .option('-c, --config <path:string>', 'Path to config file')
  .action((options) => {
    console.log('Validator is starting...')
    if (options.config) {
      console.log(`Using config: ${options.config}`)
    }
  })
