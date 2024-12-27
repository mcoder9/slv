import { configRoot } from '@cmn/constants/path.ts'
import denoJson from '/deno.json' with { type: 'json' }

const getTemplatePath = () => {
  return `${configRoot}/template/${denoJson.version}`
}

export { getTemplatePath }
