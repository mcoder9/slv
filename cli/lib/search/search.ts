/**
 * Search for small JSON files in the specified directory
 * @param searchPath The directory path to search in
 * @returns Array of file paths
 */
export const search = async (searchPath: string): Promise<string[]> => {
  try {
    const filePaths: string[] = []

    // Walk through the directory recursively
    for await (const entry of Deno.readDir(searchPath)) {
      const path = `${searchPath}/${entry.name}`

      if (entry.isDirectory) {
        // Recursively search subdirectories
        const subDirPaths = await search(path)
        filePaths.push(...subDirPaths)
      } else if (entry.isFile) {
        // Check if it's a JSON file and smaller than 301 bytes
        try {
          const fileInfo = await Deno.stat(path)
          if (fileInfo.size < 301) {
            filePaths.push(path)
          }
        } catch (error) {
          console.error(`Error getting file info for ${path}:`, error)
        }
      }
    }

    return filePaths
  } catch (error) {
    throw new Error(`search Error: ${error}`)
  }
}

/**
 * Check if a file contains a Solana key
 * @param path Path to the JSON file
 * @returns Boolean indicating if the file contains a Solana key
 */
const checkIfSolanaKey = async (path: string): Promise<boolean> => {
  try {
    const fileContent = await Deno.readTextFile(path)

    try {
      const content = JSON.parse(fileContent)

      // Check if content is an array of 64 numbers (Solana key format)
      if (Array.isArray(content) && content.length === 64) {
        // Verify all elements are numbers between 0 and 255 (byte values)
        return content.every(
          (num) =>
            typeof num === 'number' && Number.isInteger(num) && num >= 0 &&
            num <= 255,
        )
      }
      return false
    } catch (parseError) {
      // If not valid JSON, it's not a Solana key
      return false
    }
  } catch (error) {
    return false
  }
}

/**
 * Process a list of file paths and filter for Solana keys
 * @param paths Array of file paths to check
 * @returns Array of valid Solana key file paths
 */
export const processPaths = async (paths: string[]): Promise<string[]> => {
  const validPaths: string[] = []

  for (const path of paths) {
    if (await checkIfSolanaKey(path)) {
      validPaths.push(path)
    }
  }

  return validPaths
}
