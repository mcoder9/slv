import { getInventoryPath } from '@cmn/constants/path.ts'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import { colors } from '@cliffy/colors'
import type { InventoryType } from '@cmn/types/config.ts'

const updateInventoryUser = async (
  identityAccount: string,
  inventoryType: InventoryType,
) => {
  const inventory = await genOrReadInventory(inventoryType)

  // Initialize hosts if it's null or undefined
  if (!inventory[inventoryType].hosts) {
    console.log(`⚠️ No hosts found in inventory for ${inventoryType}`)
    return
  }

  // Find the same identityAccount in inventory
  const findKey = Object.keys(inventory[inventoryType].hosts).find(
    (key) => key.toString() === identityAccount.toString(),
  )
  if (!findKey) {
    console.log(`⚠️ ${identityAccount} not found in inventory`)
    return
  }
  // Update inventory.yml user 'ubuntu' to 'solv'
  inventory[inventoryType].hosts[identityAccount].ansible_user = 'solv'
  const inventoryPath = getInventoryPath(inventoryType)
  await Deno.writeTextFile(inventoryPath, stringify(inventory))
  console.log(colors.white(`✔ Inventory updated to ${inventoryPath}`))
  console.log(
    colors.white(`✔ Successfully created solv user on ${identityAccount}`),
  )
}

export { updateInventoryUser }
