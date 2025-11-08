const axios = require('axios')

module.exports = async (req, res) => {
  try {
    const { data: ids } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
    const top = ids.slice(0, 12)
    const items = await Promise.all(top.map(async (id) => {
      const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      return { title: data.title, link: data.url || `https://news.ycombinator.com/item?id=${id}`, source: 'Hacker News' }
    }))
    res.json(items)
  } catch (e) {
    console.error('hn err', e.message)
    res.status(500).json({ error: 'Failed to fetch HackerNews' })
  }
}
