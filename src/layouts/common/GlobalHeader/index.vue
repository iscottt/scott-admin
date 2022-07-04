<template>
  <a-layout-header :class="isMobile ? 'ant-header-mobile' : 'ant-header'">
    <div class="header-container">
      <!-- 收缩菜单的按钮 -->
      <div v-if="!isMobile" class="collapsed" @click="emit('update:collapsed', !collapsed)">
        <component class="text-lg pl-20px pr-20px" :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
      </div>
      <!-- 面包屑 -->
      <div class="breadcrumb-container">
        <Breadcrumb>
          <template v-for="routeItem in route.matched" :key="routeItem.name">
            <Breadcrumb.Item>
              <router-link :to="{ name: routeItem.name }">
                {{ routeItem.meta.title }}
              </router-link>
            </Breadcrumb.Item>
          </template>
        </Breadcrumb>
      </div>
      <!-- 右侧操作栏 -->
      <div class="actions-container">
        <div class="action" @click="logout">
          <Tooltip>
            <template #title>退出登录</template>
            <img class="w-5 h-5" src="@/assets/images/layout/logout.png" alt="logout" />
          </Tooltip>
        </div>
        <div v-if="isMobile" class="mobile-menu" @click="emit('update:collapsed', !collapsed)">
          <img class="w-20px h-20px" src="@/assets/images/layout/menu.png" alt="menu" />
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import { QuestionCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';
import { computed, createVNode } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store';
import { EnumDeviceType } from '@/enum';
import { Breadcrumb, Tooltip } from 'ant-design-vue';

// 定义组件props
interface Props {
  collapsed: Boolean;
}
defineProps<Props>();
const emit = defineEmits(['update:collapsed']);
const app = useAppStore();
const router = useRouter();
const route = useRoute();
// 获取设备终端判断
const isMobile = computed(() => {
  return app.device === EnumDeviceType.mobile;
});

// 退出登录
const logout = () => {
  Modal.confirm({
    title: '您确定要退出登录吗？',
    icon: createVNode(QuestionCircleOutlined),
    onOk: () => {
      message.success('成功退出登录', 1);
      setTimeout(() => {
        router
          .replace({
            name: 'login',
          })
          .finally(() => location.reload());
      }, 1000);
    },
  });
};
</script>

<style lang="less" scoped>
.ant-header {
  @apply !bg-white !px-10;
}
.ant-header-mobile {
  @apply !bg-white !px-0;
}
.header-container {
  @apply w-full h-full flex items-center justify-start bg-white;
  .collapsed {
    @apply cursor-pointer flex content-center justify-center;
  }
  .mobile-title {
    @apply leading-10 text-xl font-bin content-center overflow-hidden;
  }
  .breadcrumb-container {
    @apply p-0 flex-1 h-full flex items-center justify-start pl-5;
  }
  .actions-container {
    @apply flex items-center w-40 h-full justify-end pr-2;
    .action {
      @apply h-full flex items-center justify-center cursor-pointer mr-2;
    }
  }
  .mobile-menu {
    @apply w-7 h-7 flex items-center justify-center cursor-pointer;
  }
}
</style>
