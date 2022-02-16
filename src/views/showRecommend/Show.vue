<template>
  <div id="Show">

    <songs :SearchSongs="getCurrentRecommend"
           @SongClick="SongClick">
      <span slot="img"><img :src="currentRecommend.coverImgUrl || currentRecommend.picUrl"></span>

      <span slot="tabname">{{currentRecommend.name}}</span>
      <div slot="playAll">
        <el-button type="danger"
                   @click="playAll"
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
import { playAll } from '../../assets/js/playAll'


export default {
  name: 'Show',
  data () {
    return {
      currentRecommend: '',
    }
  },
  components: {
    Songs
  },
  activated () {
    this.currentRecommend = JSON.parse(this.$route.query.recommend)
  },
  computed: {
    getCurrentRecommend () {
      return this.$store.state.private.currentRecommend
    },
  },
  methods: {
    SongClick () {
      this.$emit('SongClick')
    },
    playAll () {
      playAll(this.$store.state.private.currentRecommend)

      setTimeout(() => {
        this.$emit('SongClick');
      }, 300)
    }
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
