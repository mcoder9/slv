import { colors } from '@cliffy/colors'
import { Row, Table } from '@cliffy/table'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import type { NetworkType, RpcConfig } from '@cmn/types/config.ts'
import { genOrReadVersions } from '/lib/genOrReadVersions.ts'

const listRPCs = async (network: NetworkType, identityKey?: string) => {
  // Currently only mainnet RPCs are supported
  if (network !== 'mainnet') {
    console.log(colors.yellow('⚠️ Only mainnet RPCs are supported'))
    return
  }

  const inventoryType = 'mainnet_rpcs'
  const inventory = await genOrReadInventory(inventoryType)
  const header = [
    'Identity Key',
    'Name',
    'IP',
    'Region',
    'RPC Type',
    'Version',
  ]

  console.log(colors.white('Your Mainnet RPC Nodes Settings:'))

  if (!inventory.mainnet_rpcs || !inventory.mainnet_rpcs.hosts) {
    console.log(colors.yellow('⚠️ No RPC nodes found\n\n $ slv rpc init'))
    return
  }

  let rpcs = Object.values(inventory.mainnet_rpcs.hosts) as RpcConfig[]

  if (!rpcs || rpcs.length === 0) {
    console.log(colors.yellow('⚠️ No RPC nodes found\n\n $ slv rpc init'))
    return
  }

  if (identityKey) {
    const rpc = inventory.mainnet_rpcs.hosts[identityKey]
    if (!rpc) {
      console.log(colors.yellow('⚠️ RPC node not found'))
      return
    }
    rpcs = [rpc]
  }

  const version = await genOrReadVersions()
  const rpcVersion = version.mainnet_rpcs.version_jito

  for (const rpc of rpcs) {
    const table = new Table()
    table
      .body([
        new Row(
          colors.blue(header[0]),
          colors.white(rpc.identity_account),
        )
          .border(true),
        new Row(
          colors.blue(header[1]),
          colors.white(rpc.name),
        )
          .border(true),
        new Row(
          colors.blue(header[2]),
          colors.white(rpc.ansible_host),
        )
          .border(true),
        new Row(
          colors.blue(header[3]),
          colors.white(rpc.region),
        )
          .border(true),
        new Row(
          colors.blue(header[4]),
          colors.white(rpc.rpc_type),
        )
          .border(true),
        new Row(
          colors.blue(header[5]),
          colors.white(rpcVersion),
        )
          .border(true),
      ])
    table.render()
  }
  return rpcs
}

export { listRPCs }
