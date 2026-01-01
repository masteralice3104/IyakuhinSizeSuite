// 簡易テスト: fetchSizes が配列を返すことを検証する
// 実際の実装ではネットワークアクセスをモックするか、ローカルのサンプル入力を使ってテストしてください。

const assert = require('assert');
const { fetchSizes } = require('../src/iyaku');

(async () => {
  try {
    // サンプルデータで検証（ネットワーク不要）
    const res = await fetchSizes('sample');
    assert(Array.isArray(res), 'fetchSizes は配列を返す必要があります');
    console.log('基本テスト: fetchSizes は配列を返しました');
    console.log(`返却件数: ${res.length}`);

    // CSV 生成の検証
    const { generateCsv } = require('../src/iyaku');
    const csv = generateCsv(res);
    assert(typeof csv === 'string' && csv.includes('医薬品名称'), 'CSV が生成されていません');
    console.log('CSV 生成テスト: OK');
    console.log(csv);
  } catch (err) {
    console.error('テスト失敗:', err && err.message ? err.message : err);
    process.exitCode = 1;
  }
})();
