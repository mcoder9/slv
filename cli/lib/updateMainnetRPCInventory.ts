import { getInventoryPath } from '@cmn/constants/path.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type { InventoryType, RpcConfig } from '@cmn/types/config.ts'
import { genOrReadMainnetRPCInventory } from '/lib/genOrReadMainnetRPCInventory.ts'

const updateMainnetRPCInventory = async (
  identityAccount: string,
  body: Partial<RpcConfig>,
) => {
  const inventoryType: InventoryType = 'mainnet_rpcs'
  const inventoryPath = getInventoryPath(inventoryType)
  const inventory = await genOrReadMainnetRPCInventory()

  // Initialize hosts if it's null or undefined
  if (!inventory[inventoryType].hosts) {
    inventory[inventoryType].hosts = {}
  }

  inventory[inventoryType].hosts[identityAccount] = {
    ...inventory[inventoryType].hosts[identityAccount],
    ...body,
  }
  await Deno.writeTextFile(inventoryPath, stringify(inventory))
  console.log(`✔ Inventory updated to ${inventoryPath}`)
}

export { updateMainnetRPCInventory }
