import Cloudflare from 'npm:cloudflare'
import denoJson from '../../cli/deno.json' with { type: 'json' }
import '@std/dotenv/load'
import { SLV_STORAGE_URL } from '@cmn/constants/url.ts'

const CLOUDFLARE_EMAIL = Deno.env.get('CLOUDFLARE_EMAIL')
const CLOUDFLARE_API_KEY = Deno.env.get('CLOUDFLARE_API_KEY')
const CLOUDFLARE_API_TOKEN = Deno.env.get('CLOUDFLARE_API_TOKEN')
const CLOUDFLARE_ZONE_ID = Deno.env.get('CLOUDFLARE_ZONE_ID')
const version = denoJson.version
const templateFilePath =
  `${SLV_STORAGE_URL}/slv/template/${version}/template.tar.gz`

if (
  !CLOUDFLARE_EMAIL || !CLOUDFLARE_API_KEY || !CLOUDFLARE_API_TOKEN ||
  !CLOUDFLARE_ZONE_ID
) {
  throw new Error(
    'Missing Cloudflare credentials: CLOUDFLARE_EMAIL, CLOUDFLARE_API_KEY, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID',
  )
}

const client = new Cloudflare({
  apiEmail: CLOUDFLARE_EMAIL,
  apiKey: CLOUDFLARE_API_TOKEN,
})

const response = await client.cache.purge({
  zone_id: CLOUDFLARE_ZONE_ID,
  files: [`${SLV_STORAGE_URL}/slv/install`, templateFilePath],
})

console.log(response)
