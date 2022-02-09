import { request } from './request'

export function getSongSrc (id) {

  return request({
    url: '/song/url',
    params: { id, }
  })

}