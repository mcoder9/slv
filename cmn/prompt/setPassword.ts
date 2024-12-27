import { prompt, Secret } from '@cliffy/prompt'
import { colors } from '@cliffy/colors'

export const setPassword = async () => {
  const { password, confirmPwd } = await prompt([
    {
      name: 'password',
      message: 'Please enter your password',
      type: Secret,
      validate: (value) => {
        if (
          value.length < 8 ||
          !/[A-Z]/.test(value) ||
          !/[a-z]/.test(value) ||
          !/[^A-Za-z0-9]/.test(value)
        ) {
          return 'Password must be at least 8 characters long, and include uppercase, lowercase, and a special character.'
        }
        return true
      },
    },
    {
      name: 'confirmPwd',
      message: 'Please confirm your password',
      type: Secret,
    },
  ])
  if (password !== confirmPwd) {
    console.error(colors.yellow('⚠️ Passwords do not match'))
    return
  }
  return password
}
