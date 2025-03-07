import { colors } from 'https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/colors.ts'

const blue = 0x0000FF
const red = 0xFF0000
const green = 0x00FF00
const white = 0xFFFFFF

export const slvAA = () => {
  const row1 = colors.rgb24('      _       ', blue)
  const row2 = colors.rgb24('     | |      ', blue)
  const row3 = colors.rgb24(' ___ | |', blue) +
    colors.rgb24('_    __ ', red)
  const row4 = colors.rgb24('/ __|| |', blue) +
    colors.rgb24('\\ \\ / /', red)
  const row5 = colors.rgb24('\\__ \\| |', blue) +
    colors.rgb24(' \\ V / ', red)
  const row6 = colors.rgb24('|___/|_|', blue) +
    colors.rgb24('  \\_/  ', red)

  console.log(`\n${row1}`)
  console.log(`${row2}`)
  console.log(`${row3}`)
  console.log(`${row4}`)
  console.log(`${row5}`)
  console.log(`${row6}\n`)
}

export const installClientMessage = (version: string) => {
  const msg = colors.rgb24(`🔥 Welcome to Solana Validator Tool slv 🔥`, blue)
  const msg2 = `
SLV is a Toolkit for Solana Developers 🪄

${
    colors.yellow(
      '🚀 SLV BareMetal: High-Performance Servers Built for Solana Nodes.',
    )
  }

${colors.green('$ slv metal')}

${colors.bold.underline('One-line Launch:')}

$ slv validator init
$ slv validator deploy -n testnet

$ slv --help for more information
`
  console.log('slv version:', colors.rgb24(version, green))
  console.log(msg)
  console.log(colors.rgb24(msg2, white))
}
