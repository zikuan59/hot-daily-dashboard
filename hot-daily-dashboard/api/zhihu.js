const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get('https://www.zhihu.com/hot', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' }
    })
    const $ = cheerio.load(data)
    const list = []
    // 知乎热榜 DOM 可能经常变化，此处为通用抓取尝试
    $('.HotList-list .HotItem').each((i, el) => {
      const title = $(el).find('.HotItem-title, .HotList-item-title').text().trim()
      const href = $(el).find('a').attr('href') || ''
      if (title) list.push({ title, link: href.startsWith('http') ? href : `https://www.zhihu.com${href}`, source: '知乎' })
    })
    res.json(list.slice(0, 15))
  } catch (e) {
    console.error('zhihu err', e.message)
    res.status(500).json({ error: 'Failed to fetch Zhihu' })
  }
}
