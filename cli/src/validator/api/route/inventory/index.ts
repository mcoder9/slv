import { Hono } from '@hono/hono'
import { getInventoryPath } from '@cmn/constants/path.ts'
import { parse } from '@std/yaml'
import type {
  InventoryMainnet,
  InventoryRPC,
  InventoryTestnetValidatorType,
  RpcConfig,
} from '@cmn/types/config.ts'
import { API_KEY_YML_PATH, VERSIONS_PATH } from '@cmn/constants/path.ts'
import type { CmnType } from '@cmn/types/config.ts'
import type { CustomContext } from '/src/validator/api/index.ts'

const inventoryRouter = new Hono<{
  Variables: CustomContext
}>()

inventoryRouter.get('/versions', async (c) => {
  try {
    const versionData = await Deno.readTextFile(VERSIONS_PATH)
    const versions = parse(versionData) as CmnType
    return c.json({
      success: true,
      versions,
    })
  } catch (error) {
    console.error('Error reading versions file:', error)
    return c.json({
      success: false,
      message: 'Error reading versions file',
    })
  }
})

inventoryRouter.get('/testnet-validators', async (c) => {
  const inventoryTestnetValidatorPath = getInventoryPath('testnet_validators')
  const inventoryYml = await Deno.readTextFile(inventoryTestnetValidatorPath)
  const inventory = parse(inventoryYml) as InventoryTestnetValidatorType
  const message = inventory.testnet_validators.hosts
  return c.json({
    success: true,
    message,
  })
})

inventoryRouter.get('/mainnet-validators', async (c) => {
  const inventoryMainnetValidatorPath = getInventoryPath('mainnet_validators')
  const inventoryYml = await Deno.readTextFile(inventoryMainnetValidatorPath)
  const inventory = parse(inventoryYml) as InventoryMainnet
  const message = inventory.mainnet_validators.hosts
  return c.json({
    success: true,
    message,
  })
})

inventoryRouter.get('/mainnet-rpcs', async (c) => {
  const inventoryMainnetRPCPath = getInventoryPath('mainnet_rpcs')
  const inventoryYml = await Deno.readTextFile(inventoryMainnetRPCPath)
  const inventory = parse(inventoryYml) as InventoryRPC
  const message = inventory.mainnet_rpcs.hosts as Record<string, RpcConfig>
  return c.json({
    success: true,
    message,
  })
})

inventoryRouter.get('/api-key', async (c) => {
  const apiKeyYml = await Deno.readTextFile(API_KEY_YML_PATH)
  const apiKey = parse(apiKeyYml) as {
    slv: {
      api_key: string
    }
  }
  let success = false
  if (apiKey.slv.api_key) {
    success = true
  }
  if (!success) {
    return c.json({
      success: false,
      message: 'API key not found',
    })
  }
  const message = apiKey.slv.api_key
  return c.json({
    success,
    message,
  })
})

export { inventoryRouter }
