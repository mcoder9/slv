import { Command } from '@cliffy'
import denoJson from '/deno.json' with { type: 'json' }
import { botCommand } from '/src/bot/index.ts'

const program = new Command()

program
  .name('slv')
  .description('slv is a toolkit for Solana Developers')
  .version(denoJson.version)

// Subcommand: bot
program
  .command('bot <cmd>')
  .description('Manage Solana gRPC Geyser Client')
  .action((_options, cmd: string) => {
    console.log(`Bot command: ${cmd}`)
    botCommand(cmd)
  })

// Subcommand: app
program
  .command('app <cmd>')
  .description('Manage Solana Applications')
  .action((_options, cmd: string) => {
    console.log(`App command: ${cmd}`)
  })

// Subcommand: validator
program
  .command('validator <cmd>')
  .description('Manage Solana Validator Nodes')
  .action((_options, cmd: string) => {
    console.log(`Validator command: ${cmd}`)
  })

// Subcommand: rpc
program
  .command('rpc <cmd>')
  .description('Manage Solana RPC Nodes')
  .action((_options, cmd: string) => {
    console.log(`RPC command: ${cmd}`)
  })

// Subcommand: cloud
program
  .command('cloud <cmd>')
  .description('Manage Solana Cloud-based Applications')
  .action((_options, cmd: string) => {
    console.log(`Cloud command: ${cmd}`)
  })

// Subcommand: swap
program
  .command('swap <cmd>')
  .description('Manage Solana Swap')
  .action((_options, cmd: string) => {
    console.log(`Swap command: ${cmd}`)
  })

const main = async () => {
  await program.parse(Deno.args)
}

main()
