<template>
  <div id="History">
    <songs :SearchSongs="getHistory"
           @SongClick=SongClick>

      <div slot="img"><img :src="getHistoryUrl"></div>
      <div slot="tabname">最近播放</div>
      <div slot="playAll">
        <el-button type="danger"
                   round>▶ 播放全部</el-button>
      </div>
      <span slot="num1">音乐标题</span>
      <span slot="num2">歌手</span>
      <span slot="num3">专辑</span>
      <span slot="num4">时长</span>

    </songs>

  </div>
</template>

<script>
import Songs from '../../components/content/songs/Songs'

export default {
  name: 'History',
  data () {
    return {

    }
  },
  components: {
    Songs
  },
  computed: {
    getHistory () {
      return this.$store.state.HistorySongs
    },

    getHistoryUrl () {
      return this.$store.state.HistorySongs[0].al.picUrl
    }


    //

  },
  methods: {
    SongClick () {
      this.$emit('SongClick')
    }
  }
}
</script>

<style>
#History {
  display: inline-block;
  width: 85%;
  font: 0;
}
</style>
