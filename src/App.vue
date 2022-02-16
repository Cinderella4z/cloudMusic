<template>
  <div id="App">
    <!-- 1.顶部nav bar 的实现 -->
    <main-nav-bar />
    <!-- 2.侧边栏实现 -->
    <slid-bar />
    <!-- 3.中间歌曲部分的实现 -->
    <keep-alive>
      <router-view @SongClick="SongClick" />
    </keep-alive>

    <login v-if="$store.state.private.ifclick"></login>

    <!-- 4.音频控制栏 -->
    <!--   @next="SongClick" -->
    <control @playClick="playClick"
             @pauseClick="pauseClick"
             @loadSong="SongClick"
             @changeVolume="changeVolume"
             @muted="muted"
             @change="change" />
    <!-- 5.播放 -->
    <audio autoplay
           @canplay="getDuration"
           @timeupdate="updateTime"
           @ended="ended"
           ref="audio">
      <source :src=" this.$store.state.CurrentSongUrl">
    </audio>

  </div>
</template>

<script>
import axios from 'axios'

import MainNavBar from './components/content/nav-bar/Main-Nav-Bar.vue'
import SlidBar from './views/slid-bar/Slid-Bar'

import TabBar from './components/content/tab-bar/Tab-Bar'
import Control from './views/control-bar/Control'
import Login from './views/login/Login'






export default {
  name: 'App',
  data () {
    return {

    }
  },
  components: {
    MainNavBar,
    SlidBar,
    TabBar,
    Control,
    Login

  },
  methods: {
    // 监听歌曲点击
    SongClick () {
      this.$refs.audio.load();
    },
    // 控制 音频播放
    playClick () {
      this.$refs.audio.play()
    },
    pauseClick () {
      this.$refs.audio.pause()
    },

    // audio内置的钩子函数 可以获歌曲总时长
    getDuration () {
      // console.log(this.$refs.audio.duration); //此时可以获取到duration
      this.$store.commit('setduration', this.$refs.audio.duration)
    },

    // audio内置钩子函数
    updateTime (e) {
      let currentTime = (e.target.currentTime);

      this.$store.commit('setcurrentTime', currentTime)   //获取audio当前播放时间
    },
    changeVolume (value) {
      this.$refs.audio.volume = value / 100
    },

    muted () {
      this.$refs.audio.muted = this.$store.state.muted
    },
    change () {
      this.$refs.audio.currentTime = this.$store.state.currentTime;
    },
    // 歌曲结束后
    ended () {
      let currentIndex = this.$store.state.WaitSongs.indexOf(this.$store.state.CurrentSong); //记入当前播放的歌曲
      let length = this.$store.state.WaitSongs.length


      if (currentIndex == length - 1) {
        this.$refs.audio.pause();
        this.$store.commit('setIfplay', false);
      }
      else {

        this.$store.commit('setCurrentSongUrl', this.$store.state.WaitSongsUrl[currentIndex + 1])
        this.$store.commit('setCurrentSong', this.$store.state.WaitSongs[currentIndex + 1])
        this.$refs.audio.load()
      }
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#App {
  height: 100vh;
  width: 100vw;
  font-size: 0;
  min-width: 1500px;
}
</style>
