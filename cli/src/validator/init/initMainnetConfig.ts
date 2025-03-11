import { colors } from '@cliffy/colors'
import { Input, prompt, Select } from '@cliffy/prompt'
import denoJson from '/deno.json' with { type: 'json' }
import { exec } from '@elsoul/child-process'
import {
  configRoot,
  getInventoryPath,
  mainnetValidatorConfigDir,
} from '@cmn/constants/path.ts'
import { genIdentityKey } from '/src/validator/init/genIdentityKey.ts'
import { addInventory } from '/lib/addInventory.ts'
import type { SSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { genSolvUser } from '/src/validator/init/genSolvUser.ts'
import { genVoteKey } from '/src/validator/init/genVoteKey.ts'
import { updateInventory } from '/lib/updateInventory.ts'
import type { HostData } from '@cmn/types/config.ts'
import { JITO_BLOCK_ENGINE_REGIONS } from '@cmn/constants/config.ts'

const initMainnetConfig = async (sshConnection: SSHConnection) => {
  try {
    await Deno.stat(mainnetValidatorConfigDir)
    await exec(
      `cp -r ${configRoot}/template/${denoJson.version}/jinja/mainnet-validator ${configRoot}`,
    )
  } catch (_error) {
    await exec(
      `cp -r ${configRoot}/template/${denoJson.version}/jinja/mainnet-validator ${configRoot}`,
    )
  }
  const { validatorType, blockEngineRegion, relayerUrl, stakedRPCIdentity } =
    await prompt([
      {
        name: 'validatorType',
        message: 'Select Validator Type',
        type: Select,
        options: ['jito'],
        default: 'jito',
      },
      {
        name: 'blockEngineRegion',
        message: '🌐 Select Block Engine Region',
        type: Select,
        options: JITO_BLOCK_ENGINE_REGIONS,
        default: 'amsterdam',
      },
      {
        name: 'relayerUrl',
        message: 'Enter Relayer URL',
        type: Input,
        default: 'http://localhost:11226',
      },
      {
        name: 'stakedRPCIdentity',
        message: 'Enter Staked RPC Identity(Optional)',
        type: Input,
        default: 'staked_rpc_identity_account',
      },
    ])
  if (!validatorType) {
    return
  }
  const inventoryType = 'mainnet_validators'
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
  await genSolvUser(identityAccount, inventoryType)
  // Generate Vote Key
  const { voteAccount, authAccount } = await genVoteKey(identityAccount)
  const configMainnet: Partial<HostData> = {
    vote_account: voteAccount,
    authority_account: authAccount,
    validator_type: validatorType,
  }
  await updateInventory(identityAccount, inventoryType, configMainnet)
  console.log(
    `✔︎ Validator Mainnet Config Saved To ${inventoryPath}`,
  )
  console.log(colors.white(`Now you can deploy with:

$ slv v deploy -n mainnet -p ${identityAccount}    
`))
}

export { initMainnetConfig }
