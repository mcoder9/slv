import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type { SSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { genOrReadMainnetInventory } from '/lib/genOrReadMainnetInventory.ts'
import { genOrReadVersions } from '/lib/genOrReadVersions.ts'
import { colors } from '@cliffy/colors'
import { getInventoryPath } from '@cmn/constants/path.ts'
import type { ValidatorMainnetConfig } from '@cmn/types/config.ts'

const addMainnetInventory = async (
  identityAccount: string,
  sshConnection: SSHConnection,
) => {
  try {
    const inventoryType = 'mainnet_validators'
    const inventory = await genOrReadMainnetInventory()

    if (!inventory[inventoryType].hosts) {
      inventory[inventoryType].hosts = {}
    }

    const findIdentity = Object.keys(inventory[inventoryType].hosts).find(
      (key) => String(key) === identityAccount,
    )

    if (findIdentity) {
      console.log(
        colors.yellow(`⚠️ The same Identity already exists
        
  Please remove the existing Identity Account from inventory and try again`),
      )
      return false
    }

    const checkIdentityKey = Object.values(
      inventory[inventoryType].hosts,
    ).find((key) => key.identity_account === identityAccount)

    if (checkIdentityKey) {
      console.log(colors.yellow(`⚠️ Identity account already exists`))
      return false
    }

    // Get versions from versions.yml
    await genOrReadVersions()

    // Add the new host
    inventory[inventoryType].hosts[identityAccount] = {
      name: identityAccount,
      ansible_host: sshConnection.ip,
      ansible_user: sshConnection.username,
      ansible_ssh_private_key_file: sshConnection.rsa_key_path,
      identity_account: identityAccount,
      vote_account: '',
      authority_account: '',
      commission_bps: 0,
      relayer_account: '',
      username: sshConnection.username,
      validator_type: 'jito',
      port_rpc: 8899,
      relayer_url: 'http://localhost:11226',
      block_engine_region: 'amsterdam',
      shredstream_address: '',
      shredstream_desired_regions: '',
      limit_ledger_size: 200000000,
      staked_rpc_identity_account: '',
      staked_rpc_amount: 50000000000000,
      snapshot_url: '',
    } as ValidatorMainnetConfig

    const inventoryPath = getInventoryPath(inventoryType)
    await Deno.writeTextFile(inventoryPath, stringify(inventory))
    console.log(`✔ Inventory updated to ${inventoryPath}`)
    const newInventory = await genOrReadMainnetInventory()
    return newInventory
  } catch (error) {
    throw new Error(`❌ Error adding inventory: ${error}`)
  }
}

export { addMainnetInventory }
