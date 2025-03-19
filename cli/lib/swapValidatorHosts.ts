import { getInventoryPath } from '@cmn/constants/path.ts'
import type { InventoryType } from '@cmn/types/config.ts'
import { parse } from 'https://deno.land/std@0.202.0/yaml/parse.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'

/**
 * Swaps the host entries in the inventory file for the given validator keys
 * @param inventoryType The type of inventory ('mainnet_validators' or 'testnet_validators')
 * @param from The source validator key
 * @param to The target validator key
 * @returns A boolean indicating success or failure
 */
export const swapValidatorHosts = async (
  inventoryType: InventoryType,
  from: string,
  to: string,
): Promise<boolean> => {
  try {
    // Get the path to the inventory file
    const inventoryPath = getInventoryPath(inventoryType)

    // Read the inventory file
    const inventoryContent = await Deno.readTextFile(inventoryPath)

    // Parse the YAML content
    const inventory = parse(inventoryContent) as Record<string, any>

    // Check if the inventory type exists in the file
    if (!inventory[inventoryType]) {
      console.error(
        `Inventory type ${inventoryType} not found in ${inventoryPath}`,
      )
      return false
    }

    // Check if the hosts section exists
    if (!inventory[inventoryType].hosts) {
      console.error(`Hosts section not found in ${inventoryType}`)
      return false
    }

    const hosts = inventory[inventoryType].hosts

    // Check if both from and to hosts exist
    if (!hosts[from]) {
      console.error(`Source host ${from} not found in ${inventoryType}`)
      return false
    }

    if (!hosts[to]) {
      console.error(`Target host ${to} not found in ${inventoryType}`)
      return false
    }

    // Swap the host entries
    const fromHost = hosts[from]
    const toHost = hosts[to]

    hosts[from] = toHost
    hosts[to] = fromHost

    // Write the updated inventory back to the file
    await Deno.writeTextFile(inventoryPath, stringify(inventory))

    console.log(
      `Successfully swapped hosts ${from} and ${to} in ${inventoryType}`,
    )
    return true
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`Error swapping validator hosts: ${errorMessage}`)
    return false
  }
}
