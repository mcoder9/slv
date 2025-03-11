import { spawnSync } from '@elsoul/child-process'
import { getInventoryPath } from '@cmn/constants/path.ts'
import type { InventoryType } from '@cmn/types/config.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'

const switchValidator = async (
  inventoryType: InventoryType,
  from: string,
  to: string,
): Promise<boolean> => {
  const inventoryPath = getInventoryPath(inventoryType)
  const templateRoot = getTemplatePath()
  const filePath =
    `${templateRoot}/ansible/testnet-validator/nodowntime_migrate.yml`
  const cmd =
    `ansible-playbook -i ${inventoryPath} ${filePath} -e source_host=${from} -e target_host=${to}`
  const result = await spawnSync(cmd)
  return result.success
}

export { switchValidator }
