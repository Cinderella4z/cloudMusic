import { request } from "./request";


export function songerDetail (id) {

  return request({
    url: '/artist/detail',
    params: {
      id
    }
  })

}