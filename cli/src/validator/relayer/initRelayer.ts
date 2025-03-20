import { Input, prompt, Select } from '@cliffy/prompt'
import { genPasswordYml } from '/lib/genPasswordYml.ts'
import { checkSSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { colors } from '@cliffy/colors'
import { listAction } from '/src/metal/list/listAction.ts'
import { JITO_BLOCK_ENGINE_REGIONS } from '@cmn/constants/config.ts'
import { addRelayerInventory } from '/lib/addRelayerInventory.ts'

const initRelayer = async () => {
  const hasBareMetal = await prompt([{
    name: 'bareMetal',
    message: '🛡️ Do you have a Solana Node Compatabile Server?',
    type: Select,
    options: ['yes', 'no'],
    default: 'no',
  }])
  if (hasBareMetal.bareMetal === 'no') {
    console.log(
      colors.red(
        '⚠️ You need a Solana Node Compatabile High Performance Server to Run a Validator',
      ),
    )
    console.log(colors.green('🟢 You can get one from the following list:'))
    await listAction('app')
    return
  }
  const ubuntu = await checkSSHConnection()
  if (!ubuntu) {
    console.error(colors.red('❌ SSH connection failed'))
    return
  }
  // Set solv password if not exists
  await genPasswordYml()
  const answer = await prompt([
    {
      name: 'identity',
      message: 'Enter Validator Identity',
      type: Input,
    },
    {
      name: 'relayerAccount',
      message: 'Enter Relayer Account Address',
      type: Input,
    },
    {
      name: 'blockEngineRegion',
      message: '🌐 Select Block Engine Region',
      type: Select,
      options: JITO_BLOCK_ENGINE_REGIONS,
      default: 'amsterdam',
    },
    {
      name: 'rpcUrls',
      message: 'Enter RPC URLs',
      type: Input,
    },
    {
      name: 'websocketUrls',
      message: 'Enter Websocket URLs',
      type: Input,
    },
  ])
  if (!answer) {
    return
  }
  await addRelayerInventory(
    answer.identity!,
    ubuntu,
    answer.blockEngineRegion!,
    answer.rpcUrls!,
    answer.websocketUrls!,
  )
  console.log(colors.green('🟢 Relayer Inventory Added'))
  console.log(
    colors.yellow(
      `⚠️ Please place your identity key in ~/.slv/keys/${answer.relayerAccount}.json\n`,
    ),
  )

  console.log(colors.white(`Now you can deploy with:

$ slv v deploy:relayer -p ${answer.identity}    
    `))
}

export { initRelayer }
