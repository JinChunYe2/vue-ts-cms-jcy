export const contentTableConfig: any = {
    title: '菜单列表',
    propList: [
        { prop: 'name', label: '菜单名称', minWidth: '100' },
        { prop: 'type', label: '类型', minWidth: '60' },
        { prop: 'url', label: '菜单的Url', minWidth: '100' },
        { prop: 'permission', label: '按钮权限', minWidth: '100' },
        {
            prop: 'icon',
            label: '菜单的图标',
            minWidth: '100'
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
    showIndexColumn: false,
    showSelectColumn: false,
    childrenProps: {
        rowKey: 'id',
        treeProp: {
            children: 'children'
        }
    },
    showFooter: false,
    newtitle: '新建菜单'
}