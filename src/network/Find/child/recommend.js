import { request } from '../../request'


export function getRecommend () {

  return request({
    url: '/top/playlist/highquality'
  })

}