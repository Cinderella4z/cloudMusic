<template>
  <div id="Control">

    <div class="content"
         v-if="ifShow()">

      <span class="tab1">

        <span class="songimg"
              @click="showGeci">
          <img :src="CurrentSongerImg+'?param=100y100'">
        </span>

        <span class="CurrentSongName">
          <span class="p1">{{CurrentSongName}}
          </span>
          <span class="p2">{{CurrentSonger}}</span>
        </span>
        <span class="love">
          <span v-if="ifExist"
                @click="AddedSongs"><a href="#">❤</a></span>
          <span v-else
                @click="removeAddedSongs"><a href="#"
               class="red">❤</a></span>
        </span>

      </span>

      <span class="control">
        <!-- ◀▶◁▷ -->
        <span class="tab-center">

          <span class="one"
                @click="lastSong"><img src="../../assets/img/tabControl/1.png"></span>
          <span class="two"
                @click="pauseClick"
                v-if="this.$store.state.ifplay"><span class="pass">| |</span></span>

          <span class="two"
                v-else
                @click="playClick"><span class="start">▶</span></span>

          <span class="one"
                @click="nextSong"><img src="../../assets/img/tabControl/3.png"></span>

        </span>

        <!-- 中间 歌曲时间 和 拖动条 -->
        <span class="bottom-control">
          <span class="currentTime"> {{CurrentTimeType}}</span>
          <el-slider :value="CurrentTime"
                     :max="TotalTime"
                     :show-tooltip="false"
                     @change="change"
                     @input="getLeft"
                     ref="slider"></el-slider>
          <span class="totalTime"> {{TotalTimeType}}</span>
        </span>

      </span>

      <span class="tab3">
        <span class="el-fold"><i class="el-icon-s-unfold"></i></span>
        <span class="el-fold"><i class="el-icon-s-unfold"></i></span>

        <!-- 音量 -->
        <span class="el-fold"
              @mouseover="showAudio"
              @mouseout="noAudio">
          <div class="slider-audio"
               @mouseover="showAudio"
               v-show="audioShow"
               ref="sliderAudio">
            <el-slider v-model="value"
                       @change="changeVolume"
                       vertical
                       height="100px">
            </el-slider>
          </div>
          <i class="el-icon-headset"
             @click="muted"></i>
        </span>

        <!-- 折叠栏 -->
        <span class="el-fold"
              @click="IfplayListShow">
          <i class="el-icon-s-unfold"></i>
        </span>
        <play-list v-show="playListShow"
                   @click="showPlayList"
                   @loadSong="loadSong" />

      </span>
    </div>

    <!-- 默认 -->
    <div v-else
         class="content">
      <span class="control">
        <!-- ◀▶◁▷ -->
        <span class="tab-center">
          <span class="one"><img src="../../assets/img/tabControl/1.png"></span>
          <span class="two"><span class="start">▶</span></span>
          <span class="one"><img src="../../assets/img/tabControl/3.png"></span>
        </span>

      </span>
    </div>

  </div>

</template>

<script>
import PlayList from '../playList/PlayList'
import { getSongSrc } from '../../network/idFindSrc'
import { geci } from '../../network/geci'

export default {
  name: 'Control',
  data () {
    return {
      customColor: '#ec4141',
      value: 100, //控制音量的大小值
      audioShow: 0, //控制音量按键是否显示
      left: 0,//得到 拖动的距离
      playListShow: 0,
      show: false,
    }
  },
  components: {
    PlayList
  },


  computed: {
    CurrentSongId () {
      return this.$store.state.CurrentSong.id
    },
    CurrentSongName () {
      return this.$store.state.CurrentSong.name
    },
    CurrentSonger () {
      return this.$store.state.CurrentSong.ar[0].name
    },
    CurrentSongerImg () {
      return this.$store.state.CurrentSong.al.picUrl
    },
    CurrentSong () {
      return this.$store.state.CurrentSong
    },
    AllAddedSongs () {
      return this.$store.state.AllAddedSongs
    },

    //   计算当前歌曲的总时长和播放时间
    CurrentTime () {
      return this.$store.state.currentTime;
    },                                                 //计算属性里放动态变量会出问题
    TotalTime () {
      return parseInt(this.$store.state.duration);
    },
    TotalTimeType () {
      // return '0' + parseInt((parseInt(this.$store.state.duration) / 60)) + ':' + (parseInt(this.$store.state.duration) % 60)
      return parseInt(this.$store.state.duration) % 60 >= 10 ? '0' + parseInt((parseInt(this.$store.state.duration) / 60)) + ':' + (parseInt(this.$store.state.duration) % 60) : '0' + parseInt((parseInt(this.$store.state.duration) / 60)) + ':0' + (parseInt(this.$store.state.duration) % 60)

    },
    CurrentTimeType () {

      return parseInt(this.$store.state.currentTime) < 10 ? '00:0' + parseInt(this.$store.state.currentTime) : (parseInt(this.$store.state.currentTime) < 60 ? '00:' + parseInt(this.$store.state.currentTime) : (parseInt(this.$store.state.currentTime) % 60 == 0 ? '0' + parseInt(parseInt(this.$store.state.currentTime) / 60) + ':00' : (parseInt(this.$store.state.currentTime) % 60 < 10 ? '0' + parseInt(parseInt(this.$store.state.currentTime) / 60) + ':0' + (parseInt(this.$store.state.currentTime) % 60) : '0' + parseInt(parseInt(this.$store.state.currentTime) / 60) + ':' + (parseInt(this.$store.state.currentTime) % 60))))

      // return h < 10 ? '00:0' + h : (h < 60 ? '00:' + h : (h % 60 == 0 ? '0' + parseInt(h / 60) + ':00' : (h % 60 * 60 < 10 ? '0' + parseInt(h / 60) + ':0' + (h % 60 * 60) : '0' + parseInt(h / 60) + ':' + (h % 60 * 60)))
      // return h < 10 ? '00' + ':0' + h : (h<60 ? '00:'+h : (h%60==0 ? '0'+parseInt(h/60)+'00' : '0'+parseInt(h/60)+':'+))
      // return parseInt(this.$store.state.currentTime) / 60 < 0 ? (h < 10 ? '00:0' + h : '00:' + h) : (parseInt(this.$store.state.currentTime) / 60 == 0 ? '0' + parseInt(parseInt(this.$store.state.currentTime) / 60) + ':00' : (parseInt(this.$store.state.currentTime) % 60 < 10 ? '0' + parseInt(parseInt(this.$store.state.currentTime) / 60) + ':0' + parseInt(parseInt(this.$store.state.currentTime) % 60) : '0' + parseInt(parseInt(this.$store.state.currentTime) / 60) + parseInt(parseInt(this.$store.state.currentTime) % 60)))
    },

    // 判断是否被搜藏
    ifExist () {
      return this.$store.state.AllAddedSongsId.indexOf(this.$store.state.CurrentSong.id) === -1  //如果 不加-1 就会出bug
    },


  },



  methods: {


    // 判断是默认 还是 播放歌曲的control栏
    ifShow () {
      if (this.$store.state.CurrentSong !== null) {
        return true
      }
      else {
        return false
      }
    },
    // 侧边栏的显示
    IfplayListShow () {
      this.playListShow = !this.playListShow
    },
    showPlayList () {
      this.playListShow = 1
    },
    loadSong () {
      this.$emit('loadSong');
    },

    // 控制播放暂停显示
    pauseClick () {
      this.$store.state.ifplay = false;
      this.$emit('pauseClick',); //将控制播放值传过去
    },
    playClick () {
      this.$store.state.ifplay = true;
      this.$emit('playClick',); //将控制播放值传过去
    },

    // 收藏 和 删除功能
    AddedSongs () {
      this.$store.commit('addSongs', this.$store.state.CurrentSong)
    },
    removeAddedSongs () {
      this.$store.commit('removeSongs', this.$store.state.CurrentSong)
    },

    // 控制音量功能
    showAudio () {
      this.audioShow = 1;
    },
    noAudio () {
      this.audioShow = 0;
    },
    changeVolume () {
      this.audioShow = 1;
      this.$store.commit('setVolume', this.value / 100);
      this.$emit('changeVolume', this.value);
    },
    muted () {
      if (this.value != 0) {
        this.value = 0
      }
      else {
        this.value = 100
      }
      this.$store.commit('setmuted');
      this.$emit('muted');
    },

    // 拖动条的实现
    change () {
      // 这是拖动 改变歌曲事件 
      this.$store.commit('setcurrentTime', parseFloat(this.left).toFixed(6) * parseInt(this.$store.state.duration) / 100)
      this.$emit('change');
    },
    getLeft () {
      this.left = this.$refs.slider.$children[0].$el.style.left  //滑动过程得到他的滑动距离
    },


    // 控制 上一首 下一首
    nextSong () {
      let currentIndex = this.$store.state.WaitSongs.indexOf(this.$store.state.CurrentSong); //记入当前播放的歌曲
      let length = this.$store.state.WaitSongs.length
      if (currentIndex === length - 1) {

        alert("暂无下一首")

      }
      else {
        this.$store.commit('setCurrentSongUrl', this.$store.state.WaitSongsUrl[currentIndex + 1])
        this.$store.commit('setCurrentSong', this.$store.state.WaitSongs[currentIndex + 1])
        this.$emit('loadSong')
      }

      // if (this.$store.state.HistorySongs.indexOf(this.$store.state.CurrentSongId) === -1) {
      //   this.$store.commit('setHistory', this.$store.state.CurrentSong)
      // }

    },
    lastSong () {
      let currentIndex = this.$store.state.WaitSongs.indexOf(this.$store.state.CurrentSong); //记入当前播放的歌曲
      let length = this.$store.state.WaitSongs.length
      if (currentIndex == 0) {

        alert("暂无上一首")

      }
      else {
        this.$store.commit('setCurrentSongUrl', this.$store.state.WaitSongsUrl[currentIndex - 1])
        this.$store.commit('setCurrentSong', this.$store.state.WaitSongs[currentIndex - 1])
        this.$emit('loadSong')

      }
    },

    showGeci () {

      if (this.$route.path === '/geci') {
        this.$router.back()
      }
      else {
        this.$router.push('/geci')
      }
    }
  }
}
</script>

<style>
.red {
  color: #d73535;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background: #2b2b2b;
  border-radius: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background-color: #3f3f3f;
  min-height: 10px;
  min-width: 10px;
  border-radius: 5px;
  position: absolute;
}

#Control {
  background-color: var(--Control-tabbar);
  width: 100%;
  height: 80px;
  position: relative;
  font-size: 16px;
}

.content {
  /* background-color: gold; */
  width: calc(100% - 160px);
  height: calc(100% - 10px);
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 80px;
  right: 80px;
  display: flex;
}

/* 左边 */
.tab1 {
  display: inline-block;
  width: 20%;
  position: relative;
  /* background-color: chartreuse; */
  overflow: hidden;
  min-width: 200px;
}
.songimg {
  width: 65px;
  height: 65px;
  display: inline-block;
  border-radius: 10px;
  overflow: hidden;
}
.songimg img {
  height: 65px;
}
.p2 {
  margin-top: 2px;
  color: var(--songName);
  display: inline-block;
  overflow: hidden;
  height: 50%;
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* background-color: cadetblue; */
}
.p1 {
  margin-top: 8px;
  font-weight: bolder;
  font-size: 18px;
  color: var(--songName);
  display: inline-block;
  height: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100px;

  /* background-color: cadetblue; */
}
.CurrentSongName {
  width: 40%;
  height: 100%;
  /* background-color: gray; */
  display: inline-block;
  overflow: hidden;
  margin-left: 20px;
}
.love {
  font-size: 23px;
  position: absolute;
  top: 3px;
  height: 25px;
  width: 25px;
  overflow: hidden;
}
/* 控制栏 */
.control {
  /* background-color: aquamarine; */
  position: relative;
  height: 100%;
  flex: 1;
}
.tab-center {
  display: inline-block;
  font-size: 24px;
  /* background-color: white; */
  width: 30%;
  height: 50%;
  margin-top: 5px;
  margin-left: calc(35%);
  display: flex;
}
.one {
  text-align: center;
  display: inline-block;
  flex: 1;
  /* background-color: blue; */
}
.two {
  flex: 1;
  text-align: center;
  display: inline-block;
  color: #d4d4d4;
  line-height: 30px;
  font-weight: bolder;
  overflow: hidden;
  white-space: nowrap;
}
.start {
  font-size: 35px;
}
.bottom-control {
  display: flex;
  justify-content: space-around;
}
.currentTime {
  top: 40px;
  left: 28px;
  color: #5f5f61;
  font-size: 15px;
  font-weight: bolder;
  /* background-color: #ec4141; */
}
.totalTime {
  /* position: absolute; */
  top: 40px;
  right: 30px;
  color: #5f5f61;
  font-size: 15px;
  font-weight: bolder;
}

/* 右侧 */
.tab3 {
  display: inline-block;
  width: 20%;
  display: flex;
  position: relative;
  text-align: center;
  line-height: 70px;
}
.el-fold {
  display: inline-block;
  font-size: 24px;
  color: var(--songName);
  flex: 1;
  right: 0;
  position: relative;
  /* background-color: blanchedalmond; */
}
/* 未走过的距离 */
.el-slider__runway {
  margin-top: 8px;
  background-color: #49494c;
}
.el-slider__bar {
  background-color: #ec4141;
}
.el-slider {
  width: 80%;
  /* background-color: black; */
  margin: 0 auto;
}
.el-slider__button {
  width: 12px;
  height: 12px;
  border: 0;
  background-color: #ec4141;
}
.slider-audio {
  position: absolute;
  bottom: 60px;
  width: 40px;
  height: 120px;
  border-radius: 10px;
  background-color: #252525;
  left: 14px;
}
.el-slider.is-vertical .el-slider__runway {
  margin: 0 auto;
  margin-top: 10px;
  z-index: 9;
}
</style>
