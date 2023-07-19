import request from '@/utils/request'
export const reqGetSkuList = (page, limit) => {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
}
// 上架
export const reqOnSale = (skuId) => {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
}
export const reqCancelSale = (skuId) => {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
}
// 获取sku详情
export const reqGetSkuInfo = (skuId) => {
  return request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
  })
}
