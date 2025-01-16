import { Command } from '@cliffy'
import { init } from '/src/validator/init/init.ts'
import { deployValidatorTestnet } from '/src/validator/deploy/deployValidatorTestnet.ts'
import { Confirm, prompt, Select } from '@cliffy/prompt'
import { colors } from '@cliffy/colors'
import { listValidators } from '/src/validator/listValidators.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'
import { runAnsilbe } from '/lib/runAnsible.ts'
import type { InventoryType, NetworkType } from '@cmn/types/config.ts'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import { parse } from 'https://deno.land/std@0.202.0/yaml/parse.ts'
import { addInventory } from '/lib/addInventory.ts'
import type { SSHConnection } from '@cmn/prompt/checkSshConnection.ts'
import { homeDir } from '@cmn/constants/path.ts'
import { updateInventory } from '/lib/updateInventory.ts'
import { VERSION_SOLANA_TESTNET } from '@cmn/constants/version.ts'

export const validatorCmd = new Command()
  .description('Manage Solana Validator Nodes')
  .action(() => {
    validatorCmd.showHelp()
  })

validatorCmd.command('init')
  .description('Initialize a new validator')
  .action(async () => {
    await init()
  })

validatorCmd.command('deploy')
  .description('Deploy Validators')
  .option('-n, --network <network>', 'Network to deploy validators')
  .action(async (options) => {
    let network = options.network
    if (!options.network) {
      const validator = await prompt([
        {
          name: 'network',
          message: 'Select Solana Network',
          type: Select,
          options: ['testnet', 'mainnet'],
          default: 'testnet',
        },
      ])
      network = validator.network
    }
    if (network === 'testnet') {
      await deployValidatorTestnet()
    } else {
      console.log(colors.blue('Coming soon...🌝'))
    }
  })

validatorCmd.command('list')
  .description('List validators')
  .option('-n, --network <network>', 'Network to deploy validators', {
    default: 'testnet',
  })
  .action(async (options) => {
    const network = options.network as NetworkType
    await listValidators(network)
  })

validatorCmd.command('set:identity')
  .description('Set Validator Identity')
  .option('-n, --network <network>', 'Network to deploy validators', {
    default: 'testnet',
  })
  .option('--pubkey <pubkey>', 'Public Key of Validator')
  .action(async (options) => {
    // const network = options.network
    if (!options.pubkey) {
      console.log(colors.yellow('⚠️ Public Key is required'))
      return
    }
    const inventoryType: InventoryType = options.network === 'mainnet'
      ? 'mainnet_validators'
      : 'testnet_validators'

    const templateRoot = getTemplatePath()
    const inventory = await genOrReadInventory(inventoryType)
    const playbook =
      inventory[inventoryType].hosts[options.pubkey].validator_type ===
          'firedancer'
        ? `${templateRoot}/ansible/testnet-validator/change_identity_and_restart.yml`
        : `${templateRoot}/ansible/testnet-validator/set_identity_to_active.yml`
    const result = await runAnsilbe(playbook, inventoryType, options.pubkey)
    if (result) {
      console.log(colors.white('✅ Successfully Set Validator Identity'))
      return
    }
  })

validatorCmd.command('set:unstaked')
  .description(
    'Set Validator Identity to Unstaked Key Stop/Change Identity/Start',
  )
  .option('-n, --network <network>', 'Network to deploy validators', {
    default: 'testnet',
  })
  .option('--pubkey <pubkey>', 'Public Key of Validator')
  .action(async (options) => {
    if (!options.pubkey) {
      console.log(colors.yellow('⚠️ Public Key is required'))
      return
    }

    const inventoryType: InventoryType = options.network === 'mainnet'
      ? 'mainnet_validators'
      : 'testnet_validators'
    const templateRoot = getTemplatePath()
    const playbook =
      `${templateRoot}/ansible/testnet-validator/set_unstaked_key.yml`
    const result = await runAnsilbe(playbook, inventoryType, options.pubkey)
    if (result) {
      console.log(colors.white('✅ Successfully Set Unstaked Identity'))
      return
    }
  })

validatorCmd.command('restart')
  .description('Restart validator')
  .option('-n, --network <network>', 'Network to deploy validators', {
    default: 'testnet',
  })
  .option('--pubkey <pubkey>', 'Public Key of Validator')
  .option(
    '-r, --rm',
    'Remove Snapshot/Ledger Dirs and DL Snapshot with Snapshot Finder before Starting',
    { default: false },
  )
  .action(async (options) => {
    if (!options.pubkey) {
      console.log(colors.yellow('⚠️ Public Key is required'))
      return
    }
    const inventoryType: InventoryType = options.network === 'mainnet'
      ? 'mainnet_validators'
      : 'testnet_validators'
    const templateRoot = getTemplatePath()
    const inventory = await genOrReadInventory(inventoryType)
    const validator = inventory[inventoryType].hosts[options.pubkey]
    const playbook = options.rm
      ? `${templateRoot}/ansible/testnet-validator/restart_${validator.validator_type}_with_rm_ledger.yml`
      : `${templateRoot}/ansible/testnet-validator/restart_${validator.validator_type}.yml`

    const result = await runAnsilbe(playbook, inventoryType, options.pubkey)
    if (result) {
      console.log(colors.white('✅ Successfully Restarted Validator'))
      return
    }
  })

validatorCmd.command('setup:agave')
  .description('Setup Agave Validator')
  .option('--pubkey <pubkey>', 'Public Key of Validator')
  .action(async (options) => {
    if (!options.pubkey) {
      console.log(colors.yellow('⚠️ Public Key is required'))
      return
    }
    const inventoryType: InventoryType = 'testnet_validators'
    const templateRoot = getTemplatePath()
    const playbook = `${templateRoot}/ansible/testnet-validator/setup_agave.yml`
    const result = await runAnsilbe(playbook, inventoryType, options.pubkey)
    await updateInventory(options.pubkey, inventoryType, {
      validator_type: 'agave',
      version: VERSION_SOLANA_TESTNET,
    })
    if (result) {
      console.log(colors.white('✅ Successfully Setup Agave Validator'))
      return
    }
  })

// validatorCmd.command('update:version')
//   .description('Update Validator Version')
//   .option('--pubkey <pubkey>', 'Public Key of Validator')
//   .option('-n, --network <network>', 'Network to deploy validators', {
//     default: 'testnet',
//   })
//   .action(async (options) => {
//     if (!options.pubkey) {
//       console.log(colors.yellow('⚠️ Public Key is required'))
//       return
//     }
//     const inventoryType: InventoryType = options.network === 'mainnet'
//       ? 'mainnet_validators'
//       : 'testnet_validators'
//   })

validatorCmd.command('apply')
  .description('Apply Ansiible Playbook')
  .option('-y, --yml <yml>', 'Playbook Yml File Path to Apply')
  .option('-p, --pubkey <pubkey>', 'Public Key of Validator')
  .option('-n, --network <network>', 'Network to deploy validators', {
    default: 'testnet',
  })
  .action(async (options) => {
    if (!options.yml) {
      console.log(colors.yellow('⚠️ Yml File is required'))
      return
    }
    if (!options.pubkey) {
      console.log(colors.yellow('⚠️ Public Key is required'))
      return
    }
    const inventoryType: InventoryType = options.network === 'mainnet'
      ? 'mainnet_validators'
      : 'testnet_validators'
    const result = await runAnsilbe(options.yml, inventoryType, options.pubkey)
    if (result) {
      console.log(colors.white('✅ Successfully Applied Playbook'))
      return
    }
  })

validatorCmd.command('codebot')
  .description('CodeBot Validator Config')
  .action(async () => {
    const confirm = await prompt([{
      type: Confirm,
      name: 'continue',
      message: 'Do you want to migrate to new inventory?',
      default: true,
    }])
    if (!confirm.continue) {
      console.log(colors.blue('Cancelled...🌝'))
      return
    }
    interface Validator {
      identity_account: string
      vote_account: string
      authority_account: string
      username: string
      ip: string
      rsa_key_path: string
      solana_cli: string
      solana_version: string
      validator_type: string
      version: string
    }

    interface Config {
      validators: Validator[]
    }
    const inventoryType: InventoryType = 'testnet_validators'
    const oldConfigPath = homeDir + '/.slv/config.validator.testnet.yml'
    let fileContent = ''
    try {
      fileContent = await Deno.readTextFile(oldConfigPath)
    } catch (_error) {
      console.log(`No file found at ${oldConfigPath}`)
      console.log(colors.white('Looks good...🌝'))
      return
    }
    const config = parse(fileContent) as Config
    for (const validator of config.validators) {
      const sshConnection: SSHConnection = {
        username: validator.username,
        ip: validator.ip,
        rsa_key_path: validator.rsa_key_path,
      }
      await addInventory(
        validator.identity_account,
        sshConnection,
        inventoryType,
      )
      await updateInventory(
        validator.identity_account,
        inventoryType,
        {
          vote_account: validator.vote_account,
          authority_account: validator.authority_account,
          validator_type: validator.validator_type,
          version: validator.version,
        },
      )
    }
    console.log(colors.white('✅ Successfully Migrated to New Inventory'))
  })
