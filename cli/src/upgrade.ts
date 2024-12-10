const upgrade = async () => {
  const script = await (await fetch('https://storage.slv.dev/slv/install'))
    .text()
  const process = new Deno.Command('sh', {
    stdin: 'piped',
    stdout: 'inherit',
    stderr: 'inherit',
  }).spawn()
  const writer = process.stdin.getWriter()
  await writer.write(new TextEncoder().encode(script))
  await writer.close()
  const { code } = await process.status
  Deno.exit(code)
}

export { upgrade }
