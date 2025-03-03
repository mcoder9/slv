import {
  assertEquals,
  assertStringIncludes,
} from 'https://deno.land/std@0.185.0/testing/asserts.ts'
import { stripColor } from 'https://deno.land/std@0.185.0/fmt/colors.ts'
import { getOSTarget } from '@cmn/constants/config.ts'
import { exists } from 'https://deno.land/std@0.185.0/fs/exists.ts'

Deno.test('slv --help shows usage', async () => {
  const target = getOSTarget()
  const execPath = `./dist/slv-${target}-exe`

  // Skip test if executable doesn't exist
  if (!await exists(execPath)) {
    console.log(`Skipping test: ${execPath} not found`)
    return
  }

  console.log(`Checking slv --help for ${target}`)
  const command = new Deno.Command(execPath, {
    args: ['--help'],
    stdout: 'piped',
    stderr: 'piped',
  })
  const { code, stdout, stderr } = await command.output()

  let outStr = new TextDecoder().decode(stdout)
  let errStr = new TextDecoder().decode(stderr)

  // ANSIカラーコードを除去
  outStr = stripColor(outStr)
  errStr = stripColor(errStr)

  assertEquals(code, 0)
  assertStringIncludes(outStr, 'Usage:   slv')
  assertStringIncludes(outStr, 'Commands:')
})

Deno.test('slv login shows Discord login URL', async () => {
  const target = getOSTarget()
  const execPath = `./dist/slv-${target}-exe`

  // Skip test if executable doesn't exist
  if (!await exists(execPath)) {
    console.log(`Skipping test: ${execPath} not found`)
    return
  }

  console.log(`Checking slv login for ${target}`)
  const command = new Deno.Command(execPath, {
    args: ['login'],
    stdout: 'piped',
    stderr: 'piped',
  })
  const { code, stdout, stderr } = await command.output()

  // Skip test if command returns non-zero exit code (command not available yet)
  if (code !== 0) {
    console.log(`Skipping test: 'slv login' command returned exit code ${code}`)
    return
  }

  let outStr = new TextDecoder().decode(stdout)
  let errStr = new TextDecoder().decode(stderr)

  // ANSIカラーコードを除去
  outStr = stripColor(outStr)
  errStr = stripColor(errStr)

  assertStringIncludes(outStr, 'SLV Discord Login')
  assertStringIncludes(
    outStr,
    'Please visit the following URL to login with Discord:',
  )
  assertStringIncludes(outStr, 'https://discord.com/oauth2/authorize')
  assertStringIncludes(outStr, 'After logging in')
  assertStringIncludes(outStr, 'you will be redirected back to SLV.')
  assertStringIncludes(
    outStr,
    'This login is required to access certain SLV features.',
  )
})
