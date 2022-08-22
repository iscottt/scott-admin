<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [基于 vue-cli / vite + vue3.0 + antd2.0 + ts4.0 的后台管理系统模板](#%E5%9F%BA%E4%BA%8E-vue-cli--vite--vue30--antd20--ts40-%E7%9A%84%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E6%A8%A1%E6%9D%BF)
  - [运行&打包](#%E8%BF%90%E8%A1%8C%E6%89%93%E5%8C%85)
  - [目录](#%E7%9B%AE%E5%BD%95)
  - [新增路由&页面](#%E6%96%B0%E5%A2%9E%E8%B7%AF%E7%94%B1%E9%A1%B5%E9%9D%A2)
  - [表格相关](#%E8%A1%A8%E6%A0%BC%E7%9B%B8%E5%85%B3)
  - [自定义图标](#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E6%A0%87)
  - [antd-vue 2.x 的自定义主题](#antd-vue-2x-%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98)
  - [菜单权限](#%E8%8F%9C%E5%8D%95%E6%9D%83%E9%99%90)
  - [vue3 setup 语法糖](#vue3-setup-%E8%AF%AD%E6%B3%95%E7%B3%96)
  - [关于自定义 tabs 组件](#%E5%85%B3%E4%BA%8E%E8%87%AA%E5%AE%9A%E4%B9%89-tabs-%E7%BB%84%E4%BB%B6)
  - [发送 HTTP 请求](#%E5%8F%91%E9%80%81-http-%E8%AF%B7%E6%B1%82)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 基于 vue-cli / vite + vue3.0 + antd2.0 + ts4.0 的后台管理系统模板

<br />
<br />

> 使用了 Vue3.0 全家桶、ant-design-vue2.0 和 typescript4.0，使用 hooks 的形式去代替以前 mixins 等的写法。更多 hooks 可以参考[vueuse](https://vueuse.org/functions.html)

<br />

## 运行&打包

```javascript
// 运行
npm run serve
// 打包
npm run build
// .env.development 定义本地接口路径
// .env.production  定义线上接口路径
```

## 目录

<br />

```javascript
├── public
│  ├── api                     静态json文件
│  ├── favicon.ico             浏览器图标
│  ├── iconfont.js             iconfont图标js文件
│  ├── index.html              index.html入口文件
├── src
│  ├── App.vue
│  ├── api                     接口定义目录
│  ├── assets                  静态资源文件（图片、字体）
│  ├── components              自定义组件
│  ├── directives              自定义指令
│  ├── enums                   ts枚举目录
│  ├── hooks                   自定义hooks
│  ├── layouts                 布局组件
│  ├── main.ts                 主入口文件
│  ├── plugins                 插件
│  ├── router                  路由
│  ├── shims-vue.d.ts          vue在ts的定义文件
│  ├── store                   vuex
│  ├── styles                  自定义样式
│  ├── utils                   工具
│  └── views                   页面
├── stylelint.config.js
├── tsconfig.json
├── types                       定义的类型&接口
│  ├── modules.d.ts
│  ├── schema.d.ts
│  ├── shims
│  ├── tableColumn.d.ts
│  └── vuex.d.ts
├── vite.config.ts              vite项目配置文件
├── yarn.lock
├── .env.development            本地环境url配置
└── .env.production             生产环境url配置

```

## 新增路由&页面

<br />

```javascript
1、类似于 login 这样的页面，可以放在 views/shared 目录下，其他包含业务或者包含权限以及菜单的页面放在/views/auth 下
2、左侧的菜单页面在新建完之后，需要在 /router/constantRouterComponents.ts 中配置对应的路由和目录地址
3、详情页、新增、修改等不会出现在左侧菜单但是含有业务的页面，可以放在/router/modules/dashboard.ts 下
```

<br />

## 表格相关

<br />

> 表格

```javascript
/**
 * columns        => 表格列数据
 * get-list-func  => 分页获取表格数据的接口
 * rowKey         => 每一行数据的唯一key
 * searchData     => 表格的默认搜条件
 * row-selection  => 表格第一列是否需要渲染多选框
 * */

 <dynamic-table
  ref="tableRef"
  :columns="columns"
  :get-list-func="getSysUser"
  rowKey="id"
  :searchData="searchData"
  :row-selection="null"
/>
```

> 表格列配置

```javascript
/**
 * title      =>  标题
 * hidden     =>  是否隐藏改列
 * dataIndex  =>  对应的后端返回字段
 * width      =>  列宽
 * slots      =>  插槽（自定义渲染列）
 * slotsType  =>  封装的自定义插槽类型
 * slotsFunc  =>  封装的自定义插槽格式化函数
 * actions    =>  封装的自定义操作列（包含普通按钮和操作按钮）
 * */
interface TableColumn extends ColumnProps {
  title?: string;
  hidden?: boolean;
  dataIndex: string;
  width?: number;
  slots?: {
    customRender?: string,
    title?: string,
  };
  slotsType?: 'format' | 'link' | 'component';
  slotsFunc?: (...rest) => any;
  actions?: ActionOptions[];
}

// 举例1
{
  title: '角色',
  width: 150,
  dataIndex: 'roleNames',
  slots: {
    customRender: 'roleNames',
  },
  slotsType: 'format',
  slotsFunc: (roles) => roles.join(', '),
}

// 举例2
{
  title: '状态',
  dataIndex: 'isEnable',
  width: 100,
  slots: {
    customRender: 'isEnable',
  },
  slotsType: 'component',
  slotsFunc: (row, refreshTableData) =>
    createVNode(Switch, {
      'checked-children': '启用',
      'un-checked-children': '禁用',
      checked: row.isEnable == 1,
      onChange: async (e) => {
        const params = {
          id: row.id,
          isEnable: e ? 1 : 0,
          roleName: row.roleName,
          operatorId: storage.get('userid'),
        };
        refreshTableData();
      },
    }),
}

// 举例3
{
  title: '操作',
  dataIndex: 'action',
  width: 65,
  slots: {
    customRender: 'action',
  },
  actions: [
    {
      type: 'button', // 控制类型，默认为a,可选： select | button | text
      text: '编辑',
      func: ({ record }, refreshTableData) =>
        useFormModal({
          title: '编辑用户',
          fields: record,
          width: '960px',
          formSchema: getFormSchema(),
          handleOk: async (modelRef, state) => {
            const params = {
              phone: modelRef.phone,
              userid: record.userid,
              operatorName: storage.get('username'),
              roleIds: modelRef.roleIds,
            };
            return await patchSysUser(params).then(() => refreshTableData());
          },
        }),
    },
  ],
}
```

<br />

> form-schema 以及自定义弹窗表单（参数基本是 antd-vue2.x 的 Modal 参数和 Form 参数） <br />

```javascript
interface FormSchema extends Partial<typeof FormProps> {
  style?: CSSProperties; // 表单样式
  formItemLayout?: object; // 表单布局
  watchKeys?: string[]; // 需要监测的字段
  watchCallback?: (watchKeys: string[], { dynamicForm, modelRef }) => any; // 监测的字段函数
  formItem: FormItem[]; // 表单项
}

/**
 * 创建表单模态框
 * @param modalOptions
 * @param formOptions
 * @path /hooks/useFormModal
 */
export const useFormModal = (options: Options): VNode<ModalInstance> => {
  // 组件实例
  let formModal;
  const container = document.createElement('div');
  // 移除组件
  const remove = () => {
    formModal = null;
    render(null, container);
    container.remove();
  };
  formModal = createVNode(FormModal, { ...options, remove });
  render(formModal, container);
  return formModal;
};

// 举例
useFormModal({
  title: '编辑用户',
  fields: record,
  width: '960px',
  formSchema: getFormSchema(),
  // 提交表单
  handleOk: async (modelRef, state) => {
    const params = {
      phone: modelRef.phone,
      userid: record.userid,
      operatorName: storage.get('username'),
      roleIds: modelRef.roleIds,
    };
    return;
  },
})
```

## 自定义图标

<br />

```javascript
/**
 * scriptUrl可以是iconfont线上的地址也可以将文件下载下来放到public目录（内网项目）
 * @path /components/iconfont/icon-font.tsx
 */
let MyIconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2874913_3vgpjtkjvid.js'
  // iconfont字体图标本地化，详见：/public/iconfont.js
  // scriptUrl: '/iconfont.js'
});

// 使用
<icon-font type="iconname" />;
```

## antd-vue 2.x 的自定义主题

<br/>

> styles/theme.less 可参考官网提供的变量去修改主题色

## 菜单权限

<br />

```javascript
/**
 * 返回示例
 * 不需要后端格式化成树结构，前端根据pid（父ID）去构造树结构
 * @description 构造路由树
 * @path /router/generator-routers.ts
 * @functions list2tree
 */
{
  "retCode": 0,
  "retData": [
    {
      "id": 1,
      "menuName": "系统管理",
      "menuUrl": "/system",
      "icon": "icon-modular",
      "pid": 0,
      "sort": 1
    },
    {
      "id": 11,
      "menuName": "角色管理",
      "menuUrl": "/system/role",
      "icon": "icon-jiaoseguanli",
      "pid": 1,
      "sort": 2
    },
    {
      "id": 10,
      "menuName": "用户管理",
      "menuUrl": "/system/user",
      "icon": "icon-yonghuguanli",
      "pid": 1,
      "sort": 1
    }
  ],
  "pageInfo": null,
  "retMessage": null
}

```

## vue3 setup 语法糖

<br />

```javascript
/**
 * @description 对比template写法不需要return，自动return变量
 * @desc 缺点是不会自动导出，当你需要把该页面作为组件时，不能用
 */
<script lang="ts" setup>
  import store from '@/store';
  import { storage } from '@/utils/Storage';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const loginLoading = ref(false);
  const formRef = ref<any>(null);
  const router = useRouter();
  const formState = ref({});
  const rules = ref({
    user: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  });
  const onSubmit = (e: MouseEvent) => {
    formRef.value.validate().then((res) => {
      loginLoading.value = true;
      setTimeout(() => {
        store.dispatch('asyncRoute/generateRoutes').then(() => {
          storage.set('isLogin', true);
          router.push('/welcome');
        });
      }, 1500);
    });
  };
</script>

// 普通语法
<template>
  <div>

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const count = 1
    return {
      count
    }
  }
});
</script>

<style scoped lang="less"></style>

```

> 更多 vue3 内容请查阅 [官方文档](https://v3.cn.vuejs.org/)

<br />

## 关于自定义 tabs 组件

<br />

> 某些页面不需要在 tab 中显示的，例如详情页，可以在 /layouts/tabs/tabs-view.vue 中定义白名单

<br />

## 发送 HTTP 请求

<br />

```javascript
/**
 * @path /utils/http/axios
 * @param 第二个参数为配置项
 * joinPrefix               默认将prefix 添加到url
 * isTransformRequestResult 需要对返回数据进行处理
 * joinParamsToUrl          post请求的时候添加参数到url
 * formatDate               格式化提交参数时间
 * errorMessageMode         消息提示类型
 * apiUrl                   接口地址
 * successMessageText       接口成功提示文案
 * errorMessageText         接口失败提示文案
 * isDownload               是否下载文件
 */
export function getSysUser(params) {
  return http.request(
    {
      url: Api.sysUser,
      method: 'POST',
      params
    },
    {
      apiUrl: '/market-supervision',
      // 默认是true，分页获取表格数据时，这项需要设置成false
      isTransformRequestResult: false,
      isParseToJson: true
    }
  );
}
```

## 部署

```javascript
/**
 * @Path .env.production
 */

//  网站前缀，文件在服务器中的目录需要在这里配制成一致的才不会报资源 404 错误
// 例如目前文件是放在 /usr/local/openresty/nginx/www/admin/dist，这里就需要改成/admin/dist/
VITE_BASE_URL = /admin/dist/

//  是否删除console
VITE_DROP_CONSOLE = true

// 生产环境调用接口的公共apiUrl，目前访问的是静态json资源，所以此时的apiUrl和网站前缀一致
VITE_APP_API_URL = /admin/dist/
```
