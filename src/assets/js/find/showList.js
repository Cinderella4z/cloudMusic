import { getSongDetail } from '../../../network/SongDetail'
import { getRecommendItem } from '../../../network/Find/child/find-songs'

import store from '../../../store/index'
import router from '../../../router/index'

export function

  showList (i, k) {


  getRecommendItem(i.id).then(res => {

    // 为了处理res 获取歌曲的ids
    let ids = [];
    let obj = (res.data.playlist.trackIds).splice(0, 20)


    for (let item of obj) {
      ids.push(item.id)
    }

    if (store.state.private.currentRecommend.length !== 0) {
      store.commit('ClearCurrentRecommend')
    }

    // 通过ID 查询 歌曲的详细信息 以便 使用Songs 组件 
    for (let id of ids) {
      getSongDetail(id).then(res => {
        // console.log(...res.data.songs);
        store.commit('setCurrentRecommend', ...res.data.songs)
      })
    }
    // router.push('/show/' + i); 需要配置路由/:recommend
    router.push({
      path: '/show',
      query: {
        recommend: JSON.stringify(i)
      }
    })

  })
}
