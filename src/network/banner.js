import { request } from "./request";

export function getBanner () {
  return request({
    url: '/banner/?type=0'
  })
}