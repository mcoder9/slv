import { getInventoryPath } from '@cmn/constants/path.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type {
  InventoryType,
  ValidatorMainnetConfig,
} from '@cmn/types/config.ts'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'

const updateMainnetInventory = async (
  identityAccount: string,
  body: Partial<ValidatorMainnetConfig>,
) => {
  const inventoryType: InventoryType = 'mainnet_validators'
  const inventoryPath = getInventoryPath(inventoryType)
  const inventory = await genOrReadInventory(inventoryType)
  inventory[inventoryType].hosts[identityAccount] = {
    ...inventory[inventoryType].hosts[identityAccount],
    ...body,
  }
  await Deno.writeTextFile(inventoryPath, stringify(inventory))
  console.log(`✔ Inventory updated to ${inventoryPath}`)
}

export { updateMainnetInventory }
