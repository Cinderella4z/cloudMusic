import { getSongSrc } from '../network/idFindSrc'


export default {

  setCurrentSong (context, playload) {
    context.commit('setCurrentSong', playload)

    getSongSrc(playload.id).then(res => {
      context.commit('setCurrentSongUrl', res.data.data[0].url)
    })

  },

  addWaitSongs (context, playload) {

    context.commit('addWaitSongs', playload)

    getSongSrc(playload.id).then(res => {

      context.commit('addWaitSongsUrl', res.data.data[0].url)


    })



  }

}