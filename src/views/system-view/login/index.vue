<template>
  <div class="relative flex-center h-full" :style="{ backgroundColor: '#E0E8FD' }">
    <a-card
      :bordered="false"
      class="relative overflow-hidden flex-center z-4 shadow-gray-500\/50 !rounded-20px w-400px"
    >
      <div class="w-360px">
        <header class="flex-y-center justify-between">
          <div class="leading-70px text-30px font-bin align-center overflow-hidden">Scott Admin</div>
          <div class="font-title text-24px text-blue-500">{{ activeModule.label }}</div>
        </header>
        <main class="pt-24px pb-24px">
          <transition name="fade-slide" mode="out-in" appear>
            <component :is="activeModule.component" v-model:loading="loginLoading" />
          </transition>
        </main>
      </div>
      <div v-if="loginLoading" class="absolute -top-0 -left-0 -bottom-0 w-full flex-center bg-[rgba(255,255,255,0.9)]">
        <svg viewBox="25 25 50 50" class="w-42px h-42px circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path" />
        </svg>
      </div>
    </a-card>
    <login-bg theme-color="#ffffff" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { EnumLoginModule } from '@/enum';
import { LoginBg, PwdLogin, ResetPwd } from './components';

interface LoginModule {
  key: EnumType.LoginModuleKey;
  label: EnumLoginModule;
  component: any;
}

interface Props {
  /** 登录模块分类 */
  module?: EnumType.LoginModuleKey;
}
const props = defineProps<Props>();

const modules: LoginModule[] = [
  { key: 'pwd-login', label: EnumLoginModule['pwd-login'], component: PwdLogin },
  { key: 'reset-pwd', label: EnumLoginModule['reset-pwd'], component: ResetPwd },
];

const activeModule = computed(() => {
  const active: LoginModule = { ...modules[0] };
  const findItem = modules.find((item) => item.key === props.module);
  if (findItem) {
    Object.assign(active, findItem);
  }
  return active;
});
const loginLoading = ref<boolean>(false);
</script>
<style scoped>
.circular {
  height: 42px;
  width: 42px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}
</style>
