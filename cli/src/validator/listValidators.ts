import { colors } from '@cliffy/colors'
import { Row, Table } from '@cliffy/table'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import type { NetworkType } from '@cmn/types/config.ts'

const listValidators = async (network: NetworkType, pubkey?: string) => {
  const inventoryType = network === 'mainnet'
    ? 'mainnet_validators'
    : 'testnet_validators'
  const inventory = await genOrReadInventory(inventoryType)
  const header = [
    'Identity Key',
    'Vote Key',
    'Authority Key',
    'IP',
    'Validator Type',
    'Version',
  ]
  console.log(colors.white('Your Testnet Validators Settings:'))
  if (!inventory.testnet_validators || !inventory.testnet_validators.hosts) {
    console.log(colors.yellow('⚠️ No validators found\n\n $ slv v init'))
    return
  }
  let validators = Object.values(inventory.testnet_validators.hosts)
  if (!validators) {
    console.log(colors.yellow('⚠️ No validators found\n\n $ slv v init'))
    return
  }
  if (pubkey) {
    const validator = validators.find((v) => v.identity_account === pubkey)
    if (!validator) {
      console.log(colors.yellow('⚠️ Validator not found'))
      return
    }
    validators = [validator]
  }
  for (const validator of validators) {
    const table = new Table()
    table
      .body([
        new Row(
          colors.blue(header[0]),
          colors.white(validator.identity_account),
        )
          .border(
            true,
          ),
        new Row(
          colors.blue(header[1]),
          colors.white(validator.vote_account),
        )
          .border(true),
        new Row(
          colors.blue(header[2]),
          colors.white(validator.authority_account),
        )
          .border(true),
        new Row(
          colors.blue(header[3]),
          colors.white(validator.ansible_host),
        )
          .border(true),
        new Row(
          colors.blue(header[4]),
          colors.white(validator.validator_type),
        )
          .border(true),
        new Row(
          colors.blue(header[5]),
          colors.white(validator.version),
        ).border(
          true,
        ),
      ])
    table.render()
  }
}

export { listValidators }
