import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type { SSHConnection } from '@cmn/prompt/checkSSHConnection.ts'
import { genOrReadJupiterInventory } from '/lib/genOrReadJupiterInventory.ts'
import { colors } from '@cliffy/colors'
import { getInventoryPath } from '@cmn/constants/path.ts'
import type { JupiterConfig } from '@cmn/types/config.ts'

const addJupiterInventory = async (
  name: string,
  sshConnection: SSHConnection,
  rpcUrl: string,
  port: number,
  grpc_url: string,
  x_token: string,
) => {
  try {
    const inventoryType = 'jupiter'
    const inventory = await genOrReadJupiterInventory()

    // Initialize hosts if it's null or undefined
    if (!inventory[inventoryType].hosts) {
      inventory[inventoryType].hosts = {}
    }

    // Check if name already exists
    let checkName = null
    if (inventory[inventoryType].hosts) {
      checkName = Object.values(
        inventory[inventoryType].hosts,
      ).find((key) => key.name === name)
    }

    if (checkName) {
      console.log(
        colors.yellow(`⚠️ Jupiter API with name ${name} already exists`),
      )
      return false
    }

    // Add the new host
    inventory[inventoryType].hosts[name] = {
      ansible_host: sshConnection.ip,
      ansible_user: sshConnection.username,
      ansible_ssh_private_key_file: sshConnection.rsa_key_path,
      name: name,
      rpc_url: rpcUrl,
      port: port,
      grpc_url: grpc_url,
      x_token: x_token,
    } as JupiterConfig

    const inventoryPath = getInventoryPath(inventoryType)
    await Deno.writeTextFile(inventoryPath, stringify(inventory))
    console.log(`✔ Inventory updated to ${inventoryPath}`)
    const newInventory = await genOrReadJupiterInventory()

    return newInventory
  } catch (error) {
    throw new Error(`❌ Error adding Jupiter inventory: ${error}`)
  }
}

export { addJupiterInventory }
