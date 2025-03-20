import { Input, prompt, Select } from '@cliffy/prompt'
import { genPasswordYml } from '/lib/genPasswordYml.ts'
import { checkSSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { colors } from '@cliffy/colors'
import { listAction } from '/src/metal/list/listAction.ts'
import { addJupiterInventory } from '/lib/addJupiterInventory.ts'
import { genSolvUser } from '/src/validator/init/genSolvUser.ts'
import { configRoot, JupiterConfigDir } from '@cmn/constants/path.ts'
import { exec } from '@elsoul/child-process'
import denoJson from '/deno.json' with { type: 'json' }
import { updateAllowedSshIps } from '/lib/config/updateAllowedSshIps.ts'
import { updateAllowedIps } from '/lib/config/updateAllowedIps.ts'

const initJupiterAPI = async () => {
  try {
    await Deno.stat(JupiterConfigDir)
    await exec(
      `cp -r ${configRoot}/template/${denoJson.version}/jinja/jupiter ${configRoot}`,
    )
  } catch (_error) {
    await exec(
      `cp -r ${configRoot}/template/${denoJson.version}/jinja/jupiter ${configRoot}`,
    )
  }
  const hasBareMetal = await prompt([{
    name: 'bareMetal',
    message: '🛡️ Do you have a Jupiter SWAP API Compatabile Server?',
    type: Select,
    options: ['yes', 'no'],
    default: 'no',
  }])
  if (hasBareMetal.bareMetal === 'no') {
    console.log(
      colors.red(
        '⚠️ You need a Jupiter SWAP API Compatabile High Performance Server to Run a Validator',
      ),
    )
    console.log(colors.green('🟢 You can get one from the following list:'))
    await listAction('testnet')
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
      name: 'name',
      message: 'Enter Jupiter API Name',
      type: Input,
    },
    {
      name: 'rpcUrls',
      message: 'Enter RPC URLs(Space Separated for Multiple)',
      type: Input,
      default: 'http://localhost:8899',
    },
    {
      name: 'grpcUrl',
      message: 'Enter gRPC URL',
      type: Input,
      default: 'http://localhost:10000',
    },
    {
      name: 'xToken',
      message: 'Enter xToken for gRPC',
      type: Input,
      default: 'xToken',
    },
    {
      name: 'port_jupiter',
      message: 'Enter Jupiter API Port',
      type: Input,
      default: '2001',
    },
  ])
  if (!answer) {
    return
  }
  await addJupiterInventory(
    answer.name || '',
    ubuntu,
    answer.rpcUrls || '',
    parseInt(answer.port_jupiter || '2001'),
    answer.grpcUrl || '',
    answer.xToken || '',
  )
  await updateAllowedSshIps('jupiter')
  await updateAllowedIps('jupiter')
  await genSolvUser(answer.name!, 'jupiter')
  console.log(colors.green('🟢 Jupiter API Inventory Added'))
  console.log(colors.white(`Now you can deploy with:
  
$ slv r deploy:jupiter -p ${answer.name}    
      `))
}

export { initJupiterAPI }
