// 首先，我们先引入router里面的路由类型，作为返回值
import { RouteRecordRaw } from 'vue-router'

// 然后我们在导出我们要输出的分类路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []

    // 1. 先去加载默认所有的routes
    const allRoutes: RouteRecordRaw[] = []
    // (1) 通过webpack的方法，来遍历我们文件夹下的所有文件,第一个参数为路径，第二个参数是否进行递归的查找,正则表达式匹配后缀名
    const routeFiles = require.context('../router/main', true, /\.ts/)

    // 获取所有的路由
    routeFiles.keys().forEach((key) => {
        const route = require('../router/main' + key.split('.')[1])
        allRoutes.push(route.default)
    })

    console.log(allRoutes, 'routeFiles')

    // 2.根据菜单获取需要添加的routes
    const _recurseGetRoute = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 2) {
                const route = allRoutes.find((route) => {
                    return route.path === menu.url
                })
                if (route) routes.push(route)
            } else {
                _recurseGetRoute(menu.children)
            }
        }
    }

    _recurseGetRoute(userMenus)

    return routes
}
