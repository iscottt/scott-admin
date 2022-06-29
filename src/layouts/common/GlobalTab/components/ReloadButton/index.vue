<template>
  <HoverContainer class="button-container" tooltip-content="重新加载" placement="bottom" @click="handleRefresh">
    <ReloadOutlined class="text-lg" :class="{ 'animate-spin': loading }" />
  </HoverContainer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { useLoading } from '@/hooks';
import { ReloadOutlined } from '@ant-design/icons-vue';
import HoverContainer from '@/components/common/HoverContainer.vue';

const app = useAppStore();
const { loading, startLoading, endLoading } = useLoading();

function handleRefresh() {
  startLoading();
  app.reloadPage();
  setTimeout(() => {
    endLoading();
  }, 1000);
}
</script>
<style scoped lang="less">
.button-container {
  @apply h-full flex items-center justify-center;
}
</style>
