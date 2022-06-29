<template>
  <div>
    <a-button @click="doSome">{{ a }}</a-button>
  </div>
</template>

<script lang="ts" setup>
import { message, notification } from 'ant-design-vue';

const a = ref(123);
const doSome = () => {
  message.success('123123', 0);
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
<style scoped></style>
