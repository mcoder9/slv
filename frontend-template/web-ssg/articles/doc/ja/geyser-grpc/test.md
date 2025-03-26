---
id: geyser-grpc-test
title: Solana Geyser gRPC - gRPC Latency Test
description: SLV - Solana Geyser gRPC - gRPC Latency Test
---

このガイドでは、Solana Geyser gRPCサーバーのレイテンシーテストする方法について説明します。

## 前提条件

SLV CLI をインストールしてください:

```bash
curl -fsSL https://storage.slv.dev/slv/install | sh
```

## gRPCレイテンシーテスト

次のコマンドで、Solana Geyser gRPCサーバーのレイテンシーを簡単にテストできます:

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

Geyser gRPCアクセスがない場合は、[Geyser gRPCクイックスタート](/ja/doc/geyser-grpc/quickstart)ガイドを参照してください。

## Geyser gRPCエンドポイント/トークンの設定

次のコマンドで、Geyser gRPCエンドポイント/トークンを対話的に設定できます:

```bash
slv check grpc
? Enter gRPC endpoint URL: ›
```

次に、Geyser gRPC認証トークンを設定してください

```bash
? Enter xToken for gRPC: ›
```

設定完了後、Geyser gRPCサーバーのレイテンシー測定が開始されます。

以下は実際の動作例です：

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

テストを停止するには **Ctrl + C** を押します。