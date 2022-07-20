<template>
  <a-form ref="formRef" :model="model" :rules="rules">
    <a-form-item name="phone">
      <a-input class="!rounded-md" size="large" v-model:value="model.phone" placeholder="手机号码" />
    </a-form-item>
    <a-form-item name="code">
      <div class="flex-y-center w-full">
        <a-input class="!rounded-md" size="large" v-model:value="model.code" placeholder="验证码" />
        <div class="w-18px"></div>
        <a-button size="large" class="!rounded-md" :disabled="isCounting" :loading="smsLoading" @click="handleSmsCode">
          {{ label }}
        </a-button>
      </div>
    </a-form-item>
    <a-form-item name="pwd">
      <a-input class="!rounded-md" size="large" v-model:value="model.pwd" placeholder="密码" />
    </a-form-item>
    <a-form-item name="confirmPwd">
      <a-input class="!rounded-md" size="large" v-model:value="model.confirmPwd" placeholder="确认密码" />
    </a-form-item>
    <div class="pt-10px flex justify-evenly">
      <a-button size="large" type="primary" class="mr-20px" block @click="handleSubmit">确定</a-button>
      <a-button size="large" block @click="toLoginModule('pwd-login')">返回</a-button>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { useRouterPush } from '@/composables';
import { useSmsCode } from '@/hooks';
import { formRules, getConfirmPwdRule } from '@/utils';

const { toLoginModule } = useRouterPush();
const { label, isCounting, loading: smsLoading, start } = useSmsCode();

const formRef = ref<any>(null);
const model = reactive({
  phone: '',
  code: '',
  pwd: '',
  confirmPwd: '',
});
const rules = {
  phone: formRules.phone,
  code: formRules.code,
  pwd: formRules.pwd,
  confirmPwd: getConfirmPwdRule(toRefs(model).pwd),
};

function handleSmsCode() {
  start();
}

function handleSubmit(e: MouseEvent) {
  if (!formRef.value) return;
  e.preventDefault();
  formRef.value
    .validate()
    .then(() => {
      message?.success('验证成功');
    })
    .catch(() => {
      message?.error('验证失败');
    });
}
</script>
<style scoped>
.ant-form-item {
  margin-bottom: 17px !important;
}
</style>
