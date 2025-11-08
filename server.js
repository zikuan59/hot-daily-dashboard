/*
Local Express server for testing API endpoints locally.
This is optional — Vercel will deploy `api/*.js` as serverless functions.
Run: node server.js
*/
const express = require('express')
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))

// baidu local proxy
app.get('/api/baidu', async (req, res) => {
  try {
    const { data } = await axios.get('https://top.baidu.com/board?tab=realtime', { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } })
    const $ = cheerio.load(data)
    const list = []
    $('.category-wrap_iQLoo .c-single-text-ellipsis').each((i, el) => {
      const title = $(el).text().trim()
      if (title) list.push({ title, link: null, source: '百度' })
    })
    res.json(list.slice(0, 15))
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ error: 'baidu fetch failed' })
  }
})

// zhihu
app.get('/api/zhihu', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.zhihu.com/hot', { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } })
    const $ = cheerio.load(data)
    const list = []
    $('.HotList-list .HotItem').each((i, el) => {
      const title = $(el).find('.HotItem-title, .HotList-item-title').text().trim()
      const href = $(el).find('a').attr('href') || ''
      if (title) list.push({ title, link: href.startsWith('http') ? href : `https://www.zhihu.com${href}`, source: '知乎' })
    })
    res.json(list.slice(0, 15))
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ error: 'zhihu fetch failed' })
  }
})

// hackernews
app.get('/api/hackernews', async (req, res) => {
  try {
    const { data: ids } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
    const top = ids.slice(0, 12)
    const items = await Promise.all(top.map(async (id) => {
      const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      return { title: data.title, link: data.url || `https://news.ycombinator.com/item?id=${id}`, source: 'Hacker News' }
    }))
    res.json(items)
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ error: 'hn fetch failed' })
  }
})

// product hunt
app.get('/api/producthunt', async (req, res) => {
  const token = process.env.PH_TOKEN
  if (!token) return res.status(400).json({ error: 'Missing PH_TOKEN env var' })
  try {
    const query = {
      query: `{
        posts(order: RANKING, first: 10) {
          edges { node { name url tagline } }
        }
      }`
    }
    const { data } = await axios.post('https://api.producthunt.com/v2/api/graphql', query, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
    const posts = (data?.data?.posts?.edges || []).map(e => ({ title: `${e.node.name} — ${e.node.tagline || ''}`, link: e.node.url, source: 'Product Hunt' }))
    res.json(posts)
  } catch (e) {
    console.error(e.message)
    res.status(500).json({ error: 'ph fetch failed' })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Local API server running on http://localhost:${port}`))
