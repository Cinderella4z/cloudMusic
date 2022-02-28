import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import Private from './module/private/Private'
import Find from './module/find/Find'
import actions from './actions'
Vue.use(Vuex);


const state = {
  Input: '',
  ifplay: null,
  currentTime: 0, //记录当前音乐播放事件 ,
  duration: 0,//歌曲总时长
  muted: false,//静音
  songer: [],

  AllAddedSongs: [], //我喜欢的音乐
  AllAddedSongsId: [],

  CurrentSong: null,
  CurrentSongUrl: null,

  WaitSongs: [],
  WaitSongsId: [],
  WaitSongsUrl: [],

  HistorySongs: [],
  SearchSongs: [],
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    private: Private,
    find: Find
  },
  getters: {
    currentTime (state) {
      return state.currentTime.toFixed(0)
    }
  }

})

export default store