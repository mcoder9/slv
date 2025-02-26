import { VERSION } from '@cmn/constants/version.ts'
import { SLV_STORAGE_URL } from '@cmn/constants/url.ts'

/**
 * Uploads the install script to Cloudflare R2 using the Cloudflare API
 * This is more reliable than using the AWS CLI
 */
const uploadScript = async () => {
  const version = VERSION
  console.log(`Uploading install script v${version} to Cloudflare R2`)

  // Get environment variables for authentication
  const accountId = Deno.env.get('CLOUDFLARE_ACCOUNT_ID')
  const apiToken = Deno.env.get('CLOUDFLARE_API_TOKEN')
  const apiKey = Deno.env.get('CLOUDFLARE_API_KEY')
  const email = Deno.env.get('CLOUDFLARE_EMAIL')

  // Check for required authentication credentials
  if (!accountId) {
    throw new Error(
      'Missing required environment variable: CLOUDFLARE_ACCOUNT_ID',
    )
  }

  if (!apiToken && (!apiKey || !email)) {
    throw new Error(
      'Missing required authentication credentials. Either CLOUDFLARE_API_TOKEN or both CLOUDFLARE_API_KEY and CLOUDFLARE_EMAIL must be provided.',
    )
  }

  // Prepare authentication headers
  let authHeaders: Record<string, string> = {}

  if (apiToken) {
    console.log('Using API Token authentication')
    authHeaders = {
      'Authorization': `Bearer ${apiToken}`,
    }
  } else if (apiKey && email) {
    console.log('Using API Key authentication')
    authHeaders = {
      'X-Auth-Email': email,
      'X-Auth-Key': apiKey,
    }
  }

  // Read the install script file
  const filePath = './sh/install'
  const fileContent = await Deno.readFile(filePath)

  // Upload to R2 using Cloudflare API
  const bucketName = 'slv'
  const objectKey = 'install'
  const url =
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${objectKey}`

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=install',
    },
    body: fileContent,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to upload install script: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }

  console.log(
    `✅ Successfully uploaded install script to ${SLV_STORAGE_URL}/slv/install`,
  )
}

await uploadScript()
