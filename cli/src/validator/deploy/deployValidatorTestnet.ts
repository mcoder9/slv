import { runAnsilbe } from '/lib/runAnsible.ts'
import { getTemplatePath } from '/lib/getTemplatePath.ts'
import { Confirm, prompt } from '@cliffy/prompt'
import { colors } from '@cliffy/colors'
import rpcLog from '/lib/config/rpcLog.ts'
import { listValidators } from '/src/validator/listValidators.ts'

const deployValidatorTestnet = async () => {
  const inventoryType = 'testnet_validators'
  const templateRoot = getTemplatePath()
  await listValidators('testnet')
  const confirm = await prompt([{
    type: Confirm,
    name: 'continue',
    message: 'Do you want to continue?',
    default: true,
  }])
  if (!confirm.continue) {
    console.log(colors.blue('Cancelled...🌝'))
    return false
  }
  const updateUbuntuYml = `${templateRoot}/ansible/cmn/update_ubuntu.yml`
  try {
    await runAnsilbe(updateUbuntuYml, inventoryType)
  } catch (_error) {
    console.log('Failed to update ubuntu. Skipping...')
  }
  const createUserYml = `${templateRoot}/ansible/testnet-validator/init.yml`
  const result = await runAnsilbe(createUserYml, inventoryType)
  if (result) {
    console.log('Successfully deployed validator on testnet')
    rpcLog()
    return true
  }
  console.log('Failed to deploy validator on testnet')
  return false
}

export { deployValidatorTestnet }
