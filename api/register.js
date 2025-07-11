export default async function handler(req, res) {
  // 設定 CORS Header
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 處理 OPTIONS 預檢請求（preflight）
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允許 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).json({ success: false, message: '請填寫所有欄位' });
  }

  // TODO: 可加上寫入 Google Sheets 等邏輯

  return res.status(200).json({ success: true, message: '註冊成功' });
}
