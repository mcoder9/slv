import { Command } from '@cliffy'

// cloud Command
export const cloudCmd = new Command()
  .description('Manage Solana Cloud-based Applications')

cloudCmd.command('deploy')
  .description('Deploy a cloud-based application')
  .option('-r, --region <region:string>', 'Specify region for deployment')
  .action((options) => {
    console.log('Deploying cloud application...')
    if (options.region) {
      console.log(`Deploying to region: ${options.region}`)
    }
  })
