import type { InventoryType } from '@cmn/types/config.ts'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import { colors } from '@cliffy/colors'

/// Inventory Data
// testnet_validators:
//   hosts:
//     EjDwu2Czy8eWEYRuNwtjniYks47Du3KNJ6JY9rs3aFSV:
//       ansible_host: 1.1.1.1
//       identity_account: EjDwu2Czy8eWEYRuNwtjniYks47Du3KNJ6JY9rs3aFSV
//       name: EjDwu2Czy8eWEYRuNwtjniYks47Du3KNJ6JY9rs3aFSV
//       ansible_user: solv
//       ....

const getIPByIdentityKey = async (
  identityAccount: string,
  inventoryType: InventoryType,
) => {
  try {
    const inventory = await genOrReadInventory(inventoryType)
    if (!inventory[inventoryType].hosts) {
      console.log(colors.white('⚠️ No inventory found'))
      throw new Error('❌ No inventory found')
    }
    const ip = Object.keys(inventory[inventoryType].hosts).find(
      (key) => {
        inventory[inventoryType].hosts[key].identity_account === identityAccount
          ? inventory[inventoryType].hosts[key].ansible_host
          : null
      },
    )
    if (!ip) {
      console.log(colors.yellow('❌ No IP found'))
      throw new Error('❌ No IP found')
    }
    console.log(colors.white(`✔ Matched IP: ${ip}`))
    return ip
  } catch (error) {
    console.log(colors.yellow(`❌ Failed to get IP by Identity Key: ${error}`))
    return
  }
}

export { getIPByIdentityKey }
