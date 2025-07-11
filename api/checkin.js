export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone, course } = req.body;
  if (!name || !phone || !course) {
    return res.status(400).json({ success: false, message: '資料不完整' });
  }

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwy8JNfY8OxirUY3VnauHqxsBa5sViD7Cz-Axrtmoc5bINj5A_8oieRvD-CwR-yZv90/exec';

  try {
    const gsRes = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, course })
    });

    const result = await gsRes.json();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: '伺服器錯誤：' + err.message });
  }
}
