import { join } from '@std/path'
import type { InventoryType } from '@cmn/types/config.ts'

export const homeDir = Deno.env.get('HOME')
export const configRoot = homeDir
  ? join(homeDir, '.slv')
  : join(Deno.cwd(), '.slv')

export const getInventoryPath = (
  inventoryType: InventoryType,
) => {
  const splitString = inventoryType.split('_')
  return join(configRoot, `inventory.${splitString[0]}.${splitString[1]}.yml`)
}
export const keyPath = join(configRoot, 'keys')
export const pwdConfigFilePath = join(configRoot, 'config.pwd.yml')
