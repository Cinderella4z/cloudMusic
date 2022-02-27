<template>
  <div id="List">

    <song-list>
      <div slot="tabname">
        <span v-for="(i,k) in tabs"
              class="tabs"
              :class="{backcolor:k===index}"
              @click="getList(k)">{{i}}</span>
      </div>

      <SongItem v-for="(i,k) in List"
                :key="i.id"
                @clickList="showList(i,k)">

        <div slot="img">
          <img :src="getUrl(k)">
        </div>

        <div slot="text">
          {{i.name}}
        </div>

      </SongItem>

    </song-list>

  </div>
</template>

<script>
import SongList from '../../../components/content/find/SongList'
import SongItem from '../../../components/content/find/Song-items'

import { highquality } from '../../../network/Find/child/highquality'
import { showList } from '../../../assets/js/find/showList'
export default {
  name: 'List',
  data () {
    return {
      tabs: ['华语', '流行', '摇滚', '民谣', '电子', '轻音乐', '影视原声'],
      index: 0
    }
  },
  components: {
    SongList,
    SongItem
  },
  activated () {
    let cat = this.tabs[this.index]
    highquality(cat, 20).then(res => {
      this.$store.commit('setList', res.data.playlists)
    })
  },


  methods: {
    getList (k) {
      this.index = k;
      let cat = this.tabs[k]
      highquality(cat, 20).then(res => {
        this.$store.commit('setList', res.data.playlists)
      })
    },
    getUrl (k) {
      return this.$store.state.find.list[k].picUrl ? this.$store.state.find.list[k].picUrl + "?param=150y150" : this.$store.state.find.list[k].coverImgUrl + "?param=150y150"
    },
    showList (i) {
      showList(i)
    }
  },

  computed: {
    List () {
      return this.$store.state.find.list
    }
  }
}



</script>

<style>
.tabs {
  color: #878787;
  font-size: 14px;
  font-weight: normal;
  margin-right: 10px;
}
.backcolor {
  color: #ec4141;
}
</style>
