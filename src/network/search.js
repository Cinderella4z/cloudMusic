import { request } from './request'

export function search (keywords, limit, offset) {

  return request({
    url: '/search',
    params: {
      keywords,
      limit,
      offset
    }
  })

}


