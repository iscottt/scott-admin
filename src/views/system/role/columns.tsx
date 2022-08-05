import { TableColumn } from '@/components/core/dynamic-table';
import { useFormatDate } from '@/hooks';
import { useFormModal } from '@/hooks/business/useFormModal';
import { deleteRole, updateRole } from '@/service';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message, Modal, Tag } from 'ant-design-vue';
import { createVNode } from 'vue';
import { getFormSchema } from './form-schema';

export const columns: TableColumn[] = [
  {
    align: 'center',
    dataIndex: 'id',
    title: 'ID',
    width: 100,
  },
  { align: 'center', dataIndex: 'roleName', width: 200, title: '角色名称' },
  {
    align: 'center',
    dataIndex: 'status',
    width: 100,
    title: '状态',
    bodyCell: ({ record }) =>
      record.status > 0 ? (
        <Tag color={record.status == 1 ? '#67C23A' : '#909399'}>{['', '启用', '禁用'][record.status]}</Tag>
      ) : (
        '---'
      ),
  },
  {
    align: 'center',
    dataIndex: 'createTime',
    width: 200,
    title: '创建时间',
    bodyCell: ({ record }) => <>{useFormatDate(record.createTime)}</>,
  },
  {
    align: 'center',
    dataIndex: 'updateTime',
    width: 200,
    title: '更新时间',
    bodyCell: ({ record }) => <>{useFormatDate(record.updateTime)}</>,
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    dataIndex: '$action',
    fixed: 'right',
    actions: ({ record, instance }) => [
      {
        label: '编辑',
        onClick: () => {
          const tempRecord = JSON.parse(JSON.stringify(record));
          tempRecord.menuIds = tempRecord.menuIds.split(',').map((key) => +key);
          useFormModal({
            title: '编辑用户',
            fields: tempRecord,
            formSchema: getFormSchema(),
            handleOk: async (modelRef) => {
              console.log(modelRef);
              const params = {
                id: modelRef.id,
                roleName: modelRef.roleName,
                status: modelRef.status,
                menuIds: modelRef.menuIds.join(','),
              };
              await updateRole(params);
              return instance.reload();
            },
          });
        },
      },
      {
        label: '删除',
        onClick: () => {
          Modal.confirm({
            title: '提示',
            icon: createVNode(ExclamationCircleOutlined),
            content: '是否确认删除该角色',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
              await deleteRole(record.id);
              return instance.reload();
            },
          });
        },
      },
    ],
  },
];
