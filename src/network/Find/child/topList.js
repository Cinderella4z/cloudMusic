import { request } from "../../request";


export function topList () {
  return request({
    url: '/toplist',
  })
}