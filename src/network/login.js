import { request } from "./request";
import { timestamp } from "./timestamp";


// 二位码登录
export function getKey () {
  return request({
    url: '/login/qr/key' + '?timestamp=' + new Date().getTime(),

  })
}


export function create (key, qrimg) {
  return request({
    url: '/login/qr/create' + '?timestamp=' + new Date().getTime(),
    params: {
      key,
      qrimg
    },


  })
}


export function check (key) {
  return request({
    url: '/login/qr/check' + '?timestamp=' + new Date().getTime(),
    params: {
      key,
    },


  })
}


// 手机登录
export function phoneLogin (phone, password) {
  return request({
    method: 'post',
    url: '/login/cellphone',
    data: {
      phone,
      password,
    },


  })
}

// 获取喜欢音乐列表

export function likeList (uid) {

  return request({
    url: '/likelist' + '?cookie=' + 'MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/neapi/feedback;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/eapi/feedback;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/api/feedback;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/openapi/clientlog;;__csrf=7e8f944e168f4769a477a5ec3e76626d; Max-Age=1296010; Expires=Wed, 16 Feb 2022 03:40:10 GMT; Path=/;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/wapi/clientlog;;NMTID=00O_fTVN-hhEGSm80gtsnOVIMA2CGoAAAF-s14skw; Max-Age=315360000; Expires=Fri, 30 Jan 2032 03:40:00 GMT; Path=/;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/wapi/feedback;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/eapi/feedback;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/api/clientlog;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/weapi/feedback;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/weapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Tue, 1 Feb 2022 03:40:00 GMT; Path=/;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/neapi/feedback;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/wapi/feedback;;__remember_me=true; Max-Age=1296000; Expires=Wed, 16 Feb 2022 03:40:00 GMT; Path=/;;MUSIC_R_T=1473674987740; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/weapi/feedback;;MUSIC_U=2d4e19f2bf18bb6f7b808ec98e866403fb0fc337f08aa3423dccb46876938bfb993166e004087dd3d78b6050a17a35e705925a4e6992f61d07c385928f88e8de; Max-Age=1296000; Expires=Wed, 16 Feb 2022 03:40:00 GMT; Path=/;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/api/feedback;;MUSIC_A_T=1473674977849; Max-Age=2147483647; Expires=Sun, 19 Feb 2090 06:54:07 GMT; Path=/api/clientlog',
    params: {
      uid,
    },
  })
}