import type { ValidatorTestnetConfig } from '@cmn/types/config.ts'

const checkIdentityKeyExist = (
  identityKey: string,
  config: ValidatorTestnetConfig[],
) => {
  try {
    return config.find((item) => item.identity_account === identityKey)
  } catch (_error) {
    return false
  }
}

export { checkIdentityKeyExist }
