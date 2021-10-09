// 导入类型
// import { Icontent } from '@/base-ui/form'

export const contentTableConfig: any = {
    title: '用户列表',
    propList: [
        { prop: 'name', label: '用户名', minWidth: '100' },
        { prop: 'realname', label: '真实姓名', minWidth: '100' },
        { prop: 'cellphone', label: '手机号码', minWidth: '100' },
        {
            prop: 'enable',
            label: '状态',
            minWidth: '100',
            slotname: 'status'
        },
        {
            prop: 'createAt',
            label: '创建时间',
            minWidth: '250',
            slotname: 'createAt'
        },
        {
            prop: 'updateAt',
            label: '更新时间',
            minWidth: '250',
            slotname: 'updateAt'
        },
        { label: '操作', minWidth: '120', slotname: 'handler' }
    ],
    showIndexColumn: true,
    showSelectColumn: true
}
