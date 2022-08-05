import { getRouteTree } from '@/service';

export const getFormSchema = (): FormSchema => ({
  style: {
    width: 'auto',
  },
  formItemLayout: {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  },
  formItem: [
    {
      type: 'input',
      label: '角色名称',
      field: 'roleName',
      rules: [
        {
          required: true,
          message: '角色名称不能为空',
        },
      ],
      value: '',
      props: {
        placeholder: '请输入角色名称',
      },
    },
    {
      type: 'select',
      label: '状态',
      field: 'status',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
      ],
      value: 1,
    },
    {
      type: 'tree',
      label: '菜单权限',
      field: 'menuIds',
      value: [],
      loading: true,
      props: {
        checkable: true,
      },
      asyncOptions: async () => {
        const { retData } = await getRouteTree();
        return retData;
      },
    },
  ],
});
