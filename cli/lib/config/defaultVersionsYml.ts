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
      version_agave: VERSION_SOLANA_MAINNET,
      version_jito: VERSION_SOLANA_MAINNET,
      allowed_ssh_ips: [],
      allowed_ips: [],
    },
    testnet_validators: {
      solana_cli: 'agave',
      version_agave: VERSION_SOLANA_TESTNET,
      version_firedancer: VERSION_FIREDANCER_TESTNET,
      allowed_ssh_ips: [],
    },
    mainnet_rpcs: {
      solana_cli: 'agave',
      version_agave: VERSION_SOLANA_MAINNET,
      version_jito: VERSION_SOLANA_MAINNET,
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
  version_agave: ${defaultVersions.mainnet_validators.version_agave}
  version_jito: ${defaultVersions.mainnet_validators.version_jito}
  allowed_ssh_ips:
    - '1.1.1.1'
  allowed_ips:
    - '1.1.1.1'

testnet_validators:
  solana_cli: ${defaultVersions.testnet_validators.solana_cli}
  version_agave: ${defaultVersions.testnet_validators.version_agave}
  version_firedancer: ${defaultVersions.testnet_validators.version_firedancer}
  allowed_ssh_ips:
    - '1.1.1.1'

mainnet_rpcs:
  solana_cli: ${defaultVersions.mainnet_rpcs.solana_cli}
  version_agave: ${defaultVersions.mainnet_rpcs.version_agave}
  version_jito: ${defaultVersions.mainnet_rpcs.version_jito}
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
