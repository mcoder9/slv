import type { CmnType } from '@cmn/types/config.ts'
import { genOrReadVersions } from '/lib/genOrReadVersions.ts'
import { VERSIONS_PATH } from '@cmn/constants/path.ts'
import { colors } from '@cliffy/colors'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'

const updateVersionsYml = async (body: Partial<CmnType>) => {
  const versionsData = await genOrReadVersions()
  const updatedVersionsData = { ...versionsData, ...body }
  // Use JSON.parse/stringify to remove undefined values
  const cleanedData = JSON.parse(JSON.stringify(updatedVersionsData))
  // Use stringify with options to control the output format
  const versionsYml = stringify(cleanedData, {
    indent: 2,
    lineWidth: -1, // No line wrapping
    noRefs: true, // Don't output YAML references
    noCompatMode: true, // Use the latest YAML spec
  })
  await Deno.writeTextFile(VERSIONS_PATH, versionsYml)
  console.log(colors.white('🟢 Updated versions.yml'))
}

export { updateVersionsYml }
