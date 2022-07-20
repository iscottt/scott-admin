<template>
  <a-form ref="formRef" :model="model" :rules="rules" :wrapper-col="{ span: 24 }" class="relative !pb-60px">
    <a-form-item name="user" has-feedback>
      <a-input
        v-model:value="model.phone"
        size="large"
        class="!rounded-md"
        :style="{ width: '100%' }"
        placeholder="请输入用户名"
      />
    </a-form-item>
    <a-form-item name="password" has-feedback>
      <a-input
        v-model:value="model.pwd"
        type="password"
        placeholder="请输入密码"
        :style="{ width: '100%' }"
        size="large"
        class="!rounded-md"
        @keydown.enter="handleSubmit"
      />
    </a-form-item>
    <Space :vertical="true" :size="24" class="w-full !block mb-20px">
      <div class="w-full flex-y-center justify-between">
        <a-checkbox v-model:checked="rememberMe">记住我</a-checkbox>
        <a-button type="link" @click="toLoginModule('reset-pwd')">忘记密码？</a-button>
      </div>
    </Space>
    <a-button :disabled="!model.pwd" size="large" type="primary" block @click="handleSubmit"> 登录 </a-button>
    <div class="mt-20px absolute -bottom-10px w-full text-#999">
      <div class="mt-3px flex-center">
        <span class="align-middle ml-3px mr-3px">建议使用</span>
        <img src="~@/assets/images/login/chrome.png" alt="" class="w-15px" />
        <span class="align-middle ml-3px mr-3px">Chrome、</span>
        <img src="~@/assets/images/login/firefox.png" alt="" class="w-15px" />
        <span class="align-middle ml-3px mr-3px">火狐、</span>
        <img src="~@/assets/images/login/safari.png" alt="" class="w-15px" />
        <span class="align-middle ml-3px mr-3px">Safari浏览器</span>
      </div>
      <div class="mt-3px flex-center">
        <span class="align-middle ml-3px mr-3px">或</span>
        <img src="~@/assets/images/login/360.png" alt="" class="w-15px" />
        <span class="align-middle ml-3px mr-3px">360、</span>
        <img src="~@/assets/images/login/sougou.png" alt="" class="w-15px" />
        <span class="align-middle ml-3px mr-3px">搜狗、</span>
        <img src="~@/assets/images/login/qq.png" alt="" class="w-15px" />
        <span class="align-middle ml-3px mr-3px">QQ等浏览器</span>
        <img src="~@/assets/images/login/fast.png" alt="" class="w-15px" />
        <span class="align-middle">极速模式</span>
      </div>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Space } from 'ant-design-vue';
import { formRules } from '@/utils';
import { useRouterPush } from '@/composables';
import { useAuthStore } from '@/store';
const { toLoginModule } = useRouterPush();
const { login } = useAuthStore();

interface Props {
  loading: boolean;
}
defineProps<Props>();
const emit = defineEmits(['update:loading']);

const formRef = ref<any>(null);
const model = reactive({
  phone: '15170283876',
  pwd: 'abc123456',
});
const rules = {
  phone: formRules.phone,
  pwd: formRules.pwd,
};
const rememberMe = ref(false);

const handleSubmit = (e: MouseEvent) => {
  if (!formRef.value) return;
  e.preventDefault();

  formRef.value.validate().then(() => {
    emit('update:loading', true);
    const { phone, pwd } = model;
    login(phone, pwd).finally(() => {
      emit('update:loading', false);
    });
  });
};
</script>
