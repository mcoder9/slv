import { Command } from '@cliffy'
import { colors } from '@cliffy/colors'
import { listAction } from '@/metal/list/listAction.ts'
import { DISCORD_LINK } from '@cmn/constants/url.ts'
import { statusAction } from '/src/metal/status/statusAction.ts'
import { cancelAction } from '/src/metal/cancel/cancelAction.ts'
// metal Command
const text = `🚀 SLV BareMetal: High-Performance Servers Built for Solana Nodes

📖 Steps After Payment Completion

1. Registering Your SSH Public Key  
   Once your payment is complete, you’ll be able to register your SSH public key with the following command:
   $ slv metal status

2. Displaying Login Information  
   After registering your key, login information will appear within a few minutes to an hour.

3. If Login Information Doesn’t Appear  
   If the login details don’t show up after some time, please reach out via a support ticket on Discord.
   ValidatorsDAO Discord: ${DISCORD_LINK}
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
    await listAction()
    return
  })
  .command('status', 'Status - 🏠 My Bare Metal Resource Status')
  .action(async () => {
    await statusAction()
    return
  })
  .command('cancel', 'Cancel - 🔄 Cancel Subscription')
  .action(async () => {
    await cancelAction()
    return
  })
