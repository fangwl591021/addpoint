export default async function handler(req, res) {
  // ✅ 設定 CORS 頭
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  // ✅ 處理預檢請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ 限定僅接受 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // ✅ 轉送到你的 Google Apps Script Web App
    const gasRes = await fetch('https://script.google.com/macros/s/AKfycbzBOVB7bUUeWfwfVkooIwt3iylG1IO3R2APZRVvjyX3ZLEyu16l6lHIaVuwfRM8TazCCA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await gasRes.json();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: '轉送 GAS 失敗',
      error: err.message
    });
  }
}
