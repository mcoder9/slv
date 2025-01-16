import type { InventoryType } from '@cmn/types/config.ts'

const defaultInventory = (
  inventoryType: InventoryType,
) =>
  `${inventoryType}:
  hosts: null`

export { defaultInventory }
