import { inventoryPath } from '@cmn/constants/path.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'
import type { SSHConnection } from '@cmn/prompt/checkSshConnection.ts'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import { colors } from '@cliffy/colors'

const addInventory = async (
  identityAccount: string,
  sshConnection: SSHConnection,
  limit = 'testnet_validators',
) => {
  try {
    const inventory = await genOrReadInventory()
    if (!inventory[limit].hosts) {
      inventory[limit].hosts = {}
    }
    const findIdentity = Object.keys(inventory[limit].hosts).find(
      (key) => String(key) === String(sshConnection.ip),
    )
    console.log(`✔ Identity account: ${findIdentity}`)
    if (findIdentity) {
      console.log(colors.yellow(`⚠️ The same IP already exists
        
  Please remove the existing IP from ${inventoryPath} and try again`))
      return false
    }
    const checkIdentityKey = Object.values(inventory.testnet_validators.hosts)
      .find(
        (key) => key.identity_account === identityAccount,
      )
    if (checkIdentityKey) {
      console.log(colors.yellow(`⚠️ Identity account already exists`))
      return false
    }
    if (!inventory.testnet_validators.hosts) {
      inventory.testnet_validators.hosts = {
        [sshConnection.ip]: {
          identity_account: identityAccount,
          name: identityAccount,
          ansible_user: sshConnection.username,
        },
      }
    } else {
      inventory.testnet_validators.hosts[sshConnection.ip] = {
        identity_account: identityAccount,
        name: identityAccount,
        ansible_user: sshConnection.username,
      }
    }

    await Deno.writeTextFile(inventoryPath, stringify(inventory))
    console.log(`✔ Inventory updated to ${inventoryPath}`)
    const newInventory = await genOrReadInventory()
    return newInventory
  } catch (error) {
    throw new Error(`❌ Error adding inventory: ${error}`)
  }
}

export { addInventory }
