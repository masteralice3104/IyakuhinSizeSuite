**目的**

このファイルは、このリポジトリで作業する AI コーディングエージェント向けのガイドです。リポジトリの現状、参照すべきファイル、優先して確認すべき事項をまとめています。

**リポジトリのスナップショット**

- ルートの `README.md` は短い説明のみ（"医薬品のサイズデータを取得"）。
- Node.js の最小スキャフォールド（`package.json`, `src/`, `test/`）を追加済み。

**全体像 / 構成（現時点で発見できたもの）**

- **現状**: 小規模なスキャフォールド。コアロジックは `src/iyaku.js` に実装予定（現時点ではプレースホルダ）。

**最初に行うべきこと**

- **スコープ確認**: どの言語/ランタイムで実装するか（ユーザは Node.js を指定済み）。
- **要件確認**: データソース（URL/API/HTML）、期待される出力フォーマット、単位（mm など）を確認する。
- **サンプル要求**: 実装・テストに使うサンプル HTML や JSON を提供してもらう。

**確認すべき場所（チェックリスト）**

- ルート: `README.md`（日本語の実行手順と同期フローを追記済み）。
- 主要コード: `src/iyaku.js`（サイズ取得ロジックの実装箇所）、`src/index.js`（実行サンプル）。
- テスト: `test/run.js`（簡易スモークテスト）。
- パッケージ: `package.json`（start/test スクリプトあり）。

**プロジェクト固有の方針（発見されたもの）**

- ドキュメント・コードのコメントは日本語で統一してください（このリポジトリの方針）。
- 変更は頻繁にリモートへプッシュ・同期することを想定しています。README に推奨コマンドを記載済みです。

**ファイルの編集／マージ時の注意**

- 既存の `.github/copilot-instructions.md` や AGENT.md が将来存在する場合は、プロジェクト固有のコマンドや CI 設定を保持してマージしてください。

**Node.js 固有の注意**

- 既に最小スキャフォールドを追加しました: `package.json`, `src/`, `test/`。
- エントリポイント: `src/index.js`。コアロジック: `src/iyaku.js`（`fetchSizes(sourceUrl)` を実装して配列を返す）。
- 実行方法:

```bash
npm start
npm test
```

- このリポジトリは CommonJS (`type: commonjs`) を想定しています。依存を追加する場合は `npm install <pkg>` を使用してください。

**例: エージェントが行うべき具体的なアクション**

1. ユーザにデータソース（HTML のサンプル、API の URL、期待する出力形式）を確認する。
2. `src/iyaku.js` に具体的なパーサを実装する（必要なら `axios`/`cheerio` を追加）。
3. `test/run.js` を拡張して、ネットワークを使わないユニットテスト（モック）を追加する。

---
不明点や追加してほしい言語/ワークフローがあれば教えてください。必要ならこのファイルをさらに詳しく日本語で拡張します。

**Node.js-specific notes**

- A minimal Node.js scaffold has been added: `package.json`, `src/`, and `test/`.
- Entry point: `src/index.js`. Core logic: `src/iyaku.js` (implement `fetchSizes(sourceUrl)` to return an array of size objects).
- Run locally:

```bash
npm start
npm test
```

- When implementing, prefer plain CommonJS modules (this scaffold uses `type: commonjs`).
- Tests: `test/run.js` is a minimal smoke test asserting `fetchSizes` returns an array.
