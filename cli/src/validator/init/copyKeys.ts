import { runAnsilbe } from '/lib/runAnsible.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'
import { colors } from '@cliffy/colors'

const copyKeys = async (limit: string) => {
  const templateRoot = getTemplatePath()
  const createUserYml =
    `${templateRoot}/ansible/testnet-validator/copy_keys.yml`
  const result = await runAnsilbe(createUserYml, limit)
  if (result) {
    console.log(colors.white('🔑 Keys copied successfully'))
  }
}

export { copyKeys }
