# LIFF Mini App Template

LINE Front-end Framework (LIFF) を使用したミニアプリのテンプレートです。

## セットアップ

1. 依存関係をインストール:
```bash
npm install
```

2. 環境変数を設定:
```bash
cp .env.example .env
```

3. `.env` ファイルで LIFF ID を設定:
```
VITE_LIFF_ID=your_liff_id_here
```

## 開発

```bash
npm run dev
```

## ビルド

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

開発環境では`@line/liff-mock`を使用してLIFF APIをシミュレートし、実際のLIFFアプリを作成せずに開発・テストが可能です。

### モックモードの特徴

- 🎭 公式LIFF Mock Pluginによる完全なシミュレート
- 🚀 実際のLIFF IDなしで開発開始可能
- 🔄 本番環境では自動的に実際のLIFF SDKに切り替え
- ⚙️ 環境変数`VITE_USE_LIFF_MOCK=true`で制御

### モック設定

`.env`ファイルでモック機能を制御：
```
VITE_USE_LIFF_MOCK=true  # 開発環境でモック使用
```


## LIFF アプリの作成方法

1. [LINE Developers Console](https://developers.line.biz/console/) にアクセス
2. プロバイダーとチャンネルを作成
3. LIFF タブから新しい LIFF アプリを追加
4. エンドポイント URL を設定（例: `https://yourdomain.com`）
5. 生成された LIFF ID を `.env` ファイルに設定

## 技術スタック

- React 18
- TypeScript
- Vite
- Tailwind CSS
- LINE LIFF SDK v2
- Lucide React (アイコン)
