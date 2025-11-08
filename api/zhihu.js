export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  try {
    const data = await fetch('https://api.zhihu.com/topstory/hot-list').then(r => r.json());
    res.status(200).json({
      source: 'zhihu',
      updated_at: new Date().toISOString(),
      data: data?.data || []
    });
  } catch (err) {
    res.status(500).json({ source: 'zhihu', error: err.message });
  }
}