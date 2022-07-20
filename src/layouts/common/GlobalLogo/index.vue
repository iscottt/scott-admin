<template>
  <router-link :to="routeHomePath" class="title-content">
    <div v-if="!showTitle" class="title">
      <img src="https://s6.ui.cn/img/yearlogo.png" />
      <span>ScottAdmin</span>
    </div>
    <h2 v-show="showTitle" class="mobile-title">
      <img src="https://s6.ui.cn/img/yearlogo.png" />
    </h2>
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
  @apply flex h-72px content-center justify-center w-full whitespace-nowrap py-2 box-border;
}
.title {
  // box-shadow: 0px 15px 6px -15px rgba(0, 0, 0, 0.1);
  @apply w-284px box-border flex items-center justify-center text-2xl font-bin text-center overflow-hidden text-black pr-15px;
  img {
    @apply w-60px h-52px block;
  }
}
.mobile-title {
  @apply text-3xl font-bin transition duration-300 ease-in-out text-blue-600  border-b m-0;
  img {
    @apply w-60px h-52px block;
  }
}
</style>
