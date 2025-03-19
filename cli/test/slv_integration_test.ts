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
