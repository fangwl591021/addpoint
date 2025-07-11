export default async function handler(req, res) {
  // CORS 設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 預檢請求直接回應
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 限制僅接受 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // 解析與驗證欄位
  const { name, phone, birthday } = req.body || {};
  if (!name || !phone || !birthday) {
    return res.status(400).json({
      success: false,
      message: '資料不完整',
      debug: { name, phone, birthday }
    });
  }

  try {
    // 轉發至 GAS Web App
    const response = await fetch('https://script.google.com/macros/s/AKfycbzBOVB7bUUeWfwfVkooIwt3iylG1IO3R2APZRVvjyX3ZLEyu16l6lHIaVuwfRM8TazCCA/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: String(name),
        phone: String(phone),
        birthday: String(birthday)
      })
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '轉送失敗：' + error.message
    });
  }
}
