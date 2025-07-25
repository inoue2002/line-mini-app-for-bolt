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

開発環境では自動的にモックモードが有効になり、実際のLIFFアプリを作成せずに開発・テストが可能です。

### モックモードの特徴

- 🎭 LIFF API の完全なシミュレート
- 🔧 開発者コンソールから動的に設定を変更可能
- 🚀 実際のLIFF IDなしで開発開始可能
- 🔄 本番環境では自動的に実際のLIFF SDKに切り替え

### 開発者コマンド

ブラウザの開発者コンソールで以下のコマンドが使用できます：

```javascript
// LINE内ブラウザモードに切り替え
window.liffMock.setMockClientMode(true);

// プロフィール情報を変更
window.liffMock.setMockProfile({
  displayName: "新しい表示名",
  statusMessage: "新しいステータス"
});

// ログアウト状態に変更
window.liffMock.setMockLoginState(false);
```

### URLパラメータ

- `?mock_client=true` - LINE内ブラウザモードをシミュレート

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
