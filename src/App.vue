<template>
  <main class="min-h-screen p-6 max-w-6xl mx-auto">
    <header class="mb-6 flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">hot-每日热点 · AI & 科技 仪表盘</h1>
        <p class="text-sm text-gray-400">来源：百度热搜 · 知乎热榜 · Hacker News · Product Hunt（Product Hunt 需设置 PH_TOKEN）</p>
      </div>
      <div class="text-sm text-gray-300">
        <button @click="refresh" class="px-3 py-2 border rounded-md">刷新 (Fetch)</button>
        <span class="ml-3 text-xs text-gray-400">模式：Serverless API</span>
      </div>
    </header>

    <section class="grid gap-6 md:grid-cols-2">
      <SourceSection title="百度热搜" :items="baidu" color="blue" />
      <SourceSection title="知乎热榜" :items="zhihu" color="cyan" />
      <SourceSection title="Hacker News" :items="hn" color="amber" />
      <SourceSection title="Product Hunt" :items="ph" color="rose" />
    </section>

    <footer class="mt-8 text-center text-xs text-gray-400">
      本站为个人聚合展示，若用于生产/大量抓取请遵守各站点抓取规则与使用条款。
    </footer>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SourceSection from './components/SourceSection.vue'

const baidu = ref([])
const zhihu = ref([])
const hn = ref([])
const ph = ref([])

async function fetchJson(path, fallback = []) {
  try {
    const r = await fetch(path)
    if (!r.ok) throw new Error('fetch error')
    return await r.json()
  } catch (e) {
    console.warn('fetch failed', path, e)
    return fallback
  }
}

async function loadAll() {
  baidu.value = await fetchJson('/api/baidu', [])
  zhihu.value = await fetchJson('/api/zhihu', [])
  hn.value = await fetchJson('/api/hackernews', [])
  ph.value = await fetchJson('/api/producthunt', [])
}

function refresh() { loadAll() }

onMounted(loadAll)
</script>

<style>
/* 额外样式（若需） */
</style>
