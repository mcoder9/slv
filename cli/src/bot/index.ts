// src/bot/index.ts
export const botCommand = (cmd: string) => {
  switch (cmd) {
    case 'start':
      console.log('Bot is starting...')
      // Bot 開始処理
      break
    case 'stop':
      console.log('Bot is stopping...')
      // Bot 停止処理
      break
    default:
      console.error(`Unknown bot command: ${cmd}`)
      break
  }
}
