import { getInventoryPath } from '@cmn/constants/path.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type {
  InventoryType,
  ValidatorMainnetConfig,
} from '@cmn/types/config.ts'
import { genOrReadMainnetInventory } from '/lib/genOrReadMainnetInventory.ts'

const updateMainnetInventory = async (
  identityAccount: string,
  body: Partial<ValidatorMainnetConfig>,
) => {
  const inventoryType: InventoryType = 'mainnet_validators'
  const inventoryPath = getInventoryPath(inventoryType)
  const inventory = await genOrReadMainnetInventory()
  inventory[inventoryType].hosts[identityAccount] = {
    ...inventory[inventoryType].hosts[identityAccount],
    ...body,
  }
  await Deno.writeTextFile(inventoryPath, stringify(inventory))
  console.log(`✔ Inventory updated to ${inventoryPath}`)
}

export { updateMainnetInventory }
