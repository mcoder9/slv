import { validatorTestnetConfigFilePath } from '@cmn/constants/path.ts'
import type { ValidatorTestnetConfig } from '@cmn/types/config.ts'
import { parse } from 'https://deno.land/std@0.202.0/yaml/parse.ts'
import { colors } from '@cliffy/colors'

const readValidatorTestnetConfig = async () => {
  try {
    await Deno.stat(validatorTestnetConfigFilePath)
  } catch (_error) {
    console.log(colors.yellow('⚠️ Please run `slv validator init` first'))
    throw new Error('Testnet Validator config not found')
  }
  const config = await Deno.readTextFile(validatorTestnetConfigFilePath)
  const configData = JSON.parse(
    JSON.stringify(parse(config)),
  ) as { validators: ValidatorTestnetConfig[] }
  return configData
}

export { readValidatorTestnetConfig }
