import type { InventoryType } from '@cmn/types/config.ts'
import { getInventoryPath } from '@cmn/constants/path.ts'
import { spawnSync } from '@elsoul/child-process'

const runAnsilbe = async (
  filePath: string,
  inventoryType: InventoryType,
  limit?: string, // Identity account
  debug?: boolean,
) => {
  if (!limit) {
    limit = inventoryType
  }
  const inventoryPath = getInventoryPath(inventoryType)
  let cmd = `ansible-playbook -i ${inventoryPath} ${filePath} --limit ${limit}`
  if (debug) {
    cmd += ' -vvv'
  }
  const result = await spawnSync(cmd)
  if (!result.success) {
    console.error(
      '❌ Failed to run ansible. Please check the logs.\n add --debug flag to see more details',
    )
    return false
  }
  console.log('✔︎ Success')
  return true
}

export { runAnsilbe }
