export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: '資料不完整' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyZtTVYfRxRBW4siOEsIX0xqSZJCbkC4ap00383E_pOUqgILvyzmqVlvzKG1-lwQxz_ZQ/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: '轉送失敗：' + error.message });
  }
}
