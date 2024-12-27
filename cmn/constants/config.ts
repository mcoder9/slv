export const compileTargets = [
  'x86_64-apple-darwin',
  'x86_64-unknown-linux-gnu',
]

export const getOSTarget = () => {
  const os = Deno.build.os
  if (os === 'darwin') {
    return 'x86_64-apple-darwin'
  }
  if (os === 'linux') {
    return 'x86_64-unknown-linux-gnu'
  }
  return 'x86_64-unknown-linux-gnu'
}

export const DEFAULT_COMMISSION_RATE = 5 // 5%
