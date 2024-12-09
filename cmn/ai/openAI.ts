import OpenAI from 'https://deno.land/x/openai@v4.69.0/mod.ts'
import '@std/dotenv/load'

export async function openAI(
  messages: OpenAI.ChatCompletionMessageParam[],
  model: OpenAI.ChatModel = 'o1-preview',
) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
  if (!OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is required')
    return null
  }
  const OPENAI_ORG = Deno.env.get('OPENAI_ORG')
  if (!OPENAI_ORG) {
    console.error('OPENAI_ORG is required')
    return null
  }
  const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
  })
  const chatCompletion = await client.chat.completions.create({
    messages,
    model,
  })

  return chatCompletion.choices[0].message.content
}
