---
id: mainnet-validator-migrate
title: Solana Mainnet Validator - Migrate Solana Validator Node With No Downtime
description: SLV - Solana Mainnet Validator - Migrate Solana Validator Node With No Downtime
---

## 🚀 Zero-Downtime Migration Guide for Solana Mainnet Validators

This guide explains how to migrate an existing mainnet validator to a new server without stopping the validator.

https://www.youtube.com/watch?v=1lg1yWfDJIo

## Prerequisites

This guide assumes that you already have a Solana mainnet validator node set up.

We assume that the following two validator nodes are set up:

**1. Active mainnet validator node** - The currently running validator node

**2. New mainnet validator node** - The validator node you are migrating to

⚠️ Important Note

In this guide, we assume:

The name set during `slv v init` for the `active mainnet validator node` is `labo`.

And,

The name set during `slv v init` for the `new mainnet validator node` is `labo-spare`.

Both validator nodes are assumed to have been set up using the `slv v deploy -n mainnet -p labo` and `slv v deploy -n mainnet -p labo-spare` commands respectively.

Both nodes should have the same configuration except for the Solana validator IP and name.

For example, when setting up a spare validator,
when using the `slv v init` command for setup,
use a name as shown below:

```bash
slv v init
.
.
? Do you want to create a new identity key now? (Y/n) › No
? Please Enter Your Identity Public Key › xxxxxxxxxxxxx
? Enter Inventory Name (xxxxxxxxxxxxx) › labo-spare
```

## Migrating the Validator Node

When you run the `slv v switch` command, you will be prompted to select the network to migrate to.

## Select the Solana Network

```bash
slv v switch
? Select Solana Network ( mainnet)
  testnet
❯ mainnet
```

Here, select mainnet.

## Enter the Name of the Source Validator

```bash
✨ Switching Testnet Validator Identity...
? From Validator Identity › labo
```

## Enter the Name of the Destination Validator

```bash
? To Validator Identity › labo-spare
.
.
.
PLAY RECAP **************************************************************************************************
labo-spare      : ok=3    changed=1    unreachable=0    failed=0    skipped=2    rescued=0    ignored=0   
labo : ok=4    changed=3    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0   

Successfully swapped hosts labo and labo-spare in mainnet_validators
✅ Successfully Switched Validator Identity
```

The validator node migration is now complete.

When this command succeeds, the configuration in the following file will also be changed to the switched node:

`~/.slv/inventory.mainnet.validators.yml`
