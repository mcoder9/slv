import { setPassword } from '@cmn/prompt/setPassword.ts'
import { pwdConfigFilePath } from '@cmn/constants/path.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/mod.ts'
import { encryptPassword } from '/lib/encryptPassword.ts'
import { colors } from '@cliffy/colors'

const genPasswordYml = async () => {
  try {
    // Check if password exists
    await Deno.stat(pwdConfigFilePath)
    console.log(colors.green(`✔︎ Password already exists.Skipping...`))
  } catch (_error) {
    let solvPwd = await setPassword()
    while (!solvPwd) {
      solvPwd = await setPassword()
    }
    const encryptedPwd = await encryptPassword(solvPwd)
    const yamlPwdContent = stringify({
      encrypted_password: encryptedPwd,
    })
    await Deno.writeTextFile(pwdConfigFilePath, yamlPwdContent)
    console.log(
      colors.green(`✔︎ Password saved to ${pwdConfigFilePath}`),
    )
  }
}

export { genPasswordYml }
