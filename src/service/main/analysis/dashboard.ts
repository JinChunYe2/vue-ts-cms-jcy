import hyRequest from '@/service'

enum DashboardAPI {
    amountList = '/goods/amount/list',
    categoryGoodsCouny = '/goods/category/count',
    categoryGoodsSale = '/goods/category/sale',
    categoryGoodsFavor = '/goods/category/favor',
    addressGoodsSale = '/goods/address/sale',
    goodsSaleTop10 = '/goods/sale/top10'
}

export function getAmountList() {
    return hyRequest.get({
        url: DashboardAPI.amountList
    })
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

export function getGoodsSaleTop10() {
    return hyRequest.get({
        url: DashboardAPI.goodsSaleTop10
    })
}
