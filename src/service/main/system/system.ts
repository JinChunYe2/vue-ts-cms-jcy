import hyRequest from '@/service'
import { IDataType } from '@/service/types'

// 发起网络请求
export function getPageListData(url: string, querInfo: any) {
    return hyRequest.post<IDataType>({
        url: url,
        data: querInfo
    })
}
