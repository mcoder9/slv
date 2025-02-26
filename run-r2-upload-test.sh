#!/bin/bash

# Cloudflare R2 アップロードテスト実行スクリプト

# バケット名を設定
BUCKET_NAME="slv"

# .envファイルから環境変数を読み込む
if [ -f .env ]; then
  echo ".envファイルから環境変数を読み込みます..."
  export $(grep -v '^#' .env | xargs)
else
  echo ".envファイルが見つかりません。"
fi

# 環境変数の設定を確認
if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "環境変数が設定されていません: CLOUDFLARE_ACCOUNT_ID"
  echo "この環境変数を設定するか、.envファイルに追加してください。"
  exit 1
fi

if [ -z "$CLOUDFLARE_API_TOKEN" ] && [ -z "$CLOUDFLARE_API_KEY" ]; then
  echo "認証情報が設定されていません: CLOUDFLARE_API_TOKEN または CLOUDFLARE_API_KEY"
  echo "いずれかの環境変数を設定するか、.envファイルに追加してください。"
  exit 1
fi

# 認証情報を表示
echo "Cloudflare認証情報:"
echo "アカウントID: ${CLOUDFLARE_ACCOUNT_ID:0:4}..."
if [ ! -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "APIトークン: ${CLOUDFLARE_API_TOKEN:0:4}..."
fi
if [ ! -z "$CLOUDFLARE_API_KEY" ]; then
  echo "APIキー: ${CLOUDFLARE_API_KEY:0:4}..."
fi

# test-r2-upload.tsのバケット名を更新
sed -i '' "s/const bucketName = 'slv';/const bucketName = '$BUCKET_NAME';/" test-r2-upload.ts

# スクリプトを実行
echo "Cloudflare R2 アップロードテストを実行します..."
deno run -A test-r2-upload.ts

# 終了ステータスを確認
if [ $? -eq 0 ]; then
  echo "テストが完了しました。"
else
  echo "テスト実行中にエラーが発生しました。"
  echo ""
  echo "Cloudflare APIドキュメントを参照してください: https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/"
  echo "R2 APIドキュメント: https://developers.cloudflare.com/r2/api/s3/api/"
fi
