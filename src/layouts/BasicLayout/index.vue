<template>
  <a-layout class="layout">
    <!--      侧边菜单栏start-->
    <global-sider v-if="!isMobile" :collapsed="collapsed" />
    <!--      侧边菜单栏end-->
    <!-- 移动端 start -->
    <a-drawer
      v-if="isMobile"
      width="256px"
      :closable="false"
      :drawerStyle="{ background: '#041527' }"
      :bodyStyle="{ padding: 0 }"
      v-model:visible="collapsed"
      placement="right"
    >
      <global-sider />
    </a-drawer>
    <!-- 移动端 end -->
    <!-- 右侧内容 start-->
    <a-layout>
      <GlobalHeader v-model:collapsed="collapsed" />
      <GlobalTab />
      <a-layout-content class="layout-content">
        <GlobalContent />
        <GlobalFooter />
      </a-layout-content>
    </a-layout>
    <!-- 右侧内容 end-->
  </a-layout>
</template>

<script setup lang="ts">
import { EnumDeviceType } from '@/enum';
import { useAppStore } from '@/store';
import { ref, watch } from 'vue';
import { GlobalSider, GlobalHeader, GlobalFooter, GlobalTab, GlobalContent } from '../common';
const collapsed = ref<boolean>(false);
const app = useAppStore();
// 获取设备终端判断
const isMobile = computed(() => {
  return app.device === EnumDeviceType.mobile;
});
const route = useRoute();
/**
 * 监听路由变化，当设备为移动端时，路由变化关闭抽屉组件
 */
watch(
  () => {
    route.fullPath;
  },
  () => {
    isMobile && (collapsed.value = false);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
<style scoped lang="less">
.layout {
  @apply flex h-full;
}
.ant-layout-content {
  min-height: auto !important;
  @apply pl-256px pt-108px;
}
</style>
