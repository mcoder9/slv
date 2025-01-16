import { runAnsilbe } from '/lib/runAnsible.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'
import { colors } from '@cliffy/colors'
import type { InventoryType } from '@cmn/types/config.ts'

const copyKeys = async (
  inventoryType: InventoryType,
  identityAccount: string,
) => {
  const templateRoot = getTemplatePath()
  const createUserYml =
    `${templateRoot}/ansible/testnet-validator/copy_keys.yml`
  const result = await runAnsilbe(createUserYml, inventoryType, identityAccount)
  if (result) {
    console.log(colors.white('🔑 Keys copied successfully'))
  }
}

export { copyKeys }
