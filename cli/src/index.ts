import { Command } from '@cliffy'
import denoJson from '/deno.json' with { type: 'json' }
import { botCmd } from '@/bot/index.ts'
import { appCmd } from '@/app/index.ts'
import { validatorCmd } from '@/validator/index.ts'
import { rpcCmd } from '@/rpc/index.ts'
import { cloudCmd } from '@/cloud/index.ts'
import { swapCmd } from '@/swap/index.ts'
import { aiCmd } from '/src/ai/index.ts'

const program = new Command()
  .name('slv')
  .description('slv is a toolkit for Solana Developers')
  .version(denoJson.version)

// Subcommands
program.command('bot', botCmd)
program.command('app', appCmd)
program.command('validator', validatorCmd)
program.command('rpc', rpcCmd)
program.command('cloud', cloudCmd)
program.command('swap', swapCmd)
program.command('ai', aiCmd)

await program.parse(Deno.args)
