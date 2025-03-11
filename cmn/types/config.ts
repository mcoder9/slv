export type KeyDirType = 'rpc' | 'validator' | 'relayer' | 'shreadstream'

export type NetworkType = 'mainnet' | 'testnet'
export type RpcType = 'minimal' | 'geyser-yellowstone'
export type ValidatorTestnetType = 'firedancer' | 'agave'
export type ValidatorMainnetType = 'jito'
export type InventoryType = 'testnet_validators' | 'mainnet_validators'

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

export interface MainnetData {
  hosts: Record<string, ValidatorMainnetConfig>
}

export type Inventory = Record<InventoryType, GroupData>
export type InventoryMainnet = Record<'mainnet_validators', MainnetData>

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

export interface CmnType {
  mainnet_validators: CmnMainnetValidatorType
  testnet_validators: CmnTestnetValidatorType
  mainnet_rpcs: CmnMainnetRpcType
}

export interface CmnTestnetValidatorType {
  solana_cli: string
  solana_version: string
  validator_type: ValidatorTestnetType
  version: string
}

export interface CmnMainnetValidatorType {
  solana_cli: string
  solana_version: string
  validator_type: ValidatorMainnetType
  version: string
  allowed_ssh_ips: string[]
  allowed_ips: string[]
}

export interface CmnMainnetRpcType {
  solana_cli: string
  solana_version: string
  rpc_type: RpcType
  version: string
  geyser_version: string
  x_token: string
  port_rpc: number
  port_grpc: number
  port_jupiter: number
  allowed_ssh_ips: string[]
  allowed_ips: string[]
}

export interface ValidatorMainnetConfig {
  name: string
  ansible_user: string
  ansible_host: string
  ansible_ssh_private_key_file: string
  identity_account: string
  vote_account: string
  authority_account: string
  relayer_account: string
  username: string
  ip: string
  validator_type: ValidatorMainnetType
  port_rpc: number
  relayer_url: string
  block_engine_region: string
  shredstream_address: string
  shredstream_desired_regions: string
  limit_ledger_size: number
  staked_rpc_identity_account: string
  staked_rpc_amount: number
  snapshot_url: string
}



export interface ValidatorTestnetConfig {
  name: string
  ansible_user: string
  ansible_host: string
  ansible_ssh_private_key_file: string
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
