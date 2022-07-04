<template>
  <Dropdown class="w-full flex items-center justify-center" :trigger="['contextmenu']">
    <slot></slot>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="item in options" :key="item.key" @click="handleDropdown(item.key)">
          <Icon class="inline-block align-text-bottom mr-5px text-16px" :icon="item.icon" />
          <span>{{ item.label }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Dropdown } from 'ant-design-vue';
import { useAppStore, useTabStore } from '@/store';
import { Icon } from '@iconify/vue';

interface Props {
  /** 右键菜单可见性 */
  visible?: boolean;
  /** 当前路由路径 */
  currentPath?: string;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

type DropdownKey = 'reload-current' | 'close-current' | 'close-other' | 'close-left' | 'close-right' | 'close-all';

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  currentPath: '',
});

const emit = defineEmits<Emits>();

const app = useAppStore();
const tab = useTabStore();

const dropdownVisible = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit('update:visible', visible);
  },
});

function hide() {
  dropdownVisible.value = false;
}

const options = computed(() => [
  {
    label: '重新加载',
    key: 'reload-current',
    disabled: props.currentPath !== tab.activeTab,
    icon: 'ant-design:reload-outlined',
  },
  {
    label: '关闭',
    key: 'close-current',
    disabled: props.currentPath === tab.homeTab.path,
    icon: 'ant-design:close-outlined',
  },
  {
    label: '关闭其他',
    key: 'close-other',
    icon: 'ant-design:column-width-outlined',
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    icon: 'mdi:format-horizontal-align-left',
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    icon: 'mdi:format-horizontal-align-right',
  },
]);

const actionMap = new Map<DropdownKey, () => void>([
  [
    'reload-current',
    () => {
      app.reloadPage();
    },
  ],
  [
    'close-current',
    () => {
      tab.removeTab(props.currentPath);
    },
  ],
  [
    'close-other',
    () => {
      tab.clearTab([props.currentPath]);
    },
  ],
  [
    'close-left',
    () => {
      tab.clearLeftTab(props.currentPath);
    },
  ],
  [
    'close-right',
    () => {
      tab.clearRightTab(props.currentPath);
    },
  ],
]);

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  const actionFunc = actionMap.get(key);
  if (actionFunc) {
    actionFunc();
  }
  hide();
}
</script>
<style scoped></style>
