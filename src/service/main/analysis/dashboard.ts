import hyRequest from '@/service'

enum DashboardAPI {
    categoryGoodsCouny = '/goods/category/count',
    categoryGoodsSale = '/goods/category/sale',
    categoryGoodsFavor = '/goods/category/favor',
    addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
    return hyRequest.get({
        url: DashboardAPI.categoryGoodsCouny
    })
}

export function getCategoryGoodsSale() {
    return hyRequest.get({
        url: DashboardAPI.categoryGoodsSale
    })
}

export function getCategoryGoodsFavor() {
    return hyRequest.get({
        url: DashboardAPI.categoryGoodsFavor
    })
}

export function getAddressGoodsSale() {
    return hyRequest.get({
        url: DashboardAPI.addressGoodsSale
    })
}
