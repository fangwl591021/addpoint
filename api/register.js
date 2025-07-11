export const config = {
  api: {
    bodyParser: true  // 啟用內建 bodyParser，支援 JSON
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const body = req.body;

  // 安全檢查，列出收到的 body
  const { name, phone, birthday } = body || {};

  // 加上主動印出回傳的 body，供除錯
  if (!name || !phone || !birthday) {
    return res.status(400).json({
      success: false,
      message: '資料不完整',
      debug: { body } // 直接回傳 body 給你看是哪邊沒傳到
    });
  }

  // 成功回應
  return res.status(200).json({
    success: true,
    message: '註冊成功',
    data: { name, phone, birthday }
  });
}
