import { join } from '@std/path'
import type { InventoryType } from '@cmn/types/config.ts'

export const homeDir = Deno.env.get('HOME')
export const configRoot = homeDir
  ? join(homeDir, '.slv')
  : join(Deno.cwd(), '.slv')
export const testnetValidatorConfigDir = join(configRoot, 'testnet-validator')
export const mainnetValidatorConfigDir = join(configRoot, 'mainnet-validator')
export const VERSIONS_PATH = join(configRoot, 'versions.yml')
export const getInventoryPath = (
  inventoryType: InventoryType,
) => {
  const splitString = inventoryType.split('_')
  return join(configRoot, `inventory.${splitString[0]}.${splitString[1]}.yml`)
}
export const keyPath = join(configRoot, 'keys')
export const pwdConfigFilePath = join(configRoot, 'config.pwd.yml')
