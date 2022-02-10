<template>
  <div id="PlayList">
    <div class="top">
      <div class="name">
        <span class="tt">当前播放</span>
        <span class="cc"
              @click="removeAll"><a href="#">清空列表</a></span>
      </div>
    </div>

    <div v-for="(i,k) in playList"
         @dblclick="playListClick(i,k)">
      <div class="playListItem"
           :class="{backColor:k%2!=0}">
        <span class="playListName"
              :class="{red:current==k}">{{i.name}}</span>
        <span class="playListName"
              :class="{red:current==k}">{{i.ar[0].name}}</span>
      </div>
    </div>

    <div v-show="!ifexist"
         class="noSongs">
      <span class="playListName">你还没有添加任何歌曲!</span>
    </div>

  </div>
</template>

<script>

import { getSongDetail } from '../../network/SongDetail'
import { getSongSrc } from '../../network/idFindSrc'

export default {
  name: 'PlayList',

  props: {
    WaitSongs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    playList () {
      return this.$store.state.WaitSongs
    },
    current () {
      return this.$store.state.WaitSongs.indexOf(this.$store.state.CurrentSong)
    },
    ifexist () {
      return this.$store.state.WaitSongs.length
    }
  },
  methods: {
    playListClick (i, k) {
      this.$store.commit('setCurrentSong', i) //把点击的歌传给state

      getSongSrc(i.id).then(res => {
        this.$store.commit('setCurrentSongUrl', res.data.data[0].url);
        this.$emit('loadSong');
      })

      this.$store.commit('setIfplay', true)
    },
    removeAll () {
      this.$store.commit('removeAllWaitSongs');
      this.$store.commit('setCurrentSong', null);
      this.$store.commit('setCurrentSongUrl', null);
      this.$emit('loadSong')

    }
  }
}
</script>

<style>
.red {
  color: #ec4141;
}

#PlayList {
  position: absolute;
  color: #d0d0d0;
  top: calc(-100vh + 72px + 80px - 5px);
  width: 400px;
  right: -80px;
  height: calc(100vh - 72px - 80px);
  background-color: #363636;
  overflow-y: scroll;
  z-index: 9;
}
.top {
  font-weight: bolder;
  font-size: 20px;
  height: 80px;
  /* background-color: red; */
}
.name {
  margin-left: 15px;
  /* background-color: azure; */
  position: relative;
  height: 80px;
  margin-right: 15px;
  border-bottom: 2px solid #3d3d3d;
}
.playListItem {
  /* background-color: rosybrown; */
  height: 40px;
  display: flex;
  text-align: left;
}
.playListName {
  flex: 1;
  font-size: 14px;
  line-height: 40px;
  overflow: hidden;
  color: #888888;
  padding-left: 15px;
}
.backColor {
  background-color: #393939;
}
.noSongs {
  margin-top: 100px;
}
.cc {
  font-size: 13px;
  font-weight: normal;
  display: inline-block;
  width: 60px;
  height: 40px;
  line-height: 40px;
  right: 0;
  position: absolute;
  bottom: 0;
}
.cc a {
  color: #85b9e6;
}
.tt {
  float: left;
}
</style>
