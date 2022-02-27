<template>
  <div id="search">

    <songs :SearchSongs="SearchSongs"
           @SongClick="SongClick">
      <span slot="img"><img :src="songsImg"></span>
      <div slot="tabname">你正在搜索:{{Input}}</div>
      <span slot="num1">音乐标题</span>
      <span slot="num2">歌手</span>
      <span slot="num3">专辑</span>
      <span slot="num4">时长</span>

    </songs>

  </div>
  </songs>

  </div>
</template>

<script>
import Songs from '../../components/content/songs/Songs'

export default {
  name: 'search',
  data () {
    return {
    }
  },
  components: {
    Songs,
  },

  computed: {
    Input () {
      return this.$store.state.Input
    },
    SearchSongs () {
      return this.$store.state.SearchSongs
    },
    songsImg () {
      return this.$store.state.SearchSongs[0].al.picUrl + '?param=150y150'
    },
  },
  methods: {
    // 获取点击歌曲 发送给父组件 app
    SongClick () {
      this.$emit('SongClick')
    },

  },

}

</script>

<style>
#search {
  display: inline-block;
  width: 85%;
  font-size: 0px;
  position: relative;
}
</style>
