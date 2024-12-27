import denoJson from '/deno.json' with { type: 'json' }
import { spawnSync } from '@elsoul/child-process'

const uploadTemplate = async () => {
  const version = denoJson.version
  const fileName = `template.tar.gz`
  console.log(`Uploading slv v${version} to Solana`)
  const cmd =
    `aws --endpoint-url=https://278a7109e511280594fe6a2ebb778333.r2.cloudflarestorage.com/slv s3 cp ${fileName} s3://slv/template/${version}/${fileName} --content-disposition 'attachment; filename=install'`
  const result = await spawnSync(cmd, './dist')
  console.log(result.message)
}

await uploadTemplate()
