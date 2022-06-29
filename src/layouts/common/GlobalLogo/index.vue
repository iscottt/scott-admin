<template>
  <router-link :to="routeHomePath" class="title-content">
    <div v-if="!showTitle" class="title">Scott Admin</div>
    <h2 v-show="showTitle" class="mobile-title">S</h2>
  </router-link>
</template>

<script setup lang="ts">
import { routePath } from '@/router';

interface Props {
  /** 显示名字 */
  showTitle: boolean;
}

defineProps<Props>();

const routeHomePath = routePath('root');
</script>
<style scoped lang="less">
.title-content {
  @apply flex content-center justify-center w-full whitespace-nowrap py-2 box-border;
}
.title {
  @apply text-3xl font-bin text-center overflow-hidden;
}
.mobile-title {
  @apply pl-8 mb-0 text-2xl font-bold transition duration-300 ease-in-out;
}
</style>
