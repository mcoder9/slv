import { colors } from '@cliffy/colors'
import { Row, Table } from '@cliffy/table'
import { genOrReadInventory } from '/lib/genOrReadInventory.ts'
import type { NetworkType } from '@cmn/types/config.ts'
const listValidators = async (network: NetworkType) => {
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
  for (const validator of Object.values(inventory.testnet_validators.hosts)) {
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
