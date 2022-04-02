<template>
  <!-- 目录 -->
  <Menu.SubMenu v-if="props.menuInfo?.children?.length" :key="props.menuInfo?.routePath" v-bind="$attrs">
    <template #title>
      <span class="anticon">
        <Icon :icon="props.menuInfo.icon" class="inline-block align-text-bottom mr-4px text-16px mb-2px" />
      </span>
      <span>{{ props.menuInfo?.label }}</span>
    </template>
    <template v-for="item in menuChildren" :key="item.routePath">
      <!-- 递归生成菜单 -->
      <MyMenuItem :menu-info="item" />
    </template>
  </Menu.SubMenu>
  <!-- 菜单 -->
  <template v-else>
    <Menu.Item :key="props.menuInfo?.routePath">
      <span class="anticon">
        <Icon :icon="props.menuInfo?.icon" class="inline-block align-text-bottom mr-4px mb-2px text-16px" />
      </span>
      <span>{{ props.menuInfo?.label }}</span>
    </Menu.Item>
  </template>
</template>

<script setup lang="ts">
import { type PropType, computed } from 'vue';
import { Menu } from 'ant-design-vue';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'MyMenuItem',
});

const props = defineProps({
  menuInfo: {
    type: Object as PropType<GlobalMenuOption>,
  },
});

const menuChildren = computed(() => {
  return [...(props.menuInfo?.children || [])].filter((n) => !n.hideInMenu);
});
</script>

<style scoped></style>
