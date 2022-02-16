import { request } from './request'


export function songer (id) {
  return request({

    url: '/artist/top/song',
    params: {
      id
    }
  })
}

export function artist (type, area, limit) {

  return request({
    url: '/artist/list',
    params: {
      type, area, limit
    }
  })

}