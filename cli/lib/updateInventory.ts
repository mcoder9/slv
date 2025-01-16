import { getInventoryPath } from '@cmn/constants/path.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type { HostData, InventoryType } from '@cmn/types/config.ts'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'

const updateInventory = async (
  identityAccount: string,
  inventoryType: InventoryType,
  hostData: Partial<HostData>,
) => {
  const inventoryPath = getInventoryPath(inventoryType)
  const inventory = await genOrReadInventory(inventoryType)
  inventory[inventoryType].hosts[identityAccount] = {
    ...inventory[inventoryType].hosts[identityAccount],
    ...hostData,
  }
  await Deno.writeTextFile(inventoryPath, stringify(inventory))
  console.log(`✔ Inventory updated to ${inventoryPath}`)
}

export { updateInventory }
