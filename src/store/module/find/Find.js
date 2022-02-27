export default {

  state: {
    list: [],

    songerArea: -1,
    songerType: -1,
    songerList: []


  },


  mutations: {
    setList (state, playload) {
      state.list = playload
    },


    setsongerArea (state, playload) {
      state.songerArea = playload
    },
    setsongerType (state, playload) {
      state.songerType = playload
    },
    setsongerList (state, playload) {
      state.songerList = playload
    },
    addsongerList (state, playload) {
      state.songerList.push(...playload)
    }
  }





}