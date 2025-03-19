import { spawnSync } from '@elsoul/child-process'
import { getInventoryPath } from '@cmn/constants/path.ts'
import type { InventoryType } from '@cmn/types/config.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'
import { swapValidatorHosts } from '/lib/swapValidatorHosts.ts'

const switchValidator = async (
  inventoryType: InventoryType,
  from: string,
  to: string,
): Promise<boolean> => {
  const inventoryPath = getInventoryPath(inventoryType)
  const templateRoot = getTemplatePath()
  const networkPath = inventoryType === 'mainnet_validators'
    ? 'mainnet-validator'
    : 'testnet-validator'
  const filePath =
    `${templateRoot}/ansible/${networkPath}/nodowntime_migrate.yml`
  const cmd =
    `ansible-playbook -i ${inventoryPath} ${filePath} -e source_host=${from} -e target_host=${to}`

  // Run the Ansible playbook to perform the switch
  const result = await spawnSync(cmd)

  if (!result.success) {
    console.error('Failed to run Ansible playbook for validator switch')
    return false
  }

  // Swap the hosts in the inventory file
  const swapResult = await swapValidatorHosts(inventoryType, from, to)

  if (!swapResult) {
    console.error('Failed to swap validator hosts in inventory file')
    return false
  }

  return true
}

export { switchValidator }
