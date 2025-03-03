// Test script to verify Solana key detection
import { search, processPaths } from '../cli/lib/search/search.ts'

async function testSolanaKeyDetection() {
  console.log('Testing Solana key detection...')
  
  // First search for files
  const foundFiles = await search('.')
  console.log('Found files:', foundFiles)
  
  // Then process them to find valid Solana keys
  const validKeyFiles = await processPaths(foundFiles)
  console.log('Valid Solana key files:', validKeyFiles)
  
  // Check that we found exactly one valid key file
  if (validKeyFiles.length !== 1) {
    console.error(`Expected 1 valid key file, got ${validKeyFiles.length}`)
  } else if (!validKeyFiles[0].includes('solana-key.json')) {
    console.error('Should find solana-key.json')
  } else {
    console.log('Test passed! Correctly identified the Solana key file.')
  }
}

testSolanaKeyDetection().catch(console.error)
