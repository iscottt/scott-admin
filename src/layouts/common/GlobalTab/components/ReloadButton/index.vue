<template>
  <HoverContainer class="w-64px h-full" tooltip-content="重新加载" placement="bottom" @click="handleRefresh">
    <ReloadOutlined class="text-18px" :class="{ 'animate-spin': loading }" />
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
<style scoped></style>
