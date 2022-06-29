<template>
  <a-layout-sider :collapsed="props.collapsed" :width="asiderWidth" :trigger="null" collapsible>
    <div class="flex-col-stretch h-full">
      <global-logo :show-title="props.collapsed" :collapsed="props.collapsed" />
      <div class="flex-1-hidden">
        <a-menu
          v-model:open-keys="state.openKeys"
          v-model:selected-keys="state.selectedKeys"
          mode="inline"
          theme="dark"
          :collapsed="props.collapsed"
          collapsible
          @click="clickMenuItem"
        >
          <template v-for="item in menus" :key="item.routePath">
            <MenuItem :menu-info="item" />
          </template>
        </a-menu>
      </div>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { GlobalLogo } from '@/layouts/common';
import MenuItem from './menuItem.vue';
import { computed, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouteStore } from '@/store';
import { useRouterPush } from '@/composables';
import { getActiveKeyPathsOfMenus } from '@/utils';
const props = defineProps({
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
  },
});
// 自定义侧边栏菜单收缩和展开时的宽度
const asiderWidth = computed(() => (props.collapsed ? 80 : 256));
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();
// 当前路由
const currentRoute = useRoute();

const state = reactive({
  openKeys: ['/dashboard'] as any,
  selectedKeys: [currentRoute.fullPath] as any,
});

const clickMenuItem = ({ key }) => {
  if (key === currentRoute.name) return;
  routerPush(key);
};

const menus = computed(() => {
  return [...routeStore.menus].filter((n) => !n.hideInMenu) || [];
});

// 跟随页面路由变化，切换菜单选中状态
watch(
  () => currentRoute.fullPath,
  () => {
    if (currentRoute.name === 'login' || props.collapsed) return;
    state.openKeys = getActiveKeyPathsOfMenus(state.selectedKeys[0], routeStore.menus);
  },
  {
    immediate: true,
  }
);
</script>
<style scoped></style>
