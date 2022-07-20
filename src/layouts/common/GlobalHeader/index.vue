<template>
  <a-layout-header
    :class="isMobile ? 'ant-header-mobile' : 'ant-header'"
    :style="isMobile ? {} : { left: `${!collapsed ? 256 : 80}px !important` }"
  >
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
        <!-- <div class="action" @click="logout">
          <Tooltip>
            <template #title>退出登录</template>
            <img class="w-5 h-5" src="@/assets/images/layout/logout.png" alt="logout" />
          </Tooltip>
        </div> -->
        <a-dropdown>
          <div class="userinfo">
            <div class="avatar">
              <img src="https://gd-hbimg.huaban.com/c06f36af307897793abc4d44368b8be337f3a5c5d741-yvh53F_sq180" />
            </div>
            <div class="info">
              <span>Scott</span>
              <span>iscottt@163.com</span>
            </div>
          </div>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="logout">
                <div class="dropdown-item"><MdiExitToApp class="mr-2" />退出登录</div>
              </a-menu-item>
              <a-menu-item>
                <div class="dropdown-item"><EpSetting class="mr-2" />个人设置</div>
              </a-menu-item>
              <a-menu-item>
                <div class="dropdown-item"><MdiSquareEditOutline class="mr-2" />修改密码</div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <div v-if="isMobile" class="mobile-menu" @click="emit('update:collapsed', !collapsed)">
          <img class="w-27px h-27px ml-2" src="@/assets/images/layout/menu.png" alt="menu" />
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
const handleMenuClick = (e) => {
  switch (e.key) {
    case 'logout':
      logout();
      break;
  }
};
// 退出登录
const logout = () => {
  Modal.confirm({
    title: '您确定要退出登录吗？',
    icon: createVNode(QuestionCircleOutlined),
    onOk: () => {
      message.success('成功退出登录', 1);
      localStorage.clear();
      setTimeout(() => {
        router.replace({
          name: 'login',
        });
      }, 1000);
    },
  });
};
</script>

<style lang="less" scoped>
.ant-header {
  box-shadow: 0 1px 4px #00152914;
  @apply !bg-white !px-2 fixed z-11 top-0 left-256px right-0 transition-all duration-[0.2s];
}
.ant-header-mobile {
  @apply !bg-white !px-0 fixed z-10 top-0 left-0 right-0;
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
    @apply flex items-center w-40 h-full justify-end pr-3;
    .action {
      @apply h-full flex items-center justify-center cursor-pointer mr-2;
      &:first-of-type {
        margin: 0;
      }
    }
    .userinfo {
      @apply px-2 h-50px flex items-center justify-evenly cursor-pointer;
      &:hover {
        @apply bg-gray-100 rounded-md;
      }
      .avatar {
        @apply w-36px h-36px rounded-full overflow-hidden shadow-xl shadow-light-700 mr-2;
      }
      .info {
        @apply h-50px flex flex-col items-start justify-center;
        span {
          @apply text-sm font-medium;
          &:last-of-type {
            @apply text-gray-400 font-normal;
          }
        }
      }
    }
  }
  .mobile-menu {
    @apply w-7 h-7 flex items-start justify-start cursor-pointer text-sm;
  }
}
.dropdown-item {
  @apply flex items-center justify-start;
}
</style>
