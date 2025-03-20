import { genVoteKey } from '/src/validator/init/genVoteKey.ts'
import { genIdentityKey } from '/src/validator/init/genIdentityKey.ts'
import type {
  InventoryType,
  ValidatorTestnetConfig,
  ValidatorTestnetType,
} from '@cmn/types/config.ts'
import type { SSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { configRoot, getInventoryPath } from '@cmn/constants/path.ts'
import { colors } from '@cliffy/colors'
import { genSolvUser } from '/src/validator/init/genSolvUser.ts'
import { addInventory } from '/lib/addInventory.ts'
import { exec } from '@elsoul/child-process'
import denoJson from '/deno.json' with { type: 'json' }
import { updateInventory } from '/lib/updateInventory.ts'
import { prompt, Select } from '@cliffy/prompt'
import { testnetValidatorConfigDir } from '@cmn/constants/path.ts'
import { updateAllowedSshIps } from '/lib/config/updateAllowedSshIps.ts'

const initTestnetConfig = async (sshConnection: SSHConnection) => {
  try {
    await Deno.stat(testnetValidatorConfigDir)
    await exec(
      `cp -r ${configRoot}/template/${denoJson.version}/jinja/testnet-validator ${configRoot}`,
    )
  } catch (_error) {
    await exec(
      `cp -r ${configRoot}/template/${denoJson.version}/jinja/testnet-validator ${configRoot}`,
    )
  }
  const { validatorType } = await prompt([
    {
      name: 'validatorType',
      message: 'Select Validator Type',
      type: Select,
      options: ['firedancer'],
      default: 'firedancer',
    },
  ])
  if (!validatorType) {
    return
  }
  const inventoryType = 'testnet_validators' as InventoryType
  // Check if testnet-validator Template exists
  try {
    const inventoryPath = getInventoryPath(inventoryType)
    await Deno.stat(inventoryPath)
  } catch (_error) {
    await exec(
      `cp -r ${configRoot}/template/${denoJson.version}/jinja/testnet-validator ${configRoot}`,
    )
  }
  const identityAccount = await genIdentityKey()
  const inventoryPath = getInventoryPath(inventoryType)
  // Generate or Add Inventory
  const inventoryCheck = await addInventory(
    identityAccount,
    sshConnection,
    inventoryType,
  )
  if (!inventoryCheck) {
    console.log(colors.yellow('⚠️ Inventory check failed'))
    return
  }
  console.log(colors.yellow(`⚠️ Please place your identity key in 
        
~/.slv/keys/${identityAccount}.json`))
  // Generate Vote Key
  const { voteAccount, authAccount } = await genVoteKey(identityAccount)
  const configTestnet: Partial<ValidatorTestnetConfig> = {
    vote_account: voteAccount,
    authority_account: authAccount,
    validator_type: validatorType as ValidatorTestnetType,
  }
  await updateAllowedSshIps('testnet_validators')
  await updateInventory(identityAccount, configTestnet)
  // Create solv User on Ubuntu Server
  await genSolvUser(identityAccount, inventoryType)
  console.log(
    `✔︎ Validator testnet config saved to ${inventoryPath}`,
  )
  console.log(colors.white(`Now you can deploy with:

$ slv v deploy -n testnet -p ${identityAccount}
`))
  return configTestnet
}

export { initTestnetConfig }
