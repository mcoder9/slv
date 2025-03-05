import { Command } from '@cliffy'
import { colors } from '@cliffy/colors'
import { listAction } from '@/metal/list/listAction.ts'
// metal Command
const text = `📖 Steps After Payment Completion

1. Registering Your SSH Public Key  
   Once your payment is complete, you’ll be able to register your SSH public key with the following command:
   $ slv metal status

2. Displaying Login Information  
   After registering your key, login information will appear within a few minutes to an hour.

3. If Login Information Doesn’t Appear  
   If the login details don’t show up after some time, please reach out via a support ticket on Discord.
   ValidatorsDAO Discord: https://discord.gg/C7ZQSrCkYR
`

export const metalCmd = new Command()
  .description(
    colors.white(text),
  )
  .action(function () {
    this.showHelp()
    return
  })
  .command('list', 'List   - 🛡️  Solana Compatible BareMetal Resources')
  .action(async () => {
    const result = await listAction()
    console.log(result)
    return
  })
  .command('status', 'Status - 🏠 My Bare Metal Resource Status')
  .action(async () => {
    console.log('Coming soon...')
    return
  })
  .command('cancel', 'Cancel - 🔄 Cancel Subscription')
  .action(async () => {
    console.log('Coming soon...')
    return
  })
