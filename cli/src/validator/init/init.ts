import { prompt, Select } from '@cliffy/prompt'
import { initMainnetConfig } from '/src/validator/init/initMainnetConfig.ts'
import { initTestnetConfig } from '/src/validator/init/initTestnetConfig.ts'
import { genPasswordYml } from '/lib/genPasswordYml.ts'
import { checkSSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { colors } from '@cliffy/colors'

const init = async () => {
  const ubuntu = await checkSSHConnection()
  if (!ubuntu) {
    console.error(colors.red('❌ SSH connection failed'))
    return
  }
  // Set solv password if not exists
  await genPasswordYml()

  const validator = await prompt([
    {
      name: 'network',
      message: 'Select Solana Network',
      type: Select,
      options: ['testnet', 'mainnet'],
      default: 'testnet',
    },
  ])
  if (validator.network === 'testnet') {
    await initTestnetConfig(ubuntu)
  } else {
    await initMainnetConfig()
  }
}

export { init }
