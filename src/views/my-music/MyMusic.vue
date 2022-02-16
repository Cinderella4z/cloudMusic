<template>
  <div id="MyMusic">

    <songs :SearchSongs="getSongs "
           @SongClick="SongClick">
      <span slot="tabname">我喜欢的音乐</span>
      <div slot="playAll">
        <el-button type="danger"
                   @click="playAll"
                   round>▶ 播放全部</el-button>
      </div>
      <span slot="num2">音乐标题</span>
      <span slot="num3">歌手</span>
      <span slot="num4">专辑</span>
      <span slot="num4">时长</span>

      <div slot="loadMore"
           v-show="$store.state.private.uid"
           @click="loadmore">加载更多</div>

    </songs>

  </div>
</template>

<script>
import Songs from '../../components/content/songs/Songs'
import { getLikelist } from '../../assets/js/getLikelist'
import { playAll } from '../../assets/js/playAll'


export default {
  name: 'MyMusic',
  data () {
    return {
      loadPage: 0,
    }
  },
  computed: {

    getSongs () {
      return this.$store.state.AllAddedSongs
    }
  },
  components: {
    Songs
  },
  methods: {
    SongClick () {
      this.$emit('SongClick');
    },
    playAll () {
      playAll(this.$store.state.AllAddedSongs);

      setTimeout(() => {
        this.$emit('SongClick');
      }, 300)

    },
    loadmore () {
      this.loadPage++;
      getLikelist(50, this.loadPage)
    },
  }
}
</script>

<style>
#MyMusic {
  display: inline-block;
  height: calc(100vh - 72px - 80px);
  width: 85%;
  font-size: 16px;
}
</style>
