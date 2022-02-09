export default {

  state: {
    uid: null,
    ifclick: false,
    recommend: [],
    currentRecommend: [],
    loadFinish: false,
    // 登录背景
    backgroundUrl: '',
    // 头像
    url: '',
    // 名称
    name: '',
    followeds: '',
    follows: '',
  },

  mutations: {

    setuid (state, playload) {
      state.uid = playload
    },
    setRecommend (state, playload) {
      state.recommend = playload;
    },
    setCurrentRecommend (state, playload) {
      state.currentRecommend.push(playload)
    },
    ClearCurrentRecommend (state) {
      state.currentRecommend = []
    },
    setifclick (state) {
      state.ifclick = !state.ifclick
    },
    setloadFinish (start, playload) {
      start.loadFinish = playload
    },




    // 登陆成功后的东西
    setbackgroundUrl (state, playload) {
      state.backgroundUrl = playload
    },

    setUrl (state, playload) {
      state.url = playload
    },

    setname (state, playload) {
      state.name = playload
    },
    setfolloweds (state, playload) {
      state.followeds = playload
    },
    setfollows (state, playload) {
      state.follows = playload
    }

  }

}