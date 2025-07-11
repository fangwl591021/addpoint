// api/register.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone, birthday } = req.body;

  // 資料驗證
  if (!name || !phone || !birthday) {
    return res.status(400).json({ success: false, message: '請填寫所有欄位' });
  }

  try {
    // 這裡可以串接 Google Sheets、資料庫等（目前先回傳成功）
    return res.status(200).json({ success: true, message: '註冊成功' });
  } catch (error) {
    return res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
}
