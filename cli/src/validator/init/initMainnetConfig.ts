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
import type { SSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { genSolvUser } from '/src/validator/init/genSolvUser.ts'
import { genVoteKey } from '/src/validator/init/genVoteKey.ts'
import type {
  ValidatorMainnetConfig,
  ValidatorMainnetType,
} from '@cmn/types/config.ts'
import {
  DEFAULT_RPC_ADDRESS,
  JITO_BLOCK_ENGINE_REGIONS,
  SHREDSTREAM_ADDRESS,
} from '@cmn/constants/config.ts'
import { addMainnetInventory } from '/lib/addMainnetInventory.ts'
import { updateMainnetInventory } from '/lib/updateMainnetInventory.ts'
import { updateAllowedSshIps } from '/lib/config/updateAllowedSshIps.ts'
import { updateAllowedIps } from '/lib/config/updateAllowedIps.ts'

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
  const {
    validatorType,
    commissionBps,
    blockEngineRegion,
  } = await prompt([
    {
      name: 'validatorType',
      message: 'Select Validator Type',
      type: Select,
      options: ['jito', 'firedancer'],
      default: 'jito',
    },
    {
      name: 'commissionBps',
      message: 'Enter Commission Rate',
      type: Input,
      default: '500',
    },
    {
      name: 'blockEngineRegion',
      message: '🌐 Select Block Engine Region',
      type: Select,
      options: JITO_BLOCK_ENGINE_REGIONS,
      default: 'amsterdam',
    },
  ])
  const {
    stakedRPCIdentity,
  } = await prompt([
    {
      name: 'stakedRPCIdentity',
      message: 'Enter Staked RPC Identity(Optional)',
      type: Input,
      default: DEFAULT_RPC_ADDRESS,
    },
  ])
  if (!validatorType) {
    return
  }
  const rpcAccount = stakedRPCIdentity || DEFAULT_RPC_ADDRESS
  const inventoryType = 'mainnet_validators'
  const identityAccount = await genIdentityKey()
  const { name } = await prompt([
    {
      name: 'name',
      message: 'Enter Inventory Name',
      type: Input,
      default: identityAccount,
    },
  ])
  if (!name) {
    console.log(colors.red('⚠️ Inventory Name is required'))
    return
  }
  const inventoryPath = getInventoryPath(inventoryType)
  const shredstream_address =
    SHREDSTREAM_ADDRESS[blockEngineRegion as keyof typeof SHREDSTREAM_ADDRESS]
  // Generate or Add Inventory
  const inventoryCheck = await addMainnetInventory(
    name,
    identityAccount,
    sshConnection,
  )
  if (!inventoryCheck) {
    console.log(colors.yellow('⚠️ Inventory check failed'))
    return
  }
  // Generate Vote Key
  const { voteAccount, authAccount } = await genVoteKey(identityAccount)
  const configMainnet: Partial<ValidatorMainnetConfig> = {
    name,
    vote_account: voteAccount,
    authority_account: authAccount,
    validator_type: validatorType as ValidatorMainnetType,
    commission_bps: Number(commissionBps),
    relayer_url: 'http://localhost:11226',
    relayer_account: '',
    block_engine_region: blockEngineRegion,
    shredstream_address,
    staked_rpc_identity_account: rpcAccount,
  }
  await updateAllowedSshIps()
  await updateAllowedIps()
  await updateMainnetInventory(name, configMainnet)
  // Create solv User on Ubuntu Server
  await genSolvUser(name, inventoryType)
  console.log(
    `✔︎ Validator Mainnet Config Saved To ${inventoryPath}`,
  )
  console.log(colors.white(`Now you can deploy with:

$ slv v deploy -n mainnet -p ${name}    
`))
}

export { initMainnetConfig }
