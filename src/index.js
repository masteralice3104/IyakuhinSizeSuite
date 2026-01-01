// `src/iyaku.js` の `fetchSizes` を利用するエントリポイント
// このファイルはアプリケーションの起点のサンプルです。
// 実際の CLI や API サーバを作る場合はここに処理を追加してください。

const { fetchSizes } = require('./iyaku');

if (require.main === module) {
  // コマンドラインから直接実行された場合の簡易動作確認
  console.log('Iyakuhin Size Suite (Node.js) — サンプル実行');
  // 非同期で fetchSizes を呼び出して結果の概要を出力します。
  // 実装が未完の場合は空配列が返るため、その旨を分かりやすく出力します。
  fetchSizes('https://example.com').then(data => {
    if (Array.isArray(data)) {
      console.log(`fetchSizes: ${data.length} 件のデータ（詳細は実装参照）`);
    } else {
      console.log('fetchSizes: 返却値が配列ではありません。実装を確認してください。');
    }
  }).catch(err => {
    // 実運用ではもっと詳細にエラー処理・ログ出力を行ってください。
    console.error('fetchSizes 実行中にエラー:', err && err.message ? err.message : err);
  });
}

module.exports = { fetchSizes };
