npm test
# IyakuhinSizeSuite
医薬品のサイズデータを取得するためのプロジェクト（Node.js スキャフォールド）

このリポジトリには最小限の雛形が含まれています。全体は日本語で記述されています。

実行方法:

```bash
# 起動
npm start

# テスト(最小)
npm test
```

開発・同期（推奨ワークフロー）:

頻繁に push と同期を行う場合の手順例:

```bash
# 変更をステージしてコミット
git add -A
git commit -m "作業内容の短い説明"

# リモートにプッシュ（main ブランチを想定）
git push origin main

# 最新を取り込む
git pull --rebase origin main
```

実装の流れ:
- `src/iyaku.js` にサイズ取得ロジックを実装してください（コメントに実装例あり）。
- `src/index.js` はサンプルのエントリポイントです。

テストについて:
- `test/run.js` は最小限のスモークテストです。外部アクセスを行う実装の場合はネットワークをモックしてください。


