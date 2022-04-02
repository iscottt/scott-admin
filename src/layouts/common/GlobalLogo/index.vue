<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden">
    <div v-if="!showTitle" class="leading-70px text-30px font-bin align-center overflow-hidden">Scott Admin</div>
    <h2 v-show="showTitle" class="pl-8px mb-0 text-30px font-bold text-primary transition duration-300 ease-in-out">S</h2>
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
<style scoped></style>
