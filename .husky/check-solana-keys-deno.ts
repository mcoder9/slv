// Script to check for Solana keys in the repository using Deno
import { search } from '../cli/lib/search/search.ts';

// Test key to ignore (fixed value for testing purposes)
const TEST_KEY_VALUE = [155,18,248,214,121,116,47,47,41,249,249,74,209,131,0,97,115,86,17,110,42,84,57,66,24,207,243,83,147,35,214,192,134,48,241,158,196,147,155,50,179,88,57,80,52,232,240,101,170,25,83,196,117,195,34,238,79,80,37,78,28,184,72,200];
const TEST_KEY_STRING = JSON.stringify(TEST_KEY_VALUE);

/**
 * Check if a file contains a Solana key, but ignore the test key
 * @param path Path to the JSON file
 * @returns Boolean indicating if the file contains a non-test Solana key
 */
async function checkIfNonTestSolanaKey(path: string): Promise<boolean> {
  try {
    const fileContent = await Deno.readTextFile(path);

    // If it's the test key, ignore it
    if (fileContent.trim() === TEST_KEY_STRING) {
      return false;
    }

    try {
      const content = JSON.parse(fileContent);

      // Check if content is an array of 64 numbers (Solana key format)
      if (Array.isArray(content) && content.length === 64) {
        // Verify all elements are numbers between 0 and 255 (byte values)
        return content.every(
          (num) =>
            typeof num === 'number' && Number.isInteger(num) && num >= 0 &&
            num <= 255
        );
      }
      return false;
    } catch (parseError) {
      // If not valid JSON, it's not a Solana key
      return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * Process a list of file paths and filter for non-test Solana keys
 * @param paths Array of file paths to check
 * @returns Array of valid non-test Solana key file paths
 */
async function processPathsIgnoringTestKey(paths: string[]): Promise<string[]> {
  const validPaths: string[] = [];

  for (const path of paths) {
    if (await checkIfNonTestSolanaKey(path)) {
      validPaths.push(path);
    }
  }

  return validPaths;
}

async function checkForSolanaKeys() {
  try {
    // Search for all small files in the repository
    const foundFiles = await search('.');
    
    // Process the files to find valid Solana keys, ignoring the test key
    const solanaKeyFiles = await processPathsIgnoringTestKey(foundFiles);
    
    // If any non-test Solana keys are found, output their paths and exit with error code
    if (solanaKeyFiles.length > 0) {
      console.log(solanaKeyFiles.join('\n'));
      // Make sure to exit with error code 1 to prevent the commit
      Deno.exit(1);
    } else {
      // No non-test Solana keys found, exit with success code
      Deno.exit(0);
    }
  } catch (error) {
    console.error(`Error checking for Solana keys: ${error}`);
    Deno.exit(1);
  }
}

// Run the check
checkForSolanaKeys();
