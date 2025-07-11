// api/register.js

export const config = {
  api: {
    bodyParser: true, // 確保可接收 JSON POST
  },
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone, birthday } = req.body || {};

  if (!name || !phone || !birthday) {
    return res.status(400).json({ success: false, message: '資料不完整' });
  }

  // 模擬成功寫入
  return res.status(200).json({ success: true, message: '註冊成功' });
}
