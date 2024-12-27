import { join } from '@std/path'

export const homeDir = Deno.env.get('HOME')
export const configRoot = homeDir
  ? join(homeDir, '.slv')
  : join(Deno.cwd(), '.slv')

export const testnetValidatorConfigDir = join(configRoot, 'testnet-validator')

export const inventoryPath = join(configRoot, 'inventory.yml')
export const keyPath = join(configRoot, 'keys')
export const validatorTestnetConfigFilePath = join(
  configRoot,
  'config.validator.testnet.yml',
)
export const rpcConfigFilePath = join(configRoot, 'config.rpc.yml')
export const pwdConfigFilePath = join(configRoot, 'config.pwd.yml')
