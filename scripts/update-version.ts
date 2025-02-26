#!/usr/bin/env deno run -A

import { VERSION } from '../cmn/constants/version.ts'
import { join } from '@std/path'
import { copy, ensureDir, ensureSymlink } from 'https://deno.land/std/fs/mod.ts'
import { spawnSync } from '@elsoul/child-process'

/**
 * Updates all version references in the project
 * This script:
 * 1. Updates cli/deno.json version
 * 2. Updates upload:template task in root deno.json
 * 3. Updates version in sh/install
 * 4. Creates a new version directory in sh/ and copies the install file
 * 5. Creates a new version directory in template/ and copies the template files
 * 6. Updates the template/latest symlink
 */
async function updateVersion() {
  console.log(`Updating version references to ${VERSION}...`)

  // 1. Update cli/deno.json
  const cliDenoJsonPath = './cli/deno.json'
  const cliDenoJson = JSON.parse(await Deno.readTextFile(cliDenoJsonPath))
  cliDenoJson.version = VERSION
  await Deno.writeTextFile(
    cliDenoJsonPath,
    JSON.stringify(cliDenoJson, null, 2),
  )
  console.log(`✅ Updated ${cliDenoJsonPath}`)

  // 2. Update upload:template task in root deno.json
  const rootDenoJsonPath = './deno.json'
  const rootDenoJson = JSON.parse(await Deno.readTextFile(rootDenoJsonPath))

  // Update upload:template task
  rootDenoJson.tasks['upload:template'] =
    `tar -czf dist/template.tar.gz ./template/${VERSION} && deno run -A cli/uploadTemplate.ts`
  await Deno.writeTextFile(
    rootDenoJsonPath,
    JSON.stringify(rootDenoJson, null, 2),
  )
  console.log(`✅ Updated ${rootDenoJsonPath}`)

  // 3. Update version in sh/install
  const installPath = './sh/install'
  let installContent = await Deno.readTextFile(installPath)
  installContent = installContent.replace(
    /VERSION="[^"]*"/,
    `VERSION="${VERSION}"`,
  )
  await Deno.writeTextFile(installPath, installContent)
  console.log(`✅ Updated ${installPath}`)

  // 4. Create a new version directory in sh/ and copy the install file
  const shVersionDir = `./sh/${VERSION}`
  await ensureDir(shVersionDir)
  await Deno.copyFile(installPath, join(shVersionDir, 'install'))
  console.log(`✅ Created ${shVersionDir}/install`)

  // 5. Create a new version directory in template/ and copy the template files
  // First, find the latest version directory in template/
  const templateDirs = []
  for await (const entry of Deno.readDir('./template')) {
    if (
      entry.isDirectory && entry.name !== 'latest' &&
      entry.name.match(/^\d+\.\d+\.\d+$/)
    ) {
      templateDirs.push(entry.name)
    }
  }

  // Sort versions and get the latest
  templateDirs.sort((a, b) => {
    const aParts = a.split('.').map(Number)
    const bParts = b.split('.').map(Number)
    for (let i = 0; i < 3; i++) {
      if (aParts[i] !== bParts[i]) {
        return bParts[i] - aParts[i]
      }
    }
    return 0
  })

  const latestTemplateDir = templateDirs[0]
  const newTemplateDir = `./template/${VERSION}`

  // Copy the latest template directory to the new version
  await ensureDir(newTemplateDir)
  await copy(`./template/${latestTemplateDir}`, newTemplateDir, {
    overwrite: true,
  })
  console.log(`✅ Created ${newTemplateDir} from template/${latestTemplateDir}`)

  // 6. Update the template/latest symlink
  try {
    await Deno.remove('./template/latest')
  } catch (error) {
    // Ignore if the symlink doesn't exist
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error
    }
  }

  // Create the symlink
  await ensureSymlink(newTemplateDir, './template/latest')
  console.log(
    `✅ Updated template/latest symlink to point to ${newTemplateDir}`,
  )

  console.log(`\n✅ All version references updated to ${VERSION}`)
}

// Run the update function
await updateVersion()
