export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: '資料不完整' });
  }

  try {
    // 🔁 替換為你的 Google Apps Script Web App URL（部署為公開網頁應用程式）
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbyZtTVYfRxRBW4siOEsIX0xqSZJCbkC4ap00383E_pOUqgILvyzmqVlvzKG1-lwQxz_ZQ/exec';

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ success: false, message: '伺服器錯誤：' + error.message });
  }
}
