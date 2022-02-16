export default
  {

    // addSongs (state, playload) {
    //   state.AllAddedSongs.push(playload);
    // },
    addSongs (state, playload) {
      state.AllAddedSongs.unshift(playload);
      state.AllAddedSongsId.push(playload.id)
    },
    loadSongs (state, playload) {
      state.AllAddedSongs.push(playload);
      state.AllAddedSongsId.push(playload.id)
    },

    removeSongs (state, playload) {
      state.AllAddedSongs.splice(state.AllAddedSongs.indexOf(playload), 1);
      state.AllAddedSongsId.splice(state.AllAddedSongsId.indexOf(playload.id), 1);
    },
    getInput (state, playload) {
      state.Input = playload;
    },

    // 这是set 打错了
    getSearchSongs (state, playload) {
      state.SearchSongs = playload
    },
    addSearchSongs (state, playload) {
      state.SearchSongs.push(...playload)
    },
    ClearSearchSongs (state, playload) {
      state.SearchSongs = []
    },


    setCurrentSong (state, playload) {
      state.CurrentSong = playload;
    },
    setCurrentSongUrl (state, playload) {
      state.CurrentSongUrl = playload
    },



    addWaitSongs (state, playload) {
      state.WaitSongs.unshift(playload);
      state.WaitSongsId.unshift(playload.id);
    },
    addWaitSongsUrl (state, playload) {
      state.WaitSongsUrl.unshift(playload);
    },




    // 播放全部
    playAll (state, playload) {
      state.WaitSongs.unshift(...playload.songs)
      state.WaitSongsId.unshift(...playload.ids)
      state.WaitSongsUrl.unshift(...playload.srcs)
    },

    // playlist
    removeAllWaitSongs (state) {
      state.WaitSongs.splice(0, state.WaitSongs.length);
      state.WaitSongsId.splice(0, state.WaitSongsId.length);
      state.WaitSongsUrl.splice(0, state.WaitSongsUrl.length);

    },



    removeWaitSongs (state, playload) {
      state.WaitSongs.splice(state.WaitSongs.indexOf(playload), 1);
      state.WaitSongsId.splice(state.WaitSongsId.indexOf(playload.id), 1);

    },





    setIfplay (state, playload) {
      state.ifplay = playload;
    },
    setcurrentTime (state, playload) {
      state.currentTime = playload;
    },
    setduration (state, playload) {
      state.duration = playload;
    },
    setmuted (state) {
      state.muted = !state.muted;
    },
    setHistory (state, playload) {
      state.HistorySongs.unshift(playload)
    },

    setsonger (state, playload) {
      state.songer = []

      state.songer = playload
    },
    addsonger (state, playload) {

      state.songer.push(...playload)
    },
    clearsonger (state) {
      state.songer = []
    }
  }