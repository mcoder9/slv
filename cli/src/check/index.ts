import { Command } from '@cliffy'
import { Confirm, Input, Select } from '@cliffy/prompt'
import { colors } from '@cliffy/colors'
import { exec } from '@elsoul/child-process'
import { join } from '@std/path'
import { exists } from '@std/fs'

// Define the path for the scripts
const userBinDir = join(Deno.env.get('HOME') || '', '.slv', 'bin')

// Function to create a shell script for gRPC testing
async function createGrpcTestScript(
  endpoint: string,
  token: string,
): Promise<string> {
  // Create the directory if it doesn't exist
  try {
    await Deno.mkdir(userBinDir, { recursive: true })
  } catch (error) {
    if (!(error instanceof Deno.errors.AlreadyExists)) {
      throw error
    }
  }

  const scriptPath = join(userBinDir, 'grpc_test.sh')
  const scriptContent = `#!/bin/bash
# Simple gRPC test script
echo "Testing gRPC endpoint: ${endpoint} with token: ${token}"
echo "Sending request..."

# Use curl to make a gRPC-like request
curl -s -X POST "${endpoint}" \\
  -H "Content-Type: application/json" \\
  -H "X-Token: ${token}" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getStatus"}' \\
  | jq . 2>/dev/null || echo "Response is not valid JSON"

echo "gRPC test completed."
`

  await Deno.writeTextFile(scriptPath, scriptContent)
  await Deno.chmod(scriptPath, 0o755)

  return scriptPath
}

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
      // Execute the curl command
      const command =
        `curl ${endpoint} --header 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"getBlockHeight"}'`

      const process = await exec(command)

      if (!process.success) {
        console.error(colors.red('Error:'), process.message)
      } else {
        console.log(colors.green('Response:'))
        console.log(process.message)
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

    console.log(
      colors.blue(`Checking gRPC endpoint: ${endpoint} with token: ${xToken}`),
    )

    try {
      // Create a shell script for gRPC testing
      const scriptPath = await createGrpcTestScript(endpoint, xToken)

      // Execute the script
      const process = await exec(scriptPath)

      if (!process.success) {
        console.error(colors.red('Error:'), process.message)
      } else {
        console.log(colors.green('Response:'))
        console.log(process.message)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : String(error)
      console.error(
        colors.red('Error executing grpc_test command:'),
        errorMessage,
      )
    }
  })
