<template>
  <section :class="panelClass">
    <h2 class="text-lg font-semibold mb-3">{{ title }}</h2>
    <ul class="space-y-2">
      <li v-for="(item,i) in items" :key="i" class="flex items-start gap-3">
        <div class="w-10 text-xs text-gray-400">{{ i+1 }}</div>
        <div class="flex-1">
          <a :href="item.link || '#'" target="_blank" rel="noopener noreferrer" class="hover:underline">
            <div class="font-medium">{{ item.title }}</div>
            <div v-if="item.summary" class="text-sm text-gray-300 mt-1">{{ item.summary }}</div>
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
const props = defineProps({
  title: String,
  items: { type: Array, default: () => [] },
  color: { type: String, default: 'blue' }
})

const panelClass = `bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] rounded-2xl p-4`
</script>

<style scoped>
/* 组件内必要样式，tailwind 已处理大部分 */
</style>
