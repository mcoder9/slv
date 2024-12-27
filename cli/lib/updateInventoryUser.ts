import { inventoryPath } from '@cmn/constants/path.ts'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import { colors } from '@cliffy/colors'

const updateInventoryUser = async (ip: string) => {
  const inventory = await genOrReadInventory()
  // Find the same ip in inventory
  const findIp = Object.keys(inventory.testnet_validators.hosts).find(
    (key) => key.toString() === ip.toString(),
  )
  if (!findIp) {
    console.log(`⚠️ IP ${ip} not found in inventory`)
    return
  }
  // Update inventory.yml user 'ubuntu' to 'solv'
  inventory.testnet_validators.hosts[ip].ansible_user = 'solv'
  await Deno.writeTextFile(inventoryPath, stringify(inventory))
  console.log(colors.white(`✔ Inventory updated to ${inventoryPath}`))
  console.log(colors.white(`✔ Successfully created solv user on ${ip}`))
}

export { updateInventoryUser }
