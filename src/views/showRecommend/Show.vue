<template>
  <div id="Show">

    <songs :SearchSongs="getCurrentRecommend"
           @SongClick="SongClick">
      <span slot="tabname">推荐歌单</span>
      <div slot="playAll">
        <el-button type="danger"
                   round>▶ 播放全部</el-button>
      </div>
      <span slot="num2">音乐标题</span>
      <span slot="num3">歌手</span>
      <span slot="num4">专辑</span>
      <span slot="num4">时长</span>
    </songs>
  </div>
</template>

<script>
import Songs from '../../components/content/songs/Songs'


export default {
  name: 'Show',
  data () {
    return {

    }
  },
  components: {
    Songs
  },
  computed: {
    getCurrentRecommend () {
      return this.$store.state.private.currentRecommend
    }
  },
  methods: {
    SongClick () {
      this.$emit('SongClick')
    },

  }
}
</script>

<style scoped>
#Show {
  font-size: 0px;
  display: inline-block;
  width: 85%;
}
</style>
