import { runAnsilbe } from '/lib/runAnsible.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'
import { updateInventoryUser } from '/lib/updateInventoryUser.ts'

const genSolvUser = async (ip: string, limit: string) => {
  const templateRoot = getTemplatePath()
  const createUserYml = `${templateRoot}/ansible/cmn/create_user.yml`
  const result = await runAnsilbe(createUserYml, limit)
  if (result) {
    // Update inventory.yml user 'ubuntu' to 'solv'
    await updateInventoryUser(ip)
  }
}

export { genSolvUser }
