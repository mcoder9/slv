import { genVoteKey } from '/src/validator/init/genVoteKey.ts'
import { genIdentityKey } from '/src/validator/init/genIdentityKey.ts'
import type { ValidatorTestnetConfig } from '@cmn/types/config.ts'
import type { SSHConnection } from '@cmn/prompt/checkSshConnection.ts'
import {
  VERSION_FIREDANCER_TESTNET,
  VERSION_SOLANA_TESTNET,
} from '@cmn/constants/version.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import { parse } from 'https://deno.land/std@0.202.0/yaml/parse.ts'
import {
  configRoot,
  testnetValidatorConfigDir,
  validatorTestnetConfigFilePath,
} from '@cmn/constants/path.ts'
import { checkIdentityKeyExist } from '/lib/checkIdentityKeyExist.ts'
import { colors } from '@cliffy/colors'
import { genSolvUser } from '/src/validator/init/genSolvUser.ts'
import { addInventory } from '/lib/addInventory.ts'
import { exec } from '@elsoul/child-process'
import denoJson from '/deno.json' with { type: 'json' }

const initTestnetConfig = async (sshConnection: SSHConnection) => {
  // Check if testnet-validator Template exists
  try {
    await Deno.stat(testnetValidatorConfigDir)
  } catch (_error) {
    await exec(
      `cp -r ${configRoot}/template/${denoJson.version}/jinja/testnet-validator ${configRoot}`,
    )
  }
  const identityAccount = await genIdentityKey()
  try {
    await Deno.stat(validatorTestnetConfigFilePath)
  } catch (_error) {
    await Deno.writeTextFile(
      validatorTestnetConfigFilePath,
      stringify({ validators: null }),
    )
  }
  const currentConfig = await Deno.readTextFile(validatorTestnetConfigFilePath)
  const parsedYml = currentConfig ? parse(currentConfig) : []
  const validatorConfig = parsedYml as { validators: ValidatorTestnetConfig[] }
  // Check if default config.validator.testnet.yml is empty
  let validators: ValidatorTestnetConfig[]
  try {
    validators = validatorConfig.validators
  } catch (_error) {
    const defaultConfig = {
      validators: [] as ValidatorTestnetConfig[],
    }
    await Deno.writeTextFile(
      validatorTestnetConfigFilePath,
      stringify(defaultConfig),
    )
    validators = defaultConfig.validators
  }
  const isNew = checkIdentityKeyExist(
    identityAccount,
    validators,
  )
  if (isNew) {
    const msg = `⚠️ Identity account already exists
  
  Please remove the existing identity account from ${validatorTestnetConfigFilePath} and try again`
    console.log(colors.yellow(msg))
    return
  }
  // Generate or Add Inventory
  const inventoryCheck = await addInventory(identityAccount, sshConnection)
  if (!inventoryCheck) {
    return
  }
  // Create solv User on Ubuntu Server
  await genSolvUser(sshConnection.ip, 'testnet_validators')
  // Generate Vote Key
  const { voteAccount, authAccount } = await genVoteKey(identityAccount)
  const configTestnet: ValidatorTestnetConfig = {
    identity_account: identityAccount,
    vote_account: voteAccount,
    authority_account: authAccount,
    ...sshConnection,
    solana_cli: 'agave',
    solana_version: VERSION_SOLANA_TESTNET,
    validator_type: 'firedancer',
    version: VERSION_FIREDANCER_TESTNET,
  }
  if (!validators) {
    validators = []
  }
  validators.push(configTestnet)
  const ymlContent = stringify({ validators })
  await Deno.writeTextFile(validatorTestnetConfigFilePath, ymlContent)
  console.log(
    `✔︎ Validator testnet config saved to ${validatorTestnetConfigFilePath}`,
  )
  console.log(colors.white(`Now you can deploy with:

$ slv v deploy -n testnet    
`))
  return configTestnet
}

export { initTestnetConfig }
