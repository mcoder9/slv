// Script to check for Solana keys in the repository using Node.js
const fs = require('fs');
const path = require('path');

// Test key to ignore (fixed value for testing purposes)
const TEST_KEY_VALUE = [155,18,248,214,121,116,47,47,41,249,249,74,209,131,0,97,115,86,17,110,42,84,57,66,24,207,243,83,147,35,214,192,134,48,241,158,196,147,155,50,179,88,57,80,52,232,240,101,170,25,83,196,117,195,34,238,79,80,37,78,28,184,72,200];
const TEST_KEY_STRING = JSON.stringify(TEST_KEY_VALUE);

// Function to search for small files in the specified directory
async function search(searchPath) {
  try {
    const filePaths = [];

    // Get all files in the directory
    const entries = fs.readdirSync(searchPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(searchPath, entry.name);

      if (entry.isDirectory()) {
        // Skip .git and node_modules directories
        if (entry.name === '.git' || entry.name === 'node_modules') {
          continue;
        }
        // Recursively search subdirectories
        const subDirPaths = await search(entryPath);
        filePaths.push(...subDirPaths);
      } else if (entry.isFile()) {
        // Check if it's smaller than 301 bytes
        try {
          const stats = fs.statSync(entryPath);
          if (stats.size < 301) {
            filePaths.push(entryPath);
          }
        } catch (error) {
          console.error(`Error getting file info for ${entryPath}:`, error);
        }
      }
    }

    return filePaths;
  } catch (error) {
    throw new Error(`search Error: ${error}`);
  }
}

/**
 * Check if a file contains a Solana key, but ignore the test key
 * @param {string} filePath Path to the JSON file
 * @returns {boolean} Boolean indicating if the file contains a non-test Solana key
 */
async function checkIfNonTestSolanaKey(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

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
 * @param {string[]} paths Array of file paths to check
 * @returns {string[]} Array of valid non-test Solana key file paths
 */
async function processPathsIgnoringTestKey(paths) {
  const validPaths = [];

  for (const filePath of paths) {
    if (await checkIfNonTestSolanaKey(filePath)) {
      validPaths.push(filePath);
    }
  }

  return validPaths;
}

// Main function to check for Solana keys
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
      process.exit(1);
    } else {
      // No non-test Solana keys found, exit with success code
      process.exit(0);
    }
  } catch (error) {
    console.error(`Error checking for Solana keys: ${error}`);
    process.exit(1);
  }
}

// Run the check
checkForSolanaKeys();
