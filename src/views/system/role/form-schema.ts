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
      label: '用户名',
      field: 'username',
      value: '',
      props: {
        placeholder: '请输入用户名',
      },
    },
    {
      type: 'input',
      label: '邮箱',
      field: 'email',
      rules: [
        {
          required: true,
          message: '邮箱不能为空',
        },
        {
          pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '请输入合法邮箱',
        },
      ],
      value: '',
      props: {
        placeholder: '请输入邮箱',
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
      value: '',
    },
    {
      type: 'select',
      label: '角色',
      field: 'userRole',
      value: '',
      options: [
        { label: 'admin', value: 'admin' },
        { label: 'visitor', value: 'visitor' },
        { label: 'test', value: 'test' },
      ],
    },
  ],
});
