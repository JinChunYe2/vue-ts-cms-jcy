import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'

export interface IRootState {
    name: string
    age: number
    entireDepartment: any[]
    entireRole: any[]
    entireMenu: any[]
}

export interface IRootWithMoudule {
    login: ILoginState
    system: ISystemState
    // 一本万利，现在是login模块，以后出现其他模块也可以这样注册，也不会报错了
    dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithMoudule
