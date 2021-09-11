import hyRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './type'

// 运用枚举分发
enum LoginAPI {
    AccountLogin = '/login',
    LoginUserInfo = '/users/', // /users/id
    UserMenus = '/role/' // 用法：role/1/menu
}

// 登陆接口
// 在post请求的时候，我们一般把值放到data里
export function accountLoginRequest(account: IAccount) {
    return hyRequest.post<IDataType<ILoginResult>>({
        url: LoginAPI.AccountLogin,
        data: account
    })
}

// 请求用户数据
export function requesUserInfoById(id: number) {
    return hyRequest.get<IDataType>({
        url: LoginAPI.LoginUserInfo + id
    })
}

// 请求用户菜单
export function requestUserMenusByRoleId(id: number) {
    return hyRequest.get<IDataType>({
        url: LoginAPI.UserMenus + id + '/menu'
    })
}
