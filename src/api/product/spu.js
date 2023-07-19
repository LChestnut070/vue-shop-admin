import request from '@/utils/request'
// 获取spu列表
export const reqGetSpuList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  })
}
// 获取单个spu信息
export const reqGetSpuById = (spuId) => {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}
// 获取spu的商品属性
export const reqGetTrademarkList = () => {
  return request({
    url: 'admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}
// 获取spu图片
export const reqGetSpuImgList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
// 获取spu平台全部销售属性
export const reqBaseSaveAttrList = () => {
  return request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
}
// 完成spu修改|添加
export const reqAddOrUpdateSpu = (spuinfo) => {
  if (spuinfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuinfo
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuinfo
    })
  }
}

// 删除spu
export const reqDeleteSpu = (spuId) => {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}

// 获取销售属性
export const reqGetSaleAttrList = (spuId) => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}
// 获取销售属性
export const reqAddSku = (skuinfo) => {
  return request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuinfo
  })
}
// 获取sku列表
export const reqSkuList = (spuId) => {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}
