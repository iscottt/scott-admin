<template>
  <a-form ref="formRef" :model="model" :rules="rules" size="large" class="!mb-3px" :show-label="false">
    <a-form-item name="username">
      <a-input size="large" class="!rounded-md" v-model:value="model.username" placeholder="用户名" />
    </a-form-item>
    <a-form-item name="email">
      <a-input size="large" class="!rounded-md" v-model:value="model.email" placeholder="邮箱" />
    </a-form-item>
    <a-form-item name="password">
      <a-input size="large" class="!rounded-md" type="password" v-model:value="model.password" placeholder="密码" />
    </a-form-item>
    <a-form-item name="confirmPwd">
      <a-input
        size="large"
        class="!rounded-md"
        type="password"
        v-model:value="model.confirmPwd"
        placeholder="确认密码"
      />
    </a-form-item>
    <a-form-item name="password" has-feedback>
      <div class="flex items-center justify-between">
        <a-input
          v-model:value="model.code"
          placeholder="请输入验证码"
          size="large"
          class="!rounded-md !flex-1 !mr-2"
          @keydown.enter="handleSubmit"
        />
        <ImageVerify v-model:code="verifyCode" ref="verifyRef" />
      </div>
    </a-form-item>
    <div class="flex items-center justify-evenly">
      <a-button type="primary" size="large" class="w-160px rounded-md" @click="handleSubmit">提交</a-button>
      <a-button size="large" class="w-160px rounded-md" @click="toLoginModule('pwd-login')">返回</a-button>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouterPush } from '@/composables';
import { formRules, getConfirmPwdRule } from '@/utils';
import { register } from '@/service';
import { message } from 'ant-design-vue';
import ImageVerify from '@/components/custom/ImageVerify.vue';
const { toLoginModule } = useRouterPush();

const emit = defineEmits(['update:loading']);
const formRef = ref<any>(null);
const verifyRef = ref<any>(null);
const verifyCode = ref('');
const model = reactive({
  username: '',
  email: '',
  password: '',
  confirmPwd: '',
  code: '',
});

const rules = {
  username: formRules.username,
  password: formRules.pwd,
  email: formRules.email,
  confirmPwd: getConfirmPwdRule(toRefs(model).password),
  code: [{ required: true, message: '请输入验证码' }],
};

function handleSubmit(e: MouseEvent) {
  if (model.code != verifyCode.value) {
    message.warning('验证码错误');
    return verifyRef.value.getImgCode();
  }
  if (!formRef.value) return;
  e.preventDefault();

  formRef.value.validate().then(() => {
    emit('update:loading', true);
    register({ ...toRaw(model) })
      .then((res) => {
        if (res.retCode == 0) {
          message.success('注册成功~');
          toLoginModule('pwd-login');
        }
      })
      .finally(() => {
        emit('update:loading', false);
        verifyRef.value.getImgCode();
      });
  });
}
</script>

<style scoped></style>
