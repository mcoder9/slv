import OpenAI from 'https://deno.land/x/openai@v4.69.0/mod.ts'
import { AI_API_URL } from '@cmn/constants/url.ts'
import { ChatModel } from 'https://deno.land/x/openai@v4.69.0/resources/mod.ts'

export async function readStream(
  apiKey: string,
  model: ChatModel,
  messages: OpenAI.ChatCompletionMessageParam[],
) {
  const response = await fetch(AI_API_URL + '/stream?api-key=' + apiKey, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, messages }),
  })

  if (!response.ok) {
    const msg = await response.json()
    console.error('Stream Error:', msg.message)
    return
  }

  const reader = response.body?.getReader()
  if (!reader) {
    console.error('ReadableStream is not supported or no body found.')
    return
  }

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    if (value) {
      const chunk = decoder.decode(value, { stream: true })
      buffer += chunk

      while (buffer.length >= 80) {
        const searchRange = buffer.slice(60, 80)
        let breakIndex = -1

        const dotPos = searchRange.indexOf('.')
        const zenkakuDotPos = searchRange.indexOf('。')

        if (dotPos !== -1 && zenkakuDotPos !== -1) {
          breakIndex = 60 + Math.min(dotPos, zenkakuDotPos)
        } else if (dotPos !== -1) {
          breakIndex = 60 + dotPos
        } else if (zenkakuDotPos !== -1) {
          breakIndex = 60 + zenkakuDotPos
        }

        if (breakIndex === -1) {
          breakIndex = 80
        } else {
          breakIndex += 1
        }

        const line = buffer.slice(0, breakIndex)
        console.log(line)
        buffer = buffer.slice(breakIndex)
      }
    }
  }

  if (buffer.length > 0) {
    console.log(buffer)
  }
}
