<template>
  <div id="Rank">

    <song-list>
      <div slot="tabname">
        榜单
      </div>

      <SongItem v-for="i in list"
                @clickList="showlist(i)">

        <div slot="img">
          <img :src="i.coverImgUrl">
        </div>

      </SongItem>

    </song-list>

  </div>
</template>

<script>
import { topList } from '../../../network/Find/child/topList'
import SongList from '../../../components/content/find/SongList'
import SongItem from '../../../components/content/find/Song-items'
import { showList } from '../../../assets/js/find/showList'


export default {
  name: 'Rank',
  data () {
    return {
      list: []
    }
  },
  components: {
    SongList,
    SongItem
  },

  created () {
    topList().then(res => {
      this.list = res.data.list
    })
  },
  methods: {
    showlist (i) {
      showList(i)
    }
  }

}
</script>

<style scoped>
</style>
