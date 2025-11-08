const axios = require('axios')

module.exports = async (req, res) => {
  const token = process.env.PH_TOKEN
  if (!token) return res.status(400).json({ error: 'Missing PH_TOKEN environment variable' })

  try {
    const query = {
      query: `{
        posts(order: RANKING, first: 10) {
          edges { node { name url tagline } }
        }
      }`
    }
    const { data } = await axios.post('https://api.producthunt.com/v2/api/graphql', query, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const posts = (data?.data?.posts?.edges || []).map(e => ({ title: `${e.node.name} — ${e.node.tagline || ''}`, link: e.node.url, source: 'Product Hunt' }))
    res.json(posts)
  } catch (e) {
    console.error('ph err', e.message)
    res.status(500).json({ error: 'Failed to fetch Product Hunt' })
  }
}
