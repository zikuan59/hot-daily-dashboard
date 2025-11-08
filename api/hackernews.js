export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  try {
    const topIds = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(r => r.json());
    const stories = await Promise.all(
      topIds.slice(0, 10).map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
      )
    );
    res.status(200).json({
      source: 'hackernews',
      updated_at: new Date().toISOString(),
      data: stories
    });
  } catch (err) {
    res.status(500).json({ source: 'hackernews', error: err.message });
  }
}