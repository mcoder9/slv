import { readValidatorTestnetConfig } from '/lib/readConfig.ts'
import { colors } from '@cliffy/colors'
import { Row, Table } from '@cliffy/table'
const listValidators = async () => {
  const testnetValidatorConfig = await readValidatorTestnetConfig()
  const header = [
    'Identity Key',
    'Vote Key',
    'Authority Key',
    'IP',
    'Validator Type',
    'Version',
  ]
  console.log(colors.white('Your Testnet Validators Settings:'))
  for (const validator of testnetValidatorConfig.validators) {
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
          colors.white(validator.ip),
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
