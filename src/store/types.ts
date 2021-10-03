import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
    name: string
    age: number
}

export interface IRootWithMoudule {
    login: ILoginState
    system: ISystemState
    // 一本万利，现在是login模块，以后出现其他模块也可以这样注册，也不会报错了
}

export type IStoreType = IRootState & IRootWithMoudule
