<template>
  <a-layout class="layout">
    <!--      侧边菜单栏start-->
    <global-sider :collapsed="collapsed" />
    <!--      侧边菜单栏end-->
    <a-layout>
      <GlobalHeader v-model:collapsed="collapsed" />
      <a-layout-content>
        <GlobalTab />
        <GlobalContent />
      </a-layout-content>
      <GlobalFooter />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GlobalSider, GlobalHeader, GlobalFooter, GlobalTab, GlobalContent } from '../common';
const collapsed = ref<boolean>(false);
</script>
<style scoped lang="less">
.layout {
  @apply flex h-full overflow-hidden;
}
</style>
