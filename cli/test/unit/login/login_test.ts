// cli/test/unit/login/login_test.ts
import { assertStringIncludes } from 'https://deno.land/std@0.185.0/testing/asserts.ts'
import { loginCmd } from '@/login/index.ts'
import { stripColor } from 'https://deno.land/std@0.185.0/fmt/colors.ts'

Deno.test('slv login should display Discord login URL and instructions', async () => {
  const originalLog = console.log
  let output = ''

  try {
    // Mock console.log
    console.log = (msg?: unknown, ..._args: unknown[]) => {
      // Accumulate output
      output += String(msg) + '\n'
    }

    // Parse and execute the command
    await loginCmd.parse([])

    // Strip ANSI color codes
    const strippedOutput = stripColor(output)

    // Check if output contains expected strings
    assertStringIncludes(strippedOutput, 'SLV Discord Login')
    assertStringIncludes(
      strippedOutput,
      'Please visit the following URL to login with Discord:',
    )
    assertStringIncludes(strippedOutput, 'https://discord.com/oauth2/authorize')
  } finally {
    // Restore original console.log
    console.log = originalLog
  }
})
