// 导入类型
// import { Icontent } from '@/base-ui/form'

export const contentTableConfig: any = {
    title: '用户列表',
    propList: [
        { prop: 'name', label: '角色名', minWidth: '100' },
        { prop: 'intro', label: '权限介绍', minWidth: '100' },
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
    showSelectColumn: true,
    newtitle: '新建角色'
}
