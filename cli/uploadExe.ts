import denoJson from '/deno.json' with { type: 'json' }
import { spawnSync } from '@elsoul/child-process'

const uploadExe = async () => {
  const version = denoJson.version
  const compileTargets = [
    'x86_64-apple-darwin',
    'x86_64-unknown-linux-gnu',
  ]
  console.log(`Uploading slv v${version} to Solana`)
  await Promise.all(compileTargets.map(async (target) => {
    const cmd =
      `aws --endpoint-url=https://278a7109e511280594fe6a2ebb778333.r2.cloudflarestorage.com/slv s3 cp slv-${target}-exe.tar.gz s3://slv/${version}/${target}-exe.tar.gz --content-disposition 'attachment; filename=install'`
    const result = await spawnSync(cmd, './dist')
    console.log(result.message)
  }))
}

await uploadExe()
