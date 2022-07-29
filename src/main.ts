import { createApp } from 'vue';
import { setupAssets } from '@/core';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from '@/store';
import { SButton } from '@/components/common/button/index';
import 'virtual:windi.css';
import 'ant-design-vue/es/table/style/css';
import 'ant-design-vue/es/message/style/css';
import 'ant-design-vue/es/notification/style/css';
import 'ant-design-vue/es/breadcrumb/style/css';
import 'ant-design-vue/es/modal/style/css';

async function setupApp() {
  // 引入静态资源
  setupAssets();
  const app = createApp(App);
  app.component('SButton', SButton);
  app.config.globalProperties.Reflect = Reflect;
  // 挂载pinia状态
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  // 路由准备就绪后挂载 App
  app.mount('#app');
}
setupApp();
