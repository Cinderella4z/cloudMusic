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
           @click="loadmore">加载更多</div>

    </songs>

  </div>
</template>

<script>
import Songs from '../../components/content/songs/Songs'
import { getLikelist } from '../../assets/js/getLikelist'


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
      // 将我喜欢的音乐 全部加进 播放列表
      this.$store.commit('removeAllWaitSongs')
      this.$store.commit('addAll', {
        songs: this.$store.state.AllAddedSongs,
        songId: this.$store.state.AllAddedSongsId,
        songUrl: this.$store.state.AllAddedSongsUrl,
        songDetail: this.$store.state.AllAddedSongsDetail,
      });
      this.$store.commit('setCurrentSong', this.$store.state.AllAddedSongs[0]);
      this.$store.commit('setCurrentSongUrl', this.$store.state.AllAddedSongsUrl[0]);
      this.$store.commit('setCurrentSongDetail', this.$store.state.AllAddedSongsDetail[0])

      this.$emit('SongClick');
      this.$store.commit('setIfplay', true)
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
