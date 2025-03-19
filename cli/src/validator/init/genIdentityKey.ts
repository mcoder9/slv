import { Confirm, Input, prompt } from '@cliffy/prompt'
import { exec } from '@elsoul/child-process'
import { colors } from '@cliffy/colors'
import { join } from '@std/path'
import { configRoot } from '@cmn/constants/path.ts'

const genIdentityKey = async (): Promise<string> => {
  const { isNewIdentity } = await prompt([{
    name: 'isNewIdentity',
    message: 'Do you want to create a new identity key now?',
    type: Confirm,
    default: true,
  }])

  let identityAccount = ''

  if (isNewIdentity) {
    console.log(colors.white('🔑 Generating new identity key...'))
    const command = `solana-keygen grind --ends-with SLV:1`
    const process = await exec(command)
    if (!process.success) {
      console.error(colors.red('❌ Failed to generate identity key'))
      throw new Error('Failed to generate identity key')
    }
    const output = process.message
    const match = output.match(/Wrote keypair to (\S+)\.json/)

    if (match && match[1]) {
      const keyValue = match[1]
      identityAccount = keyValue
      console.log('✨ Generated Key:', keyValue)
      // mv the key to ~/.slv/keys
      const dest = join(configRoot, 'keys', `${keyValue}.json`)
      await Deno.rename(`${keyValue}.json`, dest)
      console.log('✨ Moved Key to:', dest)
    } else {
      console.error('❌ Failed to parse key value from output')
    }
  } else {
    const res = await prompt([{
      name: 'identityAccount',
      message: 'Please Enter Your Identity Public Key',
      type: Input,
    }])
    identityAccount = res.identityAccount || ''
  }

  return identityAccount
}

export { genIdentityKey }
