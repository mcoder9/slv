import Cloudflare from 'npm:cloudflare'
import denoJson from '../../cli/deno.json' with { type: 'json' }
import '@std/dotenv/load'
import { SLV_STORAGE_URL } from '@cmn/constants/url.ts'

// Get environment variables for authentication
const CLOUDFLARE_EMAIL = Deno.env.get('CLOUDFLARE_EMAIL')
const CLOUDFLARE_API_KEY = Deno.env.get('CLOUDFLARE_API_KEY')
const CLOUDFLARE_API_TOKEN = Deno.env.get('CLOUDFLARE_API_TOKEN')
const CLOUDFLARE_ZONE_ID = Deno.env.get('CLOUDFLARE_ZONE_ID')
const version = denoJson.version
const templateFilePath =
  `${SLV_STORAGE_URL}/slv/template/${version}/template.tar.gz`

// Check for required authentication credentials
if (!CLOUDFLARE_ZONE_ID) {
  throw new Error('Missing required environment variable: CLOUDFLARE_ZONE_ID')
}

// Check authentication options
if (CLOUDFLARE_API_TOKEN) {
  console.log('Using API Token authentication for cache purge')
} else if (CLOUDFLARE_EMAIL && CLOUDFLARE_API_KEY) {
  console.log('Using API Key authentication for cache purge')
} else {
  throw new Error(
    'Missing authentication credentials. Either CLOUDFLARE_API_TOKEN or both CLOUDFLARE_EMAIL and CLOUDFLARE_API_KEY must be provided.',
  )
}

// Create Cloudflare client with appropriate authentication
let client
if (CLOUDFLARE_API_TOKEN) {
  client = new Cloudflare({
    apiToken: CLOUDFLARE_API_TOKEN,
  })
} else {
  client = new Cloudflare({
    apiEmail: CLOUDFLARE_EMAIL,
    apiKey: CLOUDFLARE_API_KEY,
  })
}

// Purge cache
console.log(`Purging cache for: ${SLV_STORAGE_URL}/slv/install and ${templateFilePath}`)
const response = await client.cache.purge({
  zone_id: CLOUDFLARE_ZONE_ID,
  files: [`${SLV_STORAGE_URL}/slv/install`, templateFilePath],
})

console.log('Cache purge response:', response)
