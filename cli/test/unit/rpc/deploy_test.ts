// cli/test/unit/rpc_test.ts
import { assertEquals } from 'https://deno.land/std@0.185.0/testing/asserts.ts'
import { rpcCmd } from '@/rpc/index.ts'

Deno.test("slv rpc deploy should print 'Deploying RPC node...'", async () => {
  const originalLog = console.log
  let output = ''

  try {
    // console.logをモック
    console.log = (msg?: unknown, ..._args: unknown[]) => {
      // 出力を蓄積
      output += String(msg) + '\n'
    }

    // コマンドをパースして実行
    await rpcCmd.parse(['deploy'])

    // 出力が期待通りか確認
    assertEquals(output.trim(), 'Deploying RPC node...')
  } finally {
    // console.log を元に戻す
    console.log = originalLog
  }
})
