import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type { SSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import { colors } from '@cliffy/colors'
import type { InventoryType } from '@cmn/types/config.ts'
import type { Inventory } from '@cmn/types/config.ts'
import { getInventoryPath } from '@cmn/constants/path.ts'
import {
  VERSION_FIREDANCER_TESTNET,
  VERSION_SOLANA_TESTNET,
} from '@cmn/constants/version.ts'

const addInventory = async (
  identityAccount: string,
  sshConnection: SSHConnection,
  inventoryType: InventoryType,
) => {
  try {
    const inventory: Inventory = await genOrReadInventory(inventoryType)
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
    if (!inventory[inventoryType].hosts) {
      inventory[inventoryType].hosts = {
        [identityAccount]: {
          name: identityAccount,
          ansible_host: sshConnection.ip,
          ansible_user: sshConnection.username,
          ansible_ssh_private_key_file: sshConnection.rsa_key_path,
          identity_account: identityAccount,
          vote_account: '',
          authority_account: '',
          solana_cli: 'agave',
          solana_version: VERSION_SOLANA_TESTNET,
          validator_type: 'firedancer',
          version: VERSION_FIREDANCER_TESTNET,
        },
      }
    } else {
      inventory[inventoryType].hosts[identityAccount] = {
        ansible_host: sshConnection.ip,
        ansible_user: sshConnection.username,
        ansible_ssh_private_key_file: sshConnection.rsa_key_path,
        identity_account: identityAccount,
        name: identityAccount,
        vote_account: '',
        authority_account: '',
        solana_cli: 'agave',
        solana_version: VERSION_SOLANA_TESTNET,
        validator_type: 'firedancer',
        version: VERSION_FIREDANCER_TESTNET,
      }
    }
    const inventoryPath = getInventoryPath(inventoryType)
    await Deno.writeTextFile(inventoryPath, stringify(inventory))
    console.log(`✔ Inventory updated to ${inventoryPath}`)
    const newInventory = await genOrReadInventory(inventoryType)
    return newInventory
  } catch (error) {
    throw new Error(`❌ Error adding inventory: ${error}`)
  }
}

export { addInventory }
