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

  // 簡易実装:
  // - sourceUrl === 'sample' の場合はサンプルデータを返す
  // - ローカルファイル（.json/.csv）の場合は読み込んでパースして返す
  // - URL(http/https) の場合は JSON を期待して取得を試みる（実運用では追加の堅牢性が必要）
  const fs = require('fs').promises;
  const path = require('path');

  if (!sourceUrl || sourceUrl === 'sample') {
    // サンプルデータ（テストや動作確認用）
    return [
      { name: 'サンプル薬品A', width: 10, height: 20, depth: 5, unit: 'mm' },
      { name: 'サンプル薬品B', width: 12, height: 22, depth: 6, unit: 'mm' }
    ];
  }

  // ローカルファイルの読み込み
  if (!/^https?:\/\//i.test(sourceUrl)) {
    const p = path.resolve(sourceUrl);
    const ext = path.extname(p).toLowerCase();
    try {
      const raw = await fs.readFile(p, 'utf8');
      if (ext === '.json') {
        return JSON.parse(raw);
      }
      if (ext === '.csv') {
        // 単純な CSV パーサ: 1行目ヘッダ、カンマ区切り
        const lines = raw.split(/\r?\n/).filter(Boolean);
        if (lines.length === 0) return [];
        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
          const cols = line.split(',');
          const obj = {};
          headers.forEach((h, i) => { obj[h] = cols[i] ? cols[i].trim() : ''; });
          // 期待するフィールド名に合わせて変換する
          return {
            name: obj['医薬品名称'] || obj['name'] || obj['名称'] || '',
            // サイズ欄が単一文字列の場合は size に格納
            size: obj['サイズ'] || obj['size'] || obj['寸法'] || ''
          };
        });
      }
      // 未対応拡張子: 空配列を返す
      return [];
    } catch (err) {
      throw new Error('ローカルファイル読み込みに失敗しました: ' + err.message);
    }
  }

  // HTTP(S) の場合（簡易）: JSON を期待して取得
  const https = require('https');
  return new Promise((resolve, reject) => {
    try {
      https.get(sourceUrl, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (err) {
            // JSON でなければ空配列を返す
            resolve([]);
          }
        });
      }).on('error', err => reject(new Error('HTTP 取得エラー: ' + err.message)));
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { fetchSizes };

/**
 * サイズ情報を文字列に整形する
 * - width/height/depth が存在する場合は "W×H×D 単位" の形式で返す
 * - item.size（既に文字列）を持つ場合はそのまま返す
 */
function formatSize(item) {
  if (!item) return '';
  if (item.size) return String(item.size).trim();
  const w = item.width != null ? String(item.width) : null;
  const h = item.height != null ? String(item.height) : null;
  const d = item.depth != null ? String(item.depth) : null;
  const unit = item.unit || 'mm';
  if (w && h && d) return `${w}×${h}×${d} ${unit}`;
  // 部分的な情報があれば結合して返す
  const parts = [];
  if (w) parts.push(`W:${w}`);
  if (h) parts.push(`H:${h}`);
  if (d) parts.push(`D:${d}`);
  return parts.length ? (parts.join(' ') + ` ${unit}`) : '';
}

/**
 * `items` を CSV 文字列に変換する
 * ヘッダ: 医薬品名称,サイズ
 */
function generateCsv(items) {
  const escape = s => {
    if (s == null) return '';
    const str = String(s);
    if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };
  const header = ['医薬品名称', 'サイズ'];
  const lines = [header.join(',')];
  for (const it of items) {
    const name = it.name || it.名称 || '';
    const size = formatSize(it);
    lines.push([escape(name), escape(size)].join(','));
  }
  return lines.join('\n');
}

module.exports = { fetchSizes, generateCsv, formatSize };
