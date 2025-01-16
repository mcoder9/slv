import { exec } from '@elsoul/child-process'
import { colors } from '@cliffy/colors'

const encryptPassword = async (password: string): Promise<string> => {
  try {
    const process = await exec(
      `openssl passwd -6 ${password}`,
    )
    return process.message
  } catch (_error) {
    const errorMessage =
      `⚠️ Please install openssl (MacOS: brew install openssl)
brew install openssl
brew --prefix openssl
echo 'export PATH="{openssl path}"' >> ~/.zshrc`
    console.error(colors.yellow(errorMessage))
    return ''
  }
}

export { encryptPassword }
