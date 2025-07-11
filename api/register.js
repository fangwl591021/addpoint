export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  let body = req.body;

  // 有些 Vercel 環境 bodyParser 會失效，這邊備援 parse
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'JSON 格式錯誤' });
    }
  }

  const { name, phone, birthday } = body || {};

  if (!name || !phone || !birthday) {
    return res.status(400).json({ success: false, message: '資料不完整', body });
  }

  // 回傳成功並顯示接收到的資料
  return res.status(200).json({
    success: true,
    message: '註冊成功',
    data: { name, phone, birthday }
  });
}
