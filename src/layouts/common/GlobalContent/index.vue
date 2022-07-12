<template>
  <div :class="{ 'p-3': showPadding }" class="content-container bg-content">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive :include="['/code']">
          <component :is="Component" v-if="app.reloadFlag" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
interface Props {
  /** 显示padding */
  showPadding?: boolean;
}
withDefaults(defineProps<Props>(), {
  showPadding: true,
});
const app = useAppStore();
</script>

<style scoped lang="less">
.content-container {
  @apply h-full transition duration-300 ease-in-out box-border overflow-visible;
}
</style>
