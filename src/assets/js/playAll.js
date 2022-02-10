import store from '../../store/index'
import { getSongSrc } from '../../network/idFindSrc';


export function playAll (songs) {

  // 获取传来的歌曲的id
  let ids = [];
  new Promise((resolve) => {
    let srcs = [];
    for (let item of songs) {
      ids.push(item.id)
      getSongSrc(item.id).then(res => {
        srcs.push(res.data.data[0].url)
      })
    }

    setTimeout(function () {
      // console.log(srcs);
      resolve(srcs)
    }, 300)

  }).then((srcs) => {
    // console.log(srcs);
    store.commit('removeAllWaitSongs')
    store.commit('playAll', {
      songs: songs,
      ids: ids,
      srcs: srcs
    })
    store.commit('setCurrentSong', songs[0])
    store.commit('setCurrentSongUrl', srcs[0])
  })


  store.commit('setIfplay', true)
}


