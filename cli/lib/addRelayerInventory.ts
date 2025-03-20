import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type { SSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { genOrReadRelayerInventory } from '/lib/genOrReadRelayerInventory.ts'
import { colors } from '@cliffy/colors'
import { getInventoryPath } from '@cmn/constants/path.ts'
import type { RelayerConfig } from '@cmn/types/config.ts'

const addRelayerInventory = async (
  identityAccount: string,
  sshConnection: SSHConnection,
  blockEngineRegion: string,
  rpcUrls: string,
  rpcWsUrls: string,
) => {
  try {
    const inventoryType = 'relayer'
    const inventory = await genOrReadRelayerInventory()

    // Initialize hosts if it's null or undefined
    if (!inventory[inventoryType].hosts) {
      inventory[inventoryType].hosts = {}
    }

    // Check if identity key already exists
    let checkIdentityKey = null
    if (inventory[inventoryType].hosts) {
      checkIdentityKey = Object.values(
        inventory[inventoryType].hosts,
      ).find((key) => key.identity_account === identityAccount)
    }

    if (checkIdentityKey) {
      console.log(colors.yellow(`⚠️ Identity account already exists`))
      return false
    }

    // Add the new host
    inventory[inventoryType].hosts[identityAccount] = {
      ansible_host: sshConnection.ip,
      ansible_user: sshConnection.username,
      ansible_ssh_private_key_file: sshConnection.rsa_key_path,
      identity_account: identityAccount,
      block_engine_region: blockEngineRegion,
      rpc_urls: rpcUrls,
      rpc_ws_urls: rpcWsUrls,
    } as RelayerConfig

    const inventoryPath = getInventoryPath(inventoryType)
    await Deno.writeTextFile(inventoryPath, stringify(inventory))
    console.log(`✔ Inventory updated to ${inventoryPath}`)
    const newInventory = await genOrReadRelayerInventory()

    return newInventory
  } catch (error) {
    throw new Error(`❌ Error adding inventory: ${error}`)
  }
}

export { addRelayerInventory }
