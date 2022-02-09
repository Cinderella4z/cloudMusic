<template>
  <div id="Recommend">
    <song-list>
      <div slot="tabname">推荐歌单</div>

      <div class="zz">
        <div class="z"
             v-for="(i,k) in Recommend"
             @click="showList(i,k)">
          <SongItem>

            <div slot="img">
              <img :src="i.picUrl">
            </div>

            <div slot="text">
              {{i.name}}
            </div>

          </SongItem>
        </div>
      </div>
    </song-list>

  </div>
</template>

<script>
import SongList from '../../../components/content/find/SongList'
import SongItem from '../../../components/content/find/Song-items'

import { getRecommendItem } from '../../../network/find-songs'
import { getSongDetail } from '../../../network/SongDetail'

export default {
  name: 'Recommend',
  data () {
    return {

    }
  },
  components: {
    SongList,
    SongItem

  },
  computed: {
    Recommend () {
      return this.$store.state.private.recommend
    }
  },



  methods: {
    showList (i, k) {
      getRecommendItem(i.id).then(res => {

        // 为了处理res 获取歌曲的ids
        let ids = [];
        let obj = (res.data.playlist.trackIds).splice(0, 20)


        for (let item of obj) {
          ids.push(item.id)
        }

        if (this.$store.state.private.currentRecommend.length !== 0) {
          this.$store.commit('ClearCurrentRecommend')
        }

        // 通过ID 查询 歌曲的详细信息 以便 使用Songs 组件 
        for (let id of ids) {
          getSongDetail(id).then(res => {
            // console.log(...res.data.songs);
            this.$store.commit('setCurrentRecommend', ...res.data.songs)
          })
        }
        this.$router.push('/show');

      })
    }
  }
}




</script>

<style >
.z {
  display: inline-block;
}
.z img {
  border-radius: 20px;
}
.zz {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
