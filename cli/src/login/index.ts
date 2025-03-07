import { Command } from '@cliffy'
import { prompt, Secret } from '@cliffy/prompt'
import { colors } from '@cliffy/colors'
import { DISCORD_LINK } from '@cmn/constants/url.ts'

export const loginCmd = new Command()
  .description('Login to SLV using Discord')
  .action(async () => {
    const loginTxt = `⚡️ SLV Login to unlock full features ⚡️\n`
    console.log(colors.bold.blue(loginTxt))
    console.log(
      colors.white(
        `👉 You can get Free API Key from ValidatorsDAO Discord Channel
🔗 ValidatorsDAO Discord: ${DISCORD_LINK}\n`,
      ),
    )
    const { apiKey } = await prompt([{
      name: 'apiKey',
      message: '🔑 Enter API Key',
      type: Secret,
    }])
    const home = Deno.env.get('HOME')
    if (!home) {
      console.log(colors.red('⚠️ HOME environment variable not found'))
      Deno.exit(1)
    }
    const inventoryPath = home + '/.slv/api.yml'
    try {
      await Deno.stat(inventoryPath)
      await Deno.writeTextFile(
        inventoryPath,
        `slv:
  api_key: ${apiKey}`,
      )
    } catch (_error) {
      await Deno.writeTextFile(
        inventoryPath,
        `slv:
  api_key: ${apiKey}`,
      )
    }
    console.log(
      colors.green('\n✔️ API Key Successfully Saved to ~/.slv/api.yml\n'),
    )
    console.log(colors.white(`🚀 Full Features Unlocked\n`))
    console.log(colors.blue(`👉 $ slv metal list\n`))
  })
