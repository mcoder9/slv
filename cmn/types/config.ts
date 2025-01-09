export type KeyDirType = 'rpc' | 'validator' | 'relayer' | 'shreadstream'

export type NetworkType = 'mainnet' | 'testnet'
export type RpcType = 'minimal' | 'geyser-yellowstone'
export type ValidatorTestnetType = 'firedancer'

export interface HostData {
  ansible_user: string
  ansible_host: string
  ansible_ssh_private_key_file: string
  name: string
  identity_account: string
}

export interface GroupData {
  hosts: Record<string, HostData>
}

export type Inventory = Record<string, GroupData>

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
