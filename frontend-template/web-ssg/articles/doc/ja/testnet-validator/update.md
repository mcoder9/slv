---
id: testnet-validator-update
title: Solana Testnet Validator - Update Solana Version
description: SLV - Solana Testnet Validator - Update Solana Version
---

Solana バリデーターのメンテナンスは、Solana のバージョンアップデートを行うことが含まれます。

このページでは、Solana テストネットのバリデーターのアップデート方法について説明します。

## SLV バージョンのアップデート

SLV バリデーターのバージョンをアップデートするには、以下のコマンドを実行します。

```bash
$ slv upgrade
```

## SLV デフォルトバージョン設定のアップデート

SLV バリデーターのデフォルト設定をアップデートするには、以下のコマンドを実行します。
`--config-only` フラグを使用すると、`~/.slv/versions.yml` ファイルのみがアップデートされます。

```bash
$ slv v update:version --config-only

┌─ Mainnet Validators ───────────────────────┐
  Agave: 2.1.14 → 2.1.16
  Jito: 2.1.14 → 2.1.16

┌─ Testnet Validators ───────────────────────┐
  Agave: 2.2.3 = 2.2.3
  Firedancer: 0.406.20113 = 0.406.20113

┌─ Mainnet RPCs ────────────────────────────┐
  Agave: 2.1.16 = 2.1.16
  Jito: 2.1.16 = 2.1.16
  Geyser: v5.0.1+solana.2.1.16 = v5.0.1+solana.2.1.16

✔ Default versions updated
```

上記のログのように、デフォルト設定がアップデートされました。

バージョンに変更があった場合は **->** で表示されます。

変更がない場合は **=** で表示されます。

## Solana バージョンのアップデートの適応

Solana テストネットのアップデートを適応するには、以下のコマンドを実行します。

全てのバリデーターに対してアップデートを適応する場合は、`-p` フラグを使用せずに実行します。

特定のバリデーターに対してアップデートを適応する場合は、`-p` フラグを使用してバリデーターの公開鍵を指定します。

カンマ区切りで複数の特定のバリデーターを指定することもできます。

```bash
slv v update:version -n testnet -p <your-validator-pubkey> 
```

上記のコマンドを実行すると、ノード内の Solana CLI のバージョンがアップデートされます。

このままではまだアップデートが適応されていないため、ノーダウンタイムマイグレーションまたはノードの再起動が必要です。

## Firedancer バージョンのアップデート

Firedancer の場合、新しいパッケージをマシンの中でビルドする必要があるため、
アップデートを適応するには、上記のフローに加え、以下のコマンドを実行します。

```bash
slv v setup:firedancer -p <your-validator-pubkey>
```

## Solana バージョンのアップデートの再起動

※ ⚠️ ノードの再起動は、ネットワークとの同期を失うため、ノードの再起動は慎重に行ってください。ノーダウンタイムマイグレーションを行う場合は、[こちらのガイド](/ja/doc/testnet-validator/migrate)を参照してください。

```bash
slv v restart -n testnet -p <your-validator-pubkey>
```

## デバッグ・モニタリング

デプロイ後、Solana ノード内でデバッグとモニタリングを行うことができます。
以下のコマンドを使用して、Solana ノードの状態を確認できます。

該当するバリデーターの IP アドレスを使用して SSH 接続します。
```bash
ssh solv@<your-validator-ip>
```

Solana ノードの状態を確認します。
```bash
solv m
```

`solv` は `agave-validator -l /mnt/ledger` のエイリアスです。
Solanaノードデプロイ時に この設定が `~/.profile` に追加されています。
