import { genVoteKey } from '/src/validator/init/genVoteKey.ts'
import { genIdentityKey } from '/src/validator/init/genIdentityKey.ts'
import type { HostData, InventoryType } from '@cmn/types/config.ts'
import type { SSHConnection } from '@cmn/prompt/checkSshConnection.ts'
import { configRoot, getInventoryPath } from '@cmn/constants/path.ts'
import { colors } from '@cliffy/colors'
import { genSolvUser } from '/src/validator/init/genSolvUser.ts'
import { addInventory } from '/lib/addInventory.ts'
import { exec } from '@elsoul/child-process'
import denoJson from '/deno.json' with { type: 'json' }
import { copyKeys } from '/src/validator/init/copyKeys.ts'
import { updateInventory } from '/lib/updateInventory.ts'

const initTestnetConfig = async (sshConnection: SSHConnection) => {
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
  // Create solv User on Ubuntu Server
  await genSolvUser(sshConnection.ip, inventoryType)
  // Generate Vote Key
  const { voteAccount, authAccount } = await genVoteKey(identityAccount)
  const configTestnet: Partial<HostData> = {
    vote_account: voteAccount,
    authority_account: authAccount,
    validator_type: 'firedancer',
  }
  await updateInventory(identityAccount, inventoryType, configTestnet)

  console.log(
    `✔︎ Validator testnet config saved to ${inventoryPath}`,
  )
  await copyKeys('testnet_validators')
  console.log(colors.white(`Now you can deploy with:

$ slv v deploy -n testnet    
`))
  return configTestnet
}

export { initTestnetConfig }
