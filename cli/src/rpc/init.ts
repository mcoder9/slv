import { Confirm, Input, Number, prompt, Select } from '@cliffy/prompt'
import { RPC_TYPE } from '@cmn/constants/rpc.ts'
import { colors } from '@cliffy/colors'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/mod.ts'
import { rpcConfigFilePath } from '@cmn/constants/path.ts'
import type { RpcConfig, RpcType } from '@cmn/types/config.ts'
import { genPasswordYml } from '/lib/genPasswordYml.ts'
import { genIdentityKey } from '/src/validator/init/genIdentityKey.ts'
import { checkSSHConnection } from '@cmn/prompt/checkSshConnection.ts'
import { VERSION_SOLANA_MAINNET } from '@cmn/constants/version.ts'

const init = async () => {
  const identity_account = await genIdentityKey()

  const result = await checkSSHConnection()
  if (!result) {
    console.error(colors.red('❌ SSH connection failed'))
    return
  }

  // Set solv password
  await genPasswordYml()
  const rpcTypes = await prompt([
    {
      name: 'solana_cli',
      message: 'Select Solana CLI',
      type: Select,
      options: ['agave', 'jito'],
      default: 'agave',
    },
    {
      name: 'port_rpc',
      message: 'Select Solana RPC port',
      type: Number,
      default: 8899,
    },
    {
      name: 'rpc_type',
      message: 'Select an RPC type',
      type: Select,
      options: RPC_TYPE,
      after: async ({ rpc_type }, next) => {
        if (rpc_type === 'geyser-yellowstone') {
          await next()
        }
      },
    },
    {
      name: 'port_grpc',
      message: 'Select Solana gRPC port',
      type: Number,
      default: 10000,
    },
    {
      name: 'x_token',
      message: 'Please enter your x_token',
      type: Input,
    },
    {
      name: 'jupiter',
      message: 'Do you want Jupiter API also?',
      type: Confirm,
      default: true,
      after: async ({ jupiter }, next) => {
        if (jupiter) {
          await next()
        }
      },
    },
    {
      name: 'port_jupiter',
      message: 'Select Jupiter API port',
      type: Number,
      default: 2000,
    },
  ])

  const rpcConfig: RpcConfig = {
    identity_account: identity_account,
    username: result.username || '',
    ip: result.ip || '',
    rsa_key_path: result.rsa_key_path || '',
    solana_cli: rpcTypes.solana_cli || '',
    solana_version: VERSION_SOLANA_MAINNET,
    rpc_type: rpcTypes.rpc_type as RpcType,
    jupiter: rpcTypes.jupiter || false,
    port_rpc: rpcTypes.port_rpc || 8899,
    port_grpc: rpcTypes.port_grpc ?? null,
    port_jupiter: rpcTypes.port_jupiter ?? null,
    x_token: rpcTypes.x_token ?? null,
  }

  colors.green('✔︎ RPC configuration completed')
  const rpcs: RpcConfig[] = []
  rpcs.push(rpcConfig)
  console.log(rpcConfig)

  // Save to YAML file
  const yamlContent = stringify({ rpcs })
  await Deno.writeTextFile(rpcConfigFilePath, yamlContent)
  console.log(
    colors.green(`✔︎ Configuration saved to ${rpcConfigFilePath}`),
  )

  return rpcConfig
}

export { init }
