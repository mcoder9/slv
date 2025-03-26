---
id: geyser-grpc-test
title: Solana Geyser gRPC - gRPC Latency Test
description: SLV - Solana Geyser gRPC - gRPC Latency Test
---

This guide will show you how to test the latency of the Solana Geyser gRPC server.

## Prerequisites

Install SLV CLI:

```bash
curl -fsSL https://storage.slv.dev/slv/install | sh
```

## Test gRPC Latency

You can easily test the latency of the Solana Geyser gRPC server with the following command:

```bash
slv check grpc --help
Usage:   slv check grpc
Version: 0.8.2

Description:

  Check gRPC endpoint

Options:

  -h, --help              - Show this help.
  --endpoint  <endpoint>  - gRPC endpoint URL
  --token     <token>     - Token for authentication
```

If you don't have a Geyser gRPC Access, please refer to the [Geyser gRPC Quickstart](/en/doc/geyser-grpc/quickstart) guide.


## Set Geyser gRPC Endpoint/Token

You can interactively set the Geyser gRPC endpoint/token with the following command:

```bash
slv check grpc
? Enter gRPC endpoint URL: ›
```

Then, Please set Geyser gRPC Authentication Token

```bash
? Enter xToken for gRPC: ›
```

The test will then proceed to check the latency of the Geyser gRPC server.

```bash
? Enter Token for authentication: › xToken
Checking gRPC endpoint: http://localhost:10000
Current latency: 608 ms, slots: 0
Avg latency: 608 ms
Current latency: 1043 ms, slots: 1
Avg latency: 825.5 ms
Current latency: 449 ms, slots: 0
Avg latency: 700 ms
Current latency: 900 ms, slots: 1
Avg latency: 750 ms
Current latency: 1261 ms, slots: 2
Avg latency: 852.2 ms
Current latency: 658 ms, slots: 0
Avg latency: 819.8333333333334 ms
Current latency: 1041 ms, slots: 1
Avg latency: 851.4285714285714 ms
1
Current latency: 504 ms, slots: 0
Avg latency: 808 ms
.
.
.
```

You can stop the test by pressing `Ctrl + C`.