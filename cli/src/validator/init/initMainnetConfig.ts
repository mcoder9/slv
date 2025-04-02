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
  RELAYER_URL,
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
    relayerUrl,
    stakedRPCIdentity,
    relayerAccount,
  } = await prompt([
    {
      name: 'relayerUrl',
      message: 'Enter Relayer URL',
      type: Input,
      default: RELAYER_URL[blockEngineRegion as keyof typeof RELAYER_URL],
    },
    {
      name: 'relayerAccount',
      message: 'Enter Relayer Account(Optional)',
      type: Input,
      default: '',
    },
    {
      name: 'stakedRPCIdentity',
      message: 'Enter Staked RPC Identity(Optional)',
      type: Input,
      default: 'https://snapshots.avorio.network/mainnet-beta',
    },
  ])
  if (!validatorType) {
    return
  }
  const rpcAccount = stakedRPCIdentity || DEFAULT_RPC_ADDRESS
  const inventoryType = 'mainnet_validators'
  const identityAccount = await genIdentityKey()
  const inventoryPath = getInventoryPath(inventoryType)
  const shredstream_address =
    SHREDSTREAM_ADDRESS[blockEngineRegion as keyof typeof SHREDSTREAM_ADDRESS]
  // Generate or Add Inventory
  const inventoryCheck = await addMainnetInventory(
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
    vote_account: voteAccount,
    authority_account: authAccount,
    validator_type: validatorType as ValidatorMainnetType,
    commission_bps: Number(commissionBps),
    relayer_url: relayerUrl,
    relayer_account: relayerAccount,
    block_engine_region: blockEngineRegion,
    shredstream_address,
    staked_rpc_identity_account: rpcAccount,
  }
  await updateAllowedSshIps()
  await updateAllowedIps()
  await updateMainnetInventory(identityAccount, configMainnet)
  // Create solv User on Ubuntu Server
  await genSolvUser(identityAccount, inventoryType)
  console.log(
    `✔︎ Validator Mainnet Config Saved To ${inventoryPath}`,
  )
  console.log(colors.white(`Now you can deploy with:

$ slv v deploy -n mainnet -p ${identityAccount}    
`))
}

export { initMainnetConfig }
