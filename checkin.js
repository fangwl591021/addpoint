export default async function handler(req, res) {
  // 🔓 CORS 設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // 預檢通過
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, phone, course } = req.body || {};

    if (!name || !phone || !course) {
      return res.status(400).json({ success: false, message: '缺少必要欄位' });
    }

    const gasRes = await fetch('https://script.google.com/macros/s/AKfycbzBOVB7bUUeWfwfVkooIwt3iylG1IO3R2APZRVvjyX3ZLEyu16l6lHIaVuwfRM8TazCCA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, course })
    });

    const result = await gasRes.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: '轉送 GAS 失敗', error: err.message });
  }
}
