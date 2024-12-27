import { exec } from '@elsoul/child-process'

const encryptPassword = async (password: string): Promise<string> => {
  const process = await exec(
    `openssl passwd -6 ${password}`,
  )
  return process.message
}

export { encryptPassword }
