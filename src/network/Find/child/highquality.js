import { request } from "../../request";


export function highquality (cat, limit) {

  return request({
    url: '/top/playlist/highquality',
    params: {
      cat,
      limit
    }
  })

}