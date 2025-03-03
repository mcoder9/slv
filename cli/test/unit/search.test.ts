// Test file for search.ts
import { processPaths, search } from '/lib/search/search.ts'

// Basic test directory setup
const TEST_DIR = './test-data'

// Create test directory and files
async function setupTestData() {
  try {
    // Create test directory
    await Deno.mkdir(TEST_DIR, { recursive: true })

    // Create a valid Solana key file (array of 64 numbers)
    const validKey = Array(64).fill(0).map((_, i) => i % 256) // Creates an array of 64 numbers between 0-255
    await Deno.writeTextFile(
      `${TEST_DIR}/valid-key.json`,
      JSON.stringify(validKey),
    )

    // Create an invalid key file
    await Deno.writeTextFile(
      `${TEST_DIR}/invalid-key.json`,
      JSON.stringify('not-a-key'),
    )

    // Create a large file (> 300 bytes)
    const largeData = { data: 'a'.repeat(400) }
    await Deno.writeTextFile(
      `${TEST_DIR}/large-file.json`,
      JSON.stringify(largeData),
    )
  } catch (error) {
    console.error(`Error setting up test data: ${error}`)
  }
}

// Clean up test files
async function cleanupTestData() {
  try {
    await Deno.remove(TEST_DIR, { recursive: true })
  } catch (error) {
    console.error(`Error cleaning up test data: ${error}`)
  }
}

// Test the search function
Deno.test('search finds JSON files in a directory', async () => {
  await setupTestData()

  try {
    const results = await search(TEST_DIR)

    // Check that we found the expected files
    const hasValidKey = results.some((path: string) =>
      path.includes('valid-key.json')
    )
    const hasInvalidKey = results.some((path: string) =>
      path.includes('invalid-key.json')
    )
    const hasLargeFile = results.some((path: string) =>
      path.includes('large-file.json')
    )

    // Assert our expectations
    if (!hasValidKey) throw new Error('Should find valid-key.json')
    if (!hasInvalidKey) throw new Error('Should find invalid-key.json')
    if (hasLargeFile) {
      throw new Error('Should not find large-file.json (> 300 bytes)')
    }
  } finally {
    await cleanupTestData()
  }
})

// Test the processPaths function
Deno.test('processPaths correctly identifies Solana keys', async () => {
  await setupTestData()

  try {
    // Get the full paths to our test files
    const validKeyPath = `${TEST_DIR}/valid-key.json`
    const invalidKeyPath = `${TEST_DIR}/invalid-key.json`

    const paths = [validKeyPath, invalidKeyPath]
    const validPaths = await processPaths(paths)

    // Check that only the valid key was found
    if (validPaths.length !== 1) {
      throw new Error(`Expected 1 valid path, got ${validPaths.length}`)
    }
    if (!validPaths[0].includes('valid-key.json')) {
      throw new Error('Should find valid-key.json')
    }
  } finally {
    await cleanupTestData()
  }
})

// Test both functions together
Deno.test('search and processPaths work together', async () => {
  await setupTestData()

  try {
    // First search for files
    const foundFiles = await search(TEST_DIR)

    // Then process them to find valid Solana keys
    const validKeyFiles = await processPaths(foundFiles)

    // Check that we found exactly one valid key file
    if (validKeyFiles.length !== 1) {
      throw new Error(`Expected 1 valid key file, got ${validKeyFiles.length}`)
    }
    if (!validKeyFiles[0].includes('valid-key.json')) {
      throw new Error('Should find valid-key.json')
    }
  } finally {
    await cleanupTestData()
  }
})
