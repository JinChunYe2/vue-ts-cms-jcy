import hyRequest from '@/service'
import { IDataType } from '@/service/types'

// 发起网络请求
export function getPageListData(url: string, querInfo: any) {
    return hyRequest.post<IDataType>({
        url: url,
        data: querInfo
    })
}

// url: /users/id
export function deletePageData(url: string) {
    return hyRequest.delete<IDataType>({
        url: url
    })
}

// 新建用户
export function createPageData(url: string, newData: any) {
    return hyRequest.post<IDataType>({
        url: url,
        data: newData
    })
}

// 编辑用户
export function editPageData(url: string, editData: any) {
    return hyRequest.patch<IDataType>({
        url: url,
        data: editData
    })
}
