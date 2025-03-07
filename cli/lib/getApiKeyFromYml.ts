import { parse } from 'https://deno.land/std@0.202.0/yaml/parse.ts'
import { defaultApiKeyYml } from '/lib/config/defaultApiKeyYml.ts'
import { DISCORD_LINK } from '@cmn/constants/url.ts'
import { colors } from '@cliffy/colors'

const getApiKeyFromYml = async () => {
  const home = Deno.env.get('HOME')
  if (!home) {
    console.log(colors.red('⚠️ HOME environment variable not found'))
    Deno.exit(1)
  }
  const inventoryPath = home + '/.slv/api.yml'
  try {
    await Deno.stat(inventoryPath)
  } catch (_error) {
    await Deno.writeTextFile(
      inventoryPath,
      defaultApiKeyYml(),
    )
  }
  const inventory = await Deno.readTextFile(inventoryPath)
  const inventoryData = JSON.parse(
    JSON.stringify(parse(inventory)),
  ) as { slv: { api_key: string } }
  const apiKey = inventoryData.slv.api_key
  if (!apiKey || !isValidApiKey(apiKey)) {
    const text = `API key not found in ${inventoryPath}
⚠️ Please Add Your API key with the following command:

$ slv login

👉 You can get Free API Key from ValidatorsDAO Discord Channel
🔗 ValidatorsDAO Discord: ${DISCORD_LINK}`
    console.log(colors.white(text))
    Deno.exit(1)
  }
  return apiKey
}

/**
 * Check UUID v4
 * @param apiKey
 * @returns boolean
 */
export const isValidApiKey = (apiKey: string): boolean => {
  // UUID v4 pattern
  const uuidV4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  return uuidV4Pattern.test(apiKey)
}
export { getApiKeyFromYml }
