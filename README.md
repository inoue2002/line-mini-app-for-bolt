# LIFF Mini App Template

LINE Front-end Framework (LIFF) を使用したミニアプリのテンプレートです。

## 開発の流れ

### 1. リポジトリの作成
1. このリポジトリの右上の「Use this template」ボタンをクリック
2. 新しいリポジトリ名を入力して作成

### 2. Bolt.newでのインポート
1. [Bolt.new](https://bolt.new) にアクセス
2. 「Import from GitHub」で作成したリポジトリをインポート

### 3. 環境設定
1. `.env.example`を`.env`にコピー:
```bash
cp .env.example .env
```

2. [LINE Developers Console](https://developers.line.biz/console/) でLIFF IDを取得
3. `.env` ファイルでLIFF IDを設定:
```
VITE_LIFF_ID=your_liff_id_here
```

### 4. 開発
```bash
npm install
npm run dev
```

### 5. デプロイ & LIFF設定
1. Bolt.newまたは任意のホスティングサービスでデプロイ
2. デプロイされたURLをコピー
3. [LINE Developers Console](https://developers.line.biz/console/) のLIFF設定で「エンドポイントURL」にデプロイURLを設定

## コマンド

### 開発サーバー起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

## 機能

- ✅ LIFF SDK 統合
- ✅ LINE ログイン
- ✅ プロフィール情報の取得
- ✅ メッセージ送信（LINE内ブラウザのみ）
- ✅ アプリケーション終了（LINE内ブラウザのみ）
- ✅ レスポンシブデザイン
- ✅ TypeScript サポート
- ✅ **モック機能** - 開発環境で LIFF API をシミュレート

## モック機能

開発環境（`npm run dev`）では自動的に`@line/liff-mock`を使用してLIFF APIをシミュレートし、実際のLIFFアプリを作成せずに開発・テストが可能です。

### モックモードの特徴

- 🎭 公式LIFF Mock Pluginによる完全なシミュレート
- 🚀 実際のLIFF IDなしで開発開始可能
- 🔄 本番環境（ビルド後）では自動的に実際のLIFF SDKに切り替え
- ⚙️ `npm run dev`で自動的にモック有効、ビルド時は自動的に無効


## LIFF アプリの作成方法

### 初回設定時
1. [LINE Developers Console](https://developers.line.biz/console/) にアクセス
2. プロバイダーとチャンネルを作成
3. LIFF タブから新しい LIFF アプリを追加
4. 一時的なエンドポイント URL を設定（例: `https://example.com`）
5. 生成された LIFF ID を `.env` ファイルに設定
6. 開発完了後、実際のデプロイURLでエンドポイントURLを更新

## 技術スタック

- React 18
- TypeScript
- Vite
- Tailwind CSS
- LINE LIFF SDK v2
- Lucide React (アイコン)
