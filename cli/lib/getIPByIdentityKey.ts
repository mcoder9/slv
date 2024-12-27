import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import { colors } from '@cliffy/colors'

/// Inventory Data
// testnet_validators:
//   hosts:
//     1.1.1.1:
//       identity_account: EjDwu2Czy8eWEYRuNwtjniYks47Du3KNJ6JY9rs3aFSV
//       name: EjDwu2Czy8eWEYRuNwtjniYks47Du3KNJ6JY9rs3aFSV
//       ansible_user: solv
//       ....

const getIPByIdentityKey = async (
  identityAccount: string,
  limit = 'testnet_validators',
) => {
  try {
    const inventory = await genOrReadInventory()
    if (!inventory[limit].hosts) {
      console.log(colors.white('⚠️ No inventory found'))
      throw new Error('❌ No inventory found')
    }
    const ip = Object.keys(inventory[limit].hosts).find(
      (key) => inventory[limit].hosts[key].identity_account === identityAccount,
    )
    console.log(colors.white(`✔ Matched IP: ${ip}`))
    return ip
  } catch (error) {
    console.log(colors.yellow(`❌ Failed to get IP by Identity Key: ${error}`))
    return
  }
}

export { getIPByIdentityKey }
