const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get('https://top.baidu.com/board?tab=realtime', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' }
    })
    const $ = cheerio.load(data)
    const list = []
    // 尝试常见选择器，若页面结构变化可能需微调
    $('.category-wrap_iQLoo .c-single-text-ellipsis').each((i, el) => {
      const title = $(el).text().trim()
      if (title) list.push({ title, link: null, source: '百度' })
    })
    res.json(list.slice(0, 15))
  } catch (e) {
    console.error('baidu err', e.message)
    res.status(500).json({ error: 'Failed to fetch Baidu' })
  }
}
