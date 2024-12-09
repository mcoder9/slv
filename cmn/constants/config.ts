export const compileTargets = [
  'x86_64-apple-darwin',
  'x86_64-unknown-linux-gnu',
  'x86_64-pc-windows-msvc',
]

export const getOSTarget = () => {
  const os = Deno.build.os
  if (os === 'darwin') {
    return 'x86_64-apple-darwin'
  }
  if (os === 'linux') {
    return 'x86_64-unknown-linux-gnu'
  }
  if (os === 'windows') {
    return 'x86_64-pc-windows-msvc'
  }
  return 'x86_64-unknown-linux-gnu'
}
