<template>
  <div class="h-full flex items-end">
    <context-menu v-model:visible="dropdown.visible" :current-path="dropdown.currentPath">
      <div ref="tabRef">
        <ChromeTab
          :key="item.path"
          v-for="(item, index) in tab.tabs"
          :is-active="tab.activeTab === item.path"
          primary-color="#1890ff"
          :closable="item.path !== tab.homeTab.path"
          :class="{ '!mr-0': index === tab.tabs.length - 1 }"
          @click="tab.handleClickTab(item.path)"
          @close="tab.removeTab(item.path)"
          @contextmenu="handleContextMenu($event, item.path)"
        >
          <Icon v-if="item.meta.icon" :icon="item.meta.icon" class="inline-block align-text-bottom mr-4px text-16px" />
          {{ item.meta.title }}
        </ChromeTab>
      </div>
    </context-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import { ChromeTab } from 'soybean-admin-tab';
import { Icon } from '@iconify/vue';
import { useTabStore } from '@/store';
import { setTabRoutes } from '@/utils';
import { ContextMenu } from './components';

interface Emits {
  (e: 'scroll', clientX: number): void;
}

const emit = defineEmits<Emits>();

const tab = useTabStore();

// 获取当前激活的tab的clientX
const tabRef = ref<HTMLElement>();
async function getActiveTabClientX() {
  await nextTick();
  if (tabRef.value) {
    const activeTabElement = tabRef.value.children[tab.activeTabIndex];
    const { x, width } = activeTabElement.getBoundingClientRect();
    const clientX = x + width / 2;
    setTimeout(() => {
      emit('scroll', clientX);
    }, 50);
  }
}

const dropdown = reactive({
  visible: false,
  x: 0,
  y: 0,
  currentPath: '',
});
function showDropdown() {
  dropdown.visible = true;
}
function hideDropdown() {
  dropdown.visible = false;
}
function setDropdown(x: number, y: number, currentPath: string) {
  Object.assign(dropdown, { x, y, currentPath });
}

/** 点击右键菜单 */
async function handleContextMenu(e: MouseEvent, path: string) {
  e.preventDefault();
  const { clientX, clientY } = e;
  hideDropdown();
  setDropdown(clientX, clientY, path);
  await nextTick();
  showDropdown();
}

watch(
  () => tab.activeTabIndex,
  () => {
    getActiveTabClientX();
  },
  {
    immediate: true,
  }
);

/** 页面离开时缓存多页签数据 */
useEventListener(window, 'beforeunload', () => {
  setTabRoutes(tab.tabs);
});
</script>
<style scoped></style>
