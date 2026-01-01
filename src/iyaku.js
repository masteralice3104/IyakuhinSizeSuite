/**
 * 薬品サイズデータを取得するための関数の雛形
 *
 * 実装方針（例）:
 * - HTTP API がある場合: `axios` 等で JSON を取得してパースする
 * - HTML ページから抽出する場合: `cheerio` 等で DOM を解析してサイズ情報をスクレイピングする
 *
 * 返却形式の例:
 * [
 *   { name: '薬品A', width: 10, height: 20, depth: 5, unit: 'mm' },
 *   { name: '薬品B', width: 12, height: 22, depth: 6, unit: 'mm' }
 * ]
 *
 * 注意:
 * - ネットワークアクセスや外部サービスの利用時はタイムアウトやエラー処理を必ず実装すること。
 * - テスト時はネットワークアクセスをモックするか、ローカルのサンプルデータを使うこと。
 *
 * TODO:
 * - 実際のデータソースが決まったら、ここに具体的なパーサを実装してください。
 */
async function fetchSizes(sourceUrl) {
  // 現状はプレースホルダ。
  // 例として axios/cheerio を利用する実装の骨子をコメントで示します。

  // 例: axios を使って JSON API から取得する場合の疑似コード
  // const axios = require('axios');
  // const resp = await axios.get(sourceUrl, { timeout: 5000 });
  // if (resp.status !== 200) throw new Error('Failed to fetch');
  // return resp.data.items.map(item => ({ name: item.name, width: item.w, height: item.h, depth: item.d, unit: item.unit }));

  // 例: cheerio を使って HTML をスクレイピングする場合の疑似コード
  // const axios = require('axios');
  // const cheerio = require('cheerio');
  // const html = (await axios.get(sourceUrl)).data;
  // const $ = cheerio.load(html);
  // const rows = [];
  // $('.table tr').each((i, el) => {
  //   const cells = $(el).find('td');
  //   if (cells.length >= 4) {
  //     rows.push({
  //       name: $(cells[0]).text().trim(),
  //       width: parseFloat($(cells[1]).text()),
  //       height: parseFloat($(cells[2]).text()),
  //       depth: parseFloat($(cells[3]).text()),
  //       unit: 'mm'
  //     });
  //   }
  // });
  // return rows;

  // 今は空配列を返す（実装者が上記のサンプルを参考に実装する）
  return [];
}

module.exports = { fetchSizes };
