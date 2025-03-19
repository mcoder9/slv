import { swapValidatorHosts } from '/lib/swapValidatorHosts.ts'
import { parse } from 'https://deno.land/std@0.202.0/yaml/parse.ts'
import { stringify } from 'https://deno.land/std@0.202.0/yaml/stringify.ts'

// Mock data for testing
const mockInventory = {
  testnet_validators: {
    hosts: {
      'validator1': {
        name: 'validator1',
        ansible_host: '192.168.1.1',
        identity_account: 'identity1',
      },
      'validator2': {
        name: 'validator2',
        ansible_host: '192.168.1.2',
        identity_account: 'identity2',
      },
    },
  },
}

// Mock functions
const originalWriteTextFile = Deno.writeTextFile

Deno.test('swapValidatorHosts - successful swap', async () => {
  // Setup mocks
  let writtenContent = ''

  // Mock readTextFile to return our mock inventory
  const originalReadTextFile = Deno.readTextFile
  Deno.readTextFile = async () => {
    return stringify(mockInventory)
  }

  // Mock writeTextFile to capture the written content
  const originalWriteTextFile = Deno.writeTextFile
  Deno.writeTextFile = async (
    _path: string | URL,
    data: string | ReadableStream<string>,
  ) => {
    if (typeof data === 'string') {
      writtenContent = data
    } else {
      // Handle ReadableStream if needed
      writtenContent = 'ReadableStream data'
    }
  }

  try {
    // Call the function
    const result = await swapValidatorHosts(
      'testnet_validators',
      'validator1',
      'validator2',
    )

    // Verify the result
    if (result !== true) {
      throw new Error(`Expected result to be true, got ${result}`)
    }

    // Parse the written content to verify the swap
    const updatedInventory = parse(writtenContent) as Record<string, any>

    // Check that the hosts were swapped
    if (
      updatedInventory.testnet_validators.hosts.validator1.name !== 'validator2'
    ) {
      throw new Error('Host validator1 was not updated correctly')
    }

    if (
      updatedInventory.testnet_validators.hosts.validator2.name !== 'validator1'
    ) {
      throw new Error('Host validator2 was not updated correctly')
    }
  } finally {
    // Restore original functions
    Deno.readTextFile = originalReadTextFile
    Deno.writeTextFile = originalWriteTextFile
  }
})

Deno.test('swapValidatorHosts - host not found', async () => {
  // Setup mocks
  const originalReadTextFile = Deno.readTextFile
  Deno.readTextFile = async () => {
    return stringify(mockInventory)
  }

  try {
    // Call the function with a non-existent host
    const result = await swapValidatorHosts(
      'testnet_validators',
      'validator1',
      'nonexistent',
    )

    // Verify the result
    if (result !== false) {
      throw new Error(`Expected result to be false, got ${result}`)
    }
  } finally {
    // Restore original functions
    Deno.readTextFile = originalReadTextFile
    Deno.writeTextFile = originalWriteTextFile
  }
})
