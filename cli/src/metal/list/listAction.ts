import { prompt, Select } from '@cliffy/prompt'
const listAction = async () => {
  const { bareMetalType } = await prompt([
    {
      name: 'bareMetalType',
      message: 'Select Bare Metal Type',
      type: Select,
      options: [
        '📦 APP - For Trade Bot, DApp..etc',
        '⚡️ RPC - For Solana RPC Node',
        '💰 For Solana Mainnet Validator',
        '🧪 For Solana Testnet Validator',
      ],
      default: 'validator',
    },
  ])
  return true
}

export { listAction }
