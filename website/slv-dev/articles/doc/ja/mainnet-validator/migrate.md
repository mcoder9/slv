---
id: mainnet-validator-migrate
title: Solana Mainnet Validator - Migrate Solana Validator Node With No Downtime
description: SLV - Solana Mainnet Validator - Migrate Solana Validator Node With No Downtime
---

## 🚀 Solana メインネットバリデータのノーダウンタイム移行ガイド

既存のメインネットバリデータを停止せずに、新しいサーバーへ移行する方法を解説します。

https://www.youtube.com/watch?v=sNLDz_7RJn4

## 前提条件

Solana メインネットのバリデーターノードがすでにセットアップされていることを前提とします。

以下の２つのバリデーターノードがセットアップされていると仮定します。

**1. アクティブなメインネットバリデーターノード** - 現在稼働中のバリデーターノード

**2. 新しいメインネットバリデーターノード** - 移行先のバリデーターノード

⚠️注意事項

このガイドでは、

`アクティブなメインネットバリデーターノード` の `slv v init` で設定した名前を `labo` と仮定します。

そして、

`新しいメインネットバリデーターノード` の `slv v init` で設定した名前を `labo-spare` と仮定します。

双方のバリデーターノードは、`slv v deploy -n mainnet -p labo` 及び `slv v deploy -n mainnet -p labo-spare` コマンドを使用してセットアップされていることを前提とします。


両ノードはSolana バリデータのIPと名前以外は同じ設定にしてください。

例えば、スペアのバリデーターをセットアップする場合、
`slv v init` コマンドを使用してセットアップする際に、
以下のように名前を使用してセットアップします。

```bash
slv v init
.
.
? Do you want to create a new identity key now? (Y/n) › No
? Please Enter Your Identity Public Key › xxxxxxxxxxxxx
? Enter Inventory Name (xxxxxxxxxxxxx) › labo-spare
```

## バリデーターノードの移行

`slv v switch` コマンドを実行すると、移行先のネットワークを選択する画面が表示されます。

## Solana のネットワークを選択

```bash
slv v switch
? Select Solana Network ( mainnet)
  testnet
❯ mainnet
```

ここでは  mainnet を選択します。

## 移行元のバリデーターの名前を入力

```bash
✨ Switching Testnet Validator Identity...
? From Validator Identity › labo
```

## 移行先のバリデーターの名前を入力

```bash
? To Validator Identity › labo-spare
```
.
.
.
PLAY RECAP **************************************************************************************************
labo-spare      : ok=3    changed=1    unreachable=0    failed=0    skipped=2    rescued=0    ignored=0   
labo : ok=4    changed=3    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0   

Successfully swapped hosts labo and labo-spare in mainnet_validators
✅ Successfully Switched Validator Identity
```
以上で、バリデーターノードの移行が完了しました。

このコマンドが成功すると、以下のファイルの設定ファイルの中身も switch 先のノードに変更されます。

`~/.slv/inventory.mainnet.validators.yml`