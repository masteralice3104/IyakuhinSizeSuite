// 簡易テスト: fetchSizes が配列を返すことを検証する
// 実際の実装ではネットワークアクセスをモックするか、ローカルのサンプル入力を使ってテストしてください。

const assert = require('assert');
const { fetchSizes } = require('../src/iyaku');

(async () => {
  try {
    const res = await fetchSizes('https://example.com');
    // 期待: 空配列でも配列であれば最小要件を満たす
    assert(Array.isArray(res), 'fetchSizes は配列を返す必要があります');
    console.log('基本テスト: OK');
    console.log(`返却件数: ${res.length}`);
  } catch (err) {
    console.error('テスト失敗:', err && err.message ? err.message : err);
    process.exitCode = 1;
  }
})();
