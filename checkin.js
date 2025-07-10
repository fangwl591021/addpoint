export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone, course } = req.body;

  if (!name || !phone || !course) {
    return res.status(400).json({ success: false, message: '缺少必要參數' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzBOVB7bUUeWfwfVkooIwt3iylG1IO3R2APZRVvjyX3ZLEyu16l6lHIaVuwfRM8TazCCA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, course })
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true, message: '資料已成功寫入 Google Sheets' });
    } else {
      return res.status(500).json({ success: false, message: data.message || 'GAS 回傳錯誤' });
    }

  } catch (err) {
    return res.status(500).json({ success: false, message: '中繼伺服器錯誤', error: err.message });
  }
}
