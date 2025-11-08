export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const token = process.env.PRODUCT_HUNT_TOKEN;
  if (!token) {
    return res.status(400).json({ source: 'producthunt', error: '缺少 PRODUCT_HUNT_TOKEN 环境变量' });
  }

  try {
    const result = await fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{
          posts(order: VOTES, postedAfter: "2024-01-01T00:00:00Z") {
            edges {
              node {
                id
                name
                tagline
                votesCount
                url
              }
            }
          }
        }`
      })
    }).then(r => r.json());

    res.status(200).json({
      source: 'producthunt',
      updated_at: new Date().toISOString(),
      data: result?.data?.posts?.edges?.map(e => e.node) || []
    });
  } catch (err) {
    res.status(500).json({ source: 'producthunt', error: err.message });
  }
}