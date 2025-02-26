/**
 * テスト用スクリプト: Cloudflare R2へのファイルアップロード
 * 
 * このスクリプトはCloudflare APIを直接使用してファイルをアップロードします
 * 参考: https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/
 */

// Denoの型定義を使用
/// <reference lib="deno.ns" />

// このファイルをモジュールとしてマークする
export {};

// 環境変数からCloudflare認証情報を取得
const accountId = Deno.env.get('CLOUDFLARE_ACCOUNT_ID')!
const apiToken = Deno.env.get('CLOUDFLARE_API_TOKEN')!
const apiKey = Deno.env.get('CLOUDFLARE_API_KEY') || '';
const email = Deno.env.get('CLOUDFLARE_EMAIL') || '';

if (!accountId || (!apiToken && !apiKey)) {
  console.error('環境変数が設定されていません: CLOUDFLARE_ACCOUNT_ID と (CLOUDFLARE_API_TOKEN または CLOUDFLARE_API_KEY)');
  Deno.exit(1);
}

// テスト用のパラメータ
const bucketName = 'slv'; // 実際のバケット名に変更してください
const objectKey = 'test-file.txt';
const localFilePath = './test-file.txt';

// テスト用のファイルを作成
await Deno.writeTextFile(localFilePath, 'これはテスト用のファイルです。');
console.log(`テスト用ファイルを作成しました: ${localFilePath}`);

/**
 * Cloudflare APIを使用してR2バケットの一覧を取得
 */
async function listR2Buckets() {
  console.log('\n--- R2バケットの一覧を取得 ---');
  
  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets`;
    
    // 認証情報を確認
    console.log(`アカウントID: ${accountId.substring(0, 4)}...`);
    
    let headers: Record<string, string> = {};
    
    // APIトークンがある場合はそれを使用
    if (apiToken) {
      console.log(`APIトークン認証を使用`);
      headers = {
        'Authorization': `Bearer ${apiToken}`,
      };
    } 
    // APIキーとメールアドレスがある場合はそれを使用
    else if (apiKey && email) {
      console.log(`APIキー認証を使用`);
      headers = {
        'X-Auth-Email': email,
        'X-Auth-Key': apiKey,
      };
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ R2バケットの一覧取得に成功しました');
      console.log('バケット一覧:');
      data.result.buckets.forEach((bucket: any) => {
        console.log(`- ${bucket.name}`);
      });
      return data.result.buckets;
    } else {
      const errorText = await response.text();
      console.error('❌ R2バケットの一覧取得に失敗しました');
      console.error(`ステータス: ${response.status} ${response.statusText}`);
      console.error(`エラー: ${errorText}`);
      return [];
    }
  } catch (error) {
    console.error('❌ APIリクエスト中にエラーが発生しました:', error);
    return [];
  }
}

/**
 * Cloudflare APIを直接使用してファイルをアップロード
 */
async function uploadWithDirectApi() {
  console.log('\n--- Cloudflare APIを直接使用したアップロード ---');
  
  try {
    // ファイルを読み込む
    const fileContent = await Deno.readFile(localFilePath);
    
    // R2にアップロード
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${objectKey}`;
    
    let headers: Record<string, string> = {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${objectKey}`,
    };
    
    // APIトークンがある場合はそれを使用
    if (apiToken) {
      console.log(`APIトークン認証を使用してアップロード中...`);
      headers = {
        ...headers,
        'Authorization': `Bearer ${apiToken}`,
      };
    } 
    // APIキーとメールアドレスがある場合はそれを使用
    else if (apiKey && email) {
      console.log(`APIキー認証を使用してアップロード中...`);
      headers = {
        ...headers,
        'X-Auth-Email': email,
        'X-Auth-Key': apiKey,
      };
    }
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: fileContent,
    });
    
    if (response.ok) {
      console.log('✅ APIを直接使用したアップロードが成功しました');
      console.log(`ステータス: ${response.status} ${response.statusText}`);
    } else {
      const errorText = await response.text();
      console.error('❌ APIを直接使用したアップロードが失敗しました');
      console.error(`ステータス: ${response.status} ${response.statusText}`);
      console.error(`エラー: ${errorText}`);
      
      // エラーの詳細を表示
      console.error('\n詳細なエラー情報:');
      console.error('使用したURL:', url);
      console.error('使用したヘッダー:', JSON.stringify(headers, null, 2));
      
      // 認証情報の確認を促す
      console.error('\n認証情報を確認してください:');
      console.error('1. APIトークンに適切な権限が付与されているか確認してください');
      console.error('   - R2ストレージの読み取り/書き込み権限が必要です');
      console.error('2. アカウントIDが正しいか確認してください');
      console.error('3. バケット名が正しいか確認してください');
    }
  } catch (error) {
    console.error('❌ APIリクエスト中にエラーが発生しました:', error);
  }
}

// テストを実行
console.log('Cloudflare R2へのファイルアップロードテストを開始します...');

// まずバケットの一覧を取得
await listR2Buckets();

// APIを直接使用してアップロード
await uploadWithDirectApi();

// テスト用ファイルを削除
await Deno.remove(localFilePath);
console.log(`\nテスト用ファイルを削除しました: ${localFilePath}`);
