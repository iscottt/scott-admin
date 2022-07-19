import type { ConfigEnv, PluginOption } from 'vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import vue from './vue';
import mock from './mock';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unplugin from './unplugin';
import autoImport from './autoImport';
import WindiCSS from './WindiCSS';
import Icons from './icons';

/**
 *	vite插件
 * @param configEnv - 环境
 * @param srcPath - src路径
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(
  _configEnv: ConfigEnv,
  _srcPath: string,
  _viteEnv: ImportMetaEnv
): (PluginOption | PluginOption[])[] {
  const plugins = [vue, mock, DefineOptions(), vueJsx(), unplugin, autoImport, WindiCSS, Icons];
  return plugins;
}
