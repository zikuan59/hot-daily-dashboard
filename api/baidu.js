export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  try {
    const data = await fetch('https://top.baidu.com/api/board?platform=pc&tab=realtime').then(r => r.json());
    res.status(200).json({
      source: 'baidu',
      updated_at: new Date().toISOString(),
      data: data?.data?.cards || []
    });
  } catch (err) {
    res.status(500).json({ source: 'baidu', error: err.message });
  }
}