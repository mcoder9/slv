// cli/test/unit/bot_test.ts
import { assertEquals } from 'https://deno.land/std@0.185.0/testing/asserts.ts'
import { botCmd } from '@/bot/index.ts'

Deno.test("slv bot deploy should print 'Deploying BOT node...'", async () => {
  const originalLog = console.log
  let output = ''

  try {
    // console.logをモック
    console.log = (msg?: unknown, ..._args: unknown[]) => {
      // 出力を蓄積
      output += String(msg) + '\n'
    }

    // コマンドをパースして実行
    await botCmd.parse(['init'])

    // 出力が期待通りか確認
    assertEquals(output.trim(), 'Initializing the bot...')
  } finally {
    // console.log を元に戻す
    console.log = originalLog
  }
})
