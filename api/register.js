export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone, birthday } = req.body;

  if (!name || !phone || !birthday) {
    return res.status(400).json({ success: false, message: '資料不完整' });
  }

  // ✅ 可選：你也可以寫入 Google Sheets，這裡先模擬成功
  return res.status(200).json({ success: true, message: '註冊成功' });
}
