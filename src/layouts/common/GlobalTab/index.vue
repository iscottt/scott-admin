<template>
  <div
    :class="isMobile ? 'global-tab-mobile' : 'global-tab'"
    :style="isMobile ? {} : { left: `${!collapsed ? 256 : 80}px !important` }"
  >
    <div ref="bsWrapper" class="flex-1-hidden h-full">
      <better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: canClick }">
        <tab-detail @scroll="handleScroll" />
      </better-scroll>
    </div>
    <reload-button />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useElementBounding } from '@vueuse/core';
import { useAppStore, useTabStore } from '@/store';
import { useDeviceInfo } from '@/composables';
import { TabDetail, ReloadButton } from './components';
import BetterScroll from '@/components/custom/BetterScroll.vue';
import { EnumDeviceType } from '@/enum';

// 定义组件props
interface Props {
  collapsed: Boolean;
}
defineProps<Props>();
const route = useRoute();
const tab = useTabStore();
const deviceInfo = useDeviceInfo();
const app = useAppStore();
// 获取设备终端判断
const isMobile = computed(() => {
  return app.device === EnumDeviceType.mobile;
});

const bsWrapper = ref<HTMLElement>();
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper);

const bsScroll = ref<Expose.BetterScroll>();

const canClick = Boolean(deviceInfo.device.type);

function handleScroll(clientX: number) {
  const currentX = clientX - bsWrapperLeft.value;
  const deltaX = currentX - bsWrapperWidth.value / 2;
  if (bsScroll.value) {
    const { maxScrollX, x: leftX } = bsScroll.value.instance;
    const rightX = maxScrollX - leftX;
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);
    bsScroll.value?.instance.scrollBy(update, 0, 300);
  }
}

function init() {
  tab.iniTabStore(route);
}

// 监听路由实时改变tab初始值
watch(
  () => route.path,
  () => {
    tab.addTab(route);
    tab.setActiveTab(route.path);
  }
);

// 初始化
init();
</script>
<style scoped>
.global-tab {
  box-shadow: 0px 15px 6px -15px rgba(0, 0, 0, 0.1);
  height: 46px;
  @apply bg-white z-10 flex items-end justify-between right-0 px-2 fixed top-64px left-256px box-border transition-all duration-[0.2s];
}

.global-tab-mobile {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  height: 46px;
  @apply bg-white z-10 flex items-end justify-between w-full px-0 fixed top-64px left-0 right-0;
}
</style>
