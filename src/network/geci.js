import { request } from "./request";

export function geci (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}