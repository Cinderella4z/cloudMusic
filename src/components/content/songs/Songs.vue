<template>
  <div id="Songs">

    <div class="tabname">

      <div class="img">
        <slot name="img"></slot>
      </div>

      <div class="inline">
        <div class="tab-name">
          <slot name="tabname"></slot>
        </div>
        <div class="playAll">
          <slot name="playAll"></slot>
        </div>
      </div>

    </div>
    <div class="tap">
      <slot name="num1"></slot>
      <slot name="num2"></slot>
      <slot name="num3"></slot>
      <slot name="num4"></slot>
      <slot name="num5"></slot>
    </div>
    <div v-for="(i,k) in SearchSongs"
         class="box"
         @mousemove="mousemove(k)"
         :class="{grey:currentKey===k,dd:getCurrentSong===i.id,backcolors:k%2===0}"
         @dblclick="SongClick(i)">
      <!-- 收藏功能 -->
      <span class="index">{{k+1 >= 10 ? k+1 : '0'+ (k+1)}}</span>
      <span @click="add(i,k)"
            class="iRight"
            v-if="$store.state.AllAddedSongsId.indexOf(i.id)==-1"><a href="#">❤</a></span>

      <span @click="remove(i,k)"
            v-else
            class="iRight"><a href="#"
           class="isAdded">❤</a></span>

      <span class="songname"
            :class="{colorRed:getCurrentSong===i.id}">{{i.name}}</span>

      <span class="artists"
            @click="getsonger(i)">{{i.ar[0].name}}</span>

      <span class="artists">{{i.al.name}}</span>
      <span class="artists">-</span>
    </div>

    <div class="loadMore"
         v-if="!$store.state.private.loadFinish">
      <slot name="loadMore"></slot>
    </div>

  </div>

</template>

<script>
import { search } from '../../../network/search'
import { filter } from '../../../assets/js/filterUrl'
import { songer } from '../../../network/Songer'
import { songerDetail } from '../../../network/songerDetail'

export default {
  name: 'Songs',
  data () {
    return {
      currentKey: '0',
      noUrl: []
    }
  },
  props: {
    SearchSongs: []
  },




  computed: {
    getCurrentSong () {
      return this.$store.state.CurrentSong === null ? [] : this.$store.state.CurrentSong.id;
    },
    getInput () {
      return this.$store.state.input
    }
  },

  methods: {

    // 控制 背景颜色
    mousemove (k) {
      this.currentKey = k;
    },
    // 获取点击歌曲 信息 传入state
    SongClick (i) {
      this.$store.dispatch('setCurrentSong', i) //把点击的歌传给state
      // 判断历史播放是否存在， 避免重复添加
      if (this.$store.state.HistorySongs.indexOf(i) == -1) {
        this.$store.commit('setHistory', i);
      }
      // 判断playList播放列表避免重复了
      if (this.$store.state.WaitSongs.indexOf(i) == -1) {
        this.$store.dispatch('addWaitSongs', i);
      }
      setTimeout(() => {
        this.$emit('SongClick');
      }, 500)

      this.$store.state.ifplay = true;  //双击 则播放 控制播放暂停按键的显示
    },

    // 歌曲收藏 和 删除 功能
    add (i) {
      this.$store.commit('addSongs', i);
    },
    remove (i) {
      this.$store.commit('removeSongs', i)
    },

    getsonger (i) {


      songer(i.ar[0].id).then(res => {
        this.$store.commit('setsonger', res.data.songs)
      })

      songerDetail(i.ar[0].id).then(res => {
        this.$router.push({
          path: '/songer',
          query: {
            currentSonger: JSON.stringify(res.data.data.artist)
          }
        })
      })



    },


  },

}
</script>

<style scoped>
.dd {
  background-color: var(--mouseOver);
}
.backcolors {
  background-color: #2e2e2e;
}

.grey {
  background-color: var(--mouseOver);
}
#Songs {
  display: inline-block;
  height: calc(100vh - 72px - 80px);
  background-color: #2b2b2b;
  overflow-y: scroll;
  font-size: 16px;
  width: 100%;
}
.tap {
  padding-left: 86px;
  padding-right: 30px;
  color: var(--tabColor);
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  display: flex;
}
.tap span {
  display: inline-block;
  flex: 1;
}
.box {
  padding-left: 30px;
  padding-right: 30px;
  color: var(--tabColor);
  display: flex;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
}
.box1 {
  flex: 1;
}

.index {
  font-size: 13px;
  color: #5c5c56;
}
.songname {
  display: inline-block;
  color: #cad0d0;
  font-size: 16px;
  flex: 1;
}
.colorRed {
  color: #ec4141;
}
.artists {
  display: inline-block;
  flex: 1;
}
.el-icon-star-off {
  line-height: 45px;
  font-size: 18px;
}
.el-icon-star-on {
  line-height: 45px;
  color: var(--addItem);
  font-size: 20px;
}
.iRight {
  padding-right: 15px;
  padding-left: 10px;
}
.noshow {
  display: none;
}
.tabname {
  color: #d0d0d0;
  font-weight: bolder;
  font-size: 25px;
  line-height: 60px;
  height: 180px;
}
.tab-name {
  height: 60px;
  margin-top: 20px;
  overflow: hidden;
}
.img {
  width: 200px;
  height: 170px;
  margin-left: 20px;
  margin-top: 10px;
  display: inline-block;
  vertical-align: top;
}
.img img {
  width: 100%;
  border-radius: 10px;
  height: 100%;
}
.inline {
  padding-left: 20px;
  display: inline-block;
}

.isAdded {
  color: var(--addItem);
}
.plus {
  display: inline-block;
  /* background-color: chartreuse; */
  width: 20px;
  height: 20px;
  text-align: center;
  margin-right: 10px;
}
.el-icon-plus {
  font-weight: bolder;
  font-size: 16px;
}
.plus-red {
  display: inline-block;
  /* background-color: chartreuse; */
  width: 20px;
  height: 20px;
  text-align: center;
  margin-right: 10px;
  color: var(--addItem);
}
.el-button {
  color: #ffffff;
  background-color: #ec4141;
  border: 0;
}

.offset {
  height: 70px;
  text-align: center;
  width: 80%;
  line-height: 70px;
  color: #ec4141;
}

.loadMore {
  /* background-color: #ec4141; */
  text-align: center;
  width: 85%;
  height: 50px;
  line-height: 50px;
  color: #888888;
}
</style>
