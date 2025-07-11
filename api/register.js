// api/register.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).json({ success: false, message: '資料不完整' });
  }

  try {
    // ✅ 實際應該送到 GAS API，這裡只是模擬
    // 若有 Google Apps Script API，可在此處發送
    // const gasRes = await fetch('https://script.google.com/macros/s/XXX/exec', {...});

    console.log('接收註冊：', { name, phone, birthday });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: '伺服器錯誤', error: error.message });
  }
}
