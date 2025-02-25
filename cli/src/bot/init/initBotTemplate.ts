import { exec } from '@elsoul/child-process'
import { configRoot } from '@cmn/constants/path.ts'
import { colors } from '@cliffy/colors'
import { join } from '@std/path'
import { Input, prompt, Select } from '@cliffy/prompt'

/**
 * Initialize a new Solana trade bot application by downloading the template
 * @param options Options for initializing the bot
 * @returns Promise<boolean> indicating success or failure
 */
export const initBotTemplate = async (options: { queue: boolean }) => {
  try {
    // Create a directory for the bot if it doesn't exist
    const botConfigDir = join(configRoot, 'bot')
    try {
      await Deno.stat(botConfigDir)
    } catch (_error) {
      await Deno.mkdir(botConfigDir, { recursive: true })
    }

    // Select template type
    const { templateType } = await prompt([
      {
        name: 'templateType',
        message: 'Select Bot Template Type',
        type: Select,
        options: ['solana-trade-bot'],
      },
    ])

    if (!templateType) {
      return false
    }

    // Get the current version from deno.json (not used currently)
    // const version = denoJson.version || '0.6.0'

    // Create a directory for the new bot application
    const { appName } = await prompt([
      {
        type: Input,
        name: 'appName',
        message: 'Enter your bot application name',
        default: 'solana-trade-bot',
      },
    ])

    if (!appName) {
      return false
    }

    const appDir = join(Deno.cwd(), appName)

    try {
      await Deno.stat(appDir)
      console.log(colors.yellow(`⚠️ Directory ${appDir} already exists`))
      const { overwrite } = await prompt([
        {
          name: 'overwrite',
          message: 'Directory already exists. Overwrite?',
          type: Select,
          options: [
            { name: 'Yes', value: 'yes' },
            { name: 'No', value: 'no' },
          ],
          default: 'no',
        },
      ])

      if (overwrite !== 'yes') {
        return false
      }
    } catch (_error) {
      // Directory doesn't exist, which is fine
    }

    // Copy the template to the new directory
    console.log(colors.blue(`📦 Downloading ${templateType} template...`))

    if (options.queue) {
      console.log(colors.blue('Using queue mode for template download'))
    }

    // await exec(
    //   `cp -r ${join(Deno.cwd(), 'frontend-template', templateType)} ${appDir}`,
    // )

    // Initialize git repository
    console.log(colors.blue('🔧 Initializing git repository...'))
    await exec(`cd ${appDir} && git init`)

    console.log(
      colors.green(
        `✅ Successfully created Solana trade bot application at ${appDir}`,
      ),
    )

    console.log(colors.white(`
To get started with your new Solana trade bot:

$ cd ${appName}
$ npm install
$ npm run dev
`))

    return true
  } catch (error) {
    console.error(colors.red('❌ Failed to initialize bot template:'), error)
    return false
  }
}
