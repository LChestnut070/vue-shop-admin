import request from '@/utils/request'

export const reqGetCategory1 = () => {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}
export const reqGetCategory2 = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}
export const reqGetCategory3 = (category2Id) => {
  return request({
    url: `/admin/product/getCategory2/${category2Id}`,
    method: 'get'
  })
}
export const reqGetAttrList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}
export const reqAddAttr = (data) => {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data
  })
}
export const reqAddOrUpdateAttr = (data) => {
  return request({
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    data
  })
}
