import { likeList } from '../../network/login'
import { getSongDetail } from '../../network/SongDetail'
import store from '../../store/index'


export function getLikelist (offset, page) {
  likeList(store.state.private.uid).then(res => {
    return res.data.ids
  }).then(ids => {
    let topSongs = 0;
    let start = offset * page

    if (start + offset >= ids.length) {

      topSongs = ids.splice(start, ids.length);
      setTimeout(() => {
        store.commit('setloadFinish', true)
      }, 1000)

    }
    else {
      topSongs = ids.splice(start, offset);
    }


    for (let id of topSongs) {
      getSongDetail(id).then(res => {
        store.commit('loadSongs', ...res.data.songs)
      })
    }
  })
}