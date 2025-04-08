import { Hono } from '@hono/hono'
import { getInventoryPath } from '@cmn/constants/path.ts'
import { parse } from '@std/yaml'
import type { InventoryTestnetValidatorType } from '@cmn/types/config.ts'
import { VERSIONS_PATH } from '@cmn/constants/path.ts'
import type { CmnType } from '@cmn/types/config.ts'
import { inventoryRouter } from '/src/validator/api/route/inventory/index.ts'

export type CustomContext = {}

const app = new Hono<{
  Variables: CustomContext
}>()

app.use('*', async (c, next) => {
  try {
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    c.header('Access-Control-Max-Age', '86400')
    if (c.req.method === 'OPTIONS') {
      return c.text('OK', 200)
    }
    await next()
  } catch (error) {
    console.error('Error in middleware:', error)
    return c.text('Internal Server Error', 500)
  }
})

app.route('/inventory', inventoryRouter)

export { app }
