import request from '@/utils/request'
// 获取品牌列表
export const reqGetTradeMarkList = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}
// 添加或修改品牌
export const reqAddOrUpdateTradeMark = (trademark) => {
  if (trademark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: trademark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: trademark
    })
  }
}
// 删除品牌
export const reqDeleteTradeMark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
