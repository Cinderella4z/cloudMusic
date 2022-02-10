<template>
  <div id="Recommend">
    <!-- 轮播图 -->
    <el-carousel :interval="4000"
                 type="card"
                 height="200px">
      <el-carousel-item v-for="item in imgUrl"
                        :key="item.imageUrl">
        <h3 class="medium"><img :src="item.imageUrl"></h3>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <song-list>
      <div slot="tabname">推荐歌单</div>

      <div class="zz">
        <div class="z"
             v-for="(i,k) in Recommend"
             @click="showList(i,k)">
          <SongItem>

            <div slot="img">
              <img :src="getUrl(k)">
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
import { getRecommend } from '../../../network/Find/child/recommend'
import { getSongDetail } from '../../../network/SongDetail'
import { getBanner } from '../../../network/banner'

export default {
  name: 'Recommend',
  data () {
    return {
      imgUrl: [],
    }
  },
  components: {
    SongList,
    SongItem
  },
  computed: {
    Recommend () {
      return this.$store.state.private.recommend
    },
  },

  created () {
    getBanner().then(res => {
      this.imgUrl.push(...res.data.banners);
    })

    getRecommend().then(res => {
      console.log(res);
      this.$store.commit('setRecommend', res.data.playlists.splice(0, 10))
    })
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
    },
    getUrl (k) {
      return this.$store.state.private.recommend[k].picUrl ? this.$store.state.private.recommend[k].picUrl : this.$store.state.private.recommend[k].coverImgUrl
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  line-height: 250px;
  border-radius: 30px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 30px;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 30px;
}
.el-carousel {
  width: 95%;
  margin: 20px auto;
}
.medium img {
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
