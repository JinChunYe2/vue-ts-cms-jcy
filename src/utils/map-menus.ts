// 首先，我们先引入router里面的路由类型，作为返回值
import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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

    // 2.根据菜单获取需要添加的routes
    const _recurseGetRoute = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 2) {
                const route = allRoutes.find((route) => {
                    return route.path === menu.url
                })
                if (route) routes.push(route)
                if (!firstMenu) {
                    firstMenu = menu
                }
            } else {
                _recurseGetRoute(menu.children)
            }
        }
    }

    _recurseGetRoute(userMenus)

    return routes
}

// 导出当前的面包屑
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
    const breadcrumbs: IBreadcrumb[] = []
    pathMapToMenu(userMenus, currentPath, breadcrumbs)
    return breadcrumbs
}

// 跟踪当前菜单
export function pathMapToMenu(
    userMenus: any[],
    currentPath: string,
    breadcrumbs?: IBreadcrumb[]
): any {
    for (const menu of userMenus) {
        if (menu.type === 1) {
            const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
            if (findMenu) {
                breadcrumbs?.push({ name: menu.name })
                breadcrumbs?.push({ name: findMenu.name })
                return findMenu
            }
        } else if (menu.type === 2 && menu.url === currentPath) {
            return menu
        }
    }
}

// 获取用户按钮权限
export function mapMenusToPermissions(userMenus: any[]) {
    const permissions: string[] = []

    const _recurseGetPermission = (menus: any) => {
        for (const menu of menus) {
            if (menu.type === 1 || menu.type === 2) {
                _recurseGetPermission(menu.children ?? [])
            } else if (menu.type === 3) {
                permissions.push(menu.permission)
            }
        }
    }
    _recurseGetPermission(userMenus)
    return permissions
}

// 获取菜单里的叶子节点的key
export function menuMapLeafKeys(menuList: any[]) {
    const leftKeys: number[] = []
    const _recuseGetLeaf = (menuList: any[]) => {
        for (const menu of menuList) {
            if (menu.children) {
                _recuseGetLeaf(menu.children)
            } else {
                leftKeys.push(menu.id)
            }
        }
    }

    _recuseGetLeaf(menuList)
    return leftKeys
}

export { firstMenu }
