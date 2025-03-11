import type { CmnType } from '@cmn/types/config.ts'
import {
  VERSION_FIREDANCER_TESTNET,
  VERSION_SOLANA_MAINNET,
  VERSION_SOLANA_TESTNET,
} from '@cmn/constants/version.ts'

const defaultVersionsYml = (): string => {
  const defaultVersions: CmnType = {
    mainnet_validators: {
      solana_cli: 'agave',
      solana_version: VERSION_SOLANA_MAINNET,
      validator_type: 'jito',
      version: VERSION_SOLANA_MAINNET,
      allowed_ssh_ips: [],
      allowed_ips: [],
    },
    testnet_validators: {
      solana_cli: 'agave',
      solana_version: VERSION_SOLANA_TESTNET,
      validator_type: 'firedancer',
      version: VERSION_FIREDANCER_TESTNET,
    },
    mainnet_rpcs: {
      solana_cli: 'agave',
      solana_version: VERSION_SOLANA_MAINNET,
      rpc_type: 'minimal',
      version: VERSION_SOLANA_MAINNET,
      geyser_version: '0.1.0',
      x_token: '',
      port_rpc: 8899,
      port_grpc: 10000,
      port_jupiter: 8080,
      allowed_ssh_ips: [],
      allowed_ips: [],
    },
  }

  return `mainnet_validators:
  solana_cli: ${defaultVersions.mainnet_validators.solana_cli}
  solana_version: ${defaultVersions.mainnet_validators.solana_version}
  validator_type: ${defaultVersions.mainnet_validators.validator_type}
  version: ${defaultVersions.mainnet_validators.version}
  allowed_ssh_ips:
    - '1.1.1.1'
  allowed_ips:
    - '1.1.1.1'

testnet_validators:
  solana_cli: ${defaultVersions.testnet_validators.solana_cli}
  solana_version: ${defaultVersions.testnet_validators.solana_version}
  validator_type: ${defaultVersions.testnet_validators.validator_type}
  version: ${defaultVersions.testnet_validators.version}

mainnet_rpcs:
  solana_cli: ${defaultVersions.mainnet_rpcs.solana_cli}
  solana_version: ${defaultVersions.mainnet_rpcs.solana_version}
  rpc_type: ${defaultVersions.mainnet_rpcs.rpc_type}
  version: ${defaultVersions.mainnet_rpcs.version}
  geyser_version: ${defaultVersions.mainnet_rpcs.geyser_version}
  x_token: ""
  port_rpc: ${defaultVersions.mainnet_rpcs.port_rpc}
  port_grpc: ${defaultVersions.mainnet_rpcs.port_grpc}
  port_jupiter: ${defaultVersions.mainnet_rpcs.port_jupiter}
  allowed_ssh_ips:
    - '1.1.1.1'
  allowed_ips:
    - '1.1.1.1'`
}

export { defaultVersionsYml }
