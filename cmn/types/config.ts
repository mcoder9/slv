export type KeyDirType = 'rpc' | 'validator' | 'relayer' | 'shreadstream'

export type NetworkType = 'mainnet' | 'testnet'
export type RpcType = 'minimal' | 'geyser-yellowstone'
export type ValidatorTestnetType = 'firedancer' | 'agave'
export type InventoryType = 'testnet_validators' | 'mainnet_validators'

export const DEFAULT_SOLANA_CLI = 'agave'
export const DEFAULT_SOLANA_VERSION = '2.1.14'
export const DEFAULT_FIREDANCER_VERSION = '0.402.20113'
export const DEFAULT_VALIDATOR_TYPE = 'firedancer'

export interface HostData {
  ansible_user: string
  ansible_host: string
  ansible_ssh_private_key_file: string
  name: string
  identity_account: string
  vote_account: string
  authority_account: string
  solana_cli: string
  solana_version: string
  validator_type: string
  version: string
}

export interface GroupData {
  hosts: Record<string, HostData>
}

export type Inventory = Record<InventoryType, GroupData>

export interface RpcConfig {
  identity_account: string
  username: string
  ip: string
  rsa_key_path: string
  solana_cli: string
  solana_version: string
  rpc_type: RpcType
  jupiter: boolean
  port_rpc: number
  port_grpc: number | null
  port_jupiter: number | null
  x_token: string | null
}

export interface ValidatorTestnetConfig {
  identity_account: string
  vote_account: string
  authority_account: string
  username: string
  ip: string
  rsa_key_path: string
  solana_cli: string
  solana_version: string
  validator_type: ValidatorTestnetType
  version: string
}
