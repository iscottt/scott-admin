<template>
  <div>
    <a-button @click="doSome">{{ a }}</a-button>
    <div class="h-1000px w-200px bg-content"></div>
  </div>
</template>

<script lang="ts" setup>
import { fetchUserInfo } from '@/service';
import { message, notification } from 'ant-design-vue';
onMounted(async () => {
  const { retData } = await fetchUserInfo();
  console.log('retData', retData);
});
const a = ref(123);
const doSome = () => {
  message.warning('123123', 0);
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
</script>
