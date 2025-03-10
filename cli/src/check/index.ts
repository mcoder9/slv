import { Command } from '@cliffy'
import { Input } from '@cliffy/prompt'
import { colors } from '@cliffy/colors'
import { exec } from '@elsoul/child-process'
import { join } from '@std/path'

// Define the path for the scripts
const userBinDir = join(Deno.env.get('HOME') || '', '.slv', 'bin')

// check Command
export const checkCmd = new Command()
  .description('Check RPC and gRPC endpoints')
  .action(() => {
    checkCmd.showHelp()
  })

// RPC check subcommand
checkCmd.command('rpc')
  .description('Check RPC endpoint')
  .option('--endpoint <endpoint:string>', 'RPC endpoint URL')
  .action(async (options) => {
    let endpoint = options.endpoint

    // If no endpoint is provided, prompt for it
    if (!endpoint) {
      endpoint = await Input.prompt({
        message: 'Enter RPC endpoint URL:',
        default: 'https://api.mainnet-beta.solana.com',
      })
    }

    console.log(colors.blue(`Checking RPC endpoint: ${endpoint}`))

    try {
      // Execute the curl command with stderr redirected to stdout to capture time output
      // Ensure the URL is properly formatted
      const formattedEndpoint = endpoint.trim()
      const command =
        `curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"getEpochInfo","params":[]}' -w "Total time: %{time_total}s" -o /dev/null -s ${formattedEndpoint}`

      const process = await exec(command)

      // Extract and format the real time from the output regardless of success/failure
      const output = process.message
      const timeMatch = output.match(/Total time: (\d+\.\d+)s/)
      if (timeMatch) {
        const time = parseFloat(timeMatch[1])
        const timeColor = time < 1 ? colors.green : colors.red
        console.log(timeColor(`Total time: ${time}s`))
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : String(error)
      console.error(colors.red('Error executing curl command:'), errorMessage)
    }
  })

// gRPC check subcommand
checkCmd.command('grpc')
  .description('Check gRPC endpoint')
  .option('--endpoint <endpoint:string>', 'gRPC endpoint URL')
  .option('--x-token <x_token:string>', 'X-Token for authentication')
  .action(async (options) => {
    let endpoint = options.endpoint
    let xToken = options.xToken

    // If no endpoint is provided, prompt for it
    if (!endpoint) {
      endpoint = await Input.prompt({
        message: 'Enter gRPC endpoint URL:',
      })
    }

    // If no x-token is provided, prompt for it
    if (!xToken) {
      xToken = await Input.prompt({
        message: 'Enter X-Token for authentication:',
      })
    }
  })
