import { getSongSrc } from '../../network/idFindSrc'

export function filter (arr) {

  arr.filter(item => {

    getSongSrc(item.id).then(res => {

      if (res.data.url) {
        return true
      }

      else {
        return false
      }


    })
  })



  return arr

}