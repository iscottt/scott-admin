<template>
  <a-form ref="formRef" :model="model" :rules="rules" size="large" class="!mb-3px" :show-label="false">
    <a-form-item name="username">
      <a-input size="large" v-model:value="model.username" placeholder="用户名" />
    </a-form-item>
    <a-form-item name="email">
      <a-input size="large" v-model:value="model.email" placeholder="邮箱" />
    </a-form-item>
    <a-form-item name="password">
      <a-input size="large" type="password" v-model:value="model.password" placeholder="密码" />
    </a-form-item>
    <a-form-item name="confirmPwd">
      <a-input size="large" type="password" v-model:value="model.confirmPwd" placeholder="确认密码" />
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

const { toLoginModule } = useRouterPush();

const formRef = ref<any>(null);
const model = reactive({
  username: '',
  email: '',
  password: '',
  confirmPwd: '',
});

const rules = {
  username: formRules.username,
  password: formRules.pwd,
  email: formRules.email,
  confirmPwd: getConfirmPwdRule(toRefs(model).password),
};

function handleSubmit(e: MouseEvent) {
  if (!formRef.value) return;
  e.preventDefault();

  formRef.value.validate().then(() => {
    console.log('model.value', toRaw(model));
    register({ ...toRaw(model) }).then((res) => {
      console.log(res);
      if (res.retCode == 0) {
        message.success('注册成功~');
      }
    });
  });
}
</script>

<style scoped></style>
