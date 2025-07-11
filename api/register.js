export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // ✅ 確認是否正確解析 JSON
  const { name, phone, birthday } = req.body || {};

  if (!name || !phone || !birthday) {
    return res.status(400).json({ success: false, message: '資料不完整' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzBOVB7bUUeWfwfVkooIwt3iylG1IO3R2APZRVvjyX3ZLEyu16l6lHIaVuwfRM8TazCCA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, birthday })
    });

    const result = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(result);
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ success: false, message: '轉送失敗: ' + error.message });
  }
}
