// Script to check for Solana keys in the repository
// This script is designed to work with both Deno and Node.js

// Import the search and processPaths functions
// For Deno
import { search, processPaths } from '../cli/lib/search/search.ts';

async function checkForSolanaKeys() {
  try {
    // Search for all small files in the repository
    const foundFiles = await search('.');
    
    // Process the files to find valid Solana keys
    const solanaKeyFiles = await processPaths(foundFiles);
    
    // If any Solana keys are found, output their paths
    if (solanaKeyFiles.length > 0) {
      console.log(solanaKeyFiles.join('\n'));
      // Exit with error code 1 to prevent the commit
      if (typeof process !== 'undefined') {
        // Node.js
        process.exit(1);
      } else {
        // Deno
        Deno.exit(1);
      }
    }
  } catch (error) {
    console.error(`Error checking for Solana keys: ${error}`);
    // Exit with an error code to prevent the commit
    if (typeof process !== 'undefined') {
      // Node.js
      process.exit(1);
    } else {
      // Deno
      Deno.exit(1);
    }
  }
}

// Run the check
checkForSolanaKeys();
