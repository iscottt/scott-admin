<template>
  <Layout class="flex h-full overflow-hidden">
    <!--      侧边菜单栏start-->
    <global-sider :collapsed="collapsed" />
    <!--      侧边菜单栏end-->
    <Layout>
      <GlobalHeader v-model:collapsed="collapsed" />
      <Layout.Content>
        <GlobalTab />
        <GlobalContent />
      </Layout.Content>
      <GlobalFooter />
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { Layout } from 'ant-design-vue';
import { ref } from 'vue';
import { GlobalSider, GlobalHeader, GlobalFooter, GlobalTab, GlobalContent } from '../common';
const collapsed = ref<boolean>(false);
</script>
<style scoped></style>
