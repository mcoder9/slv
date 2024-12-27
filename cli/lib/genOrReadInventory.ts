import { inventoryPath } from '@cmn/constants/path.ts'
import type { Inventory } from '@cmn/types/config.ts'
import { parse } from 'https://deno.land/std@0.202.0/yaml/parse.ts'
import { defaultInventory } from '/lib/config/defaultInventory.ts'

const genOrReadInventory = async () => {
  try {
    await Deno.stat(inventoryPath)
  } catch (_error) {
    await Deno.writeTextFile(inventoryPath, defaultInventory)
  }
  const inventory = await Deno.readTextFile(inventoryPath)
  const inventoryData = JSON.parse(
    JSON.stringify(parse(inventory)),
  ) as Inventory
  return inventoryData
}

export { genOrReadInventory }
