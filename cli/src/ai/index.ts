import { Command } from '@cliffy'
import { readStream } from '@cmn/ai/readStream.ts'

const apiKey = ''

// ai Command
export const aiCmd = new Command()
  .description('Call AI Assistant')
  .action(async () => {
    console.log('Coming soon...')
    return
    // await readStream(
    //   apiKey,
    //   'o1-mini',
    //   [
    //     {
    //       role: 'user',
    //       content: 'Hello, how are you?',
    //     },
    //   ],
    // )
  })
