import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';

export default Components({
  // ui库解析器，也可以自定义
  resolvers: [
    AntDesignVueResolver(),
    IconsResolver({
      prefix: false, // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
      // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
      // alias: { park: 'icon-park' } 集合的别名
      enabledCollections: ['ep', 'ant-design'],
    }),
  ],
});
