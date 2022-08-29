import type { PluginOption } from 'vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from './vue';
import mock from './mock';
import unplugin from './unplugin';
import autoImport from './autoImport';
import stylePlugin from './style';
import WindiCSS from './WindiCSS';

/**
 *	vite插件
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupVitePlugins(): (PluginOption | PluginOption[])[] {
  return [vue, mock, DefineOptions(), vueJsx(), unplugin, autoImport, WindiCSS, stylePlugin];
}
