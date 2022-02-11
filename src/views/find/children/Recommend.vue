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

      <SongItem v-for="(i,k) in Recommend"
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
import { getSongDetail } from '../../../network/SongDetail'


import { getBanner } from '../../../network/Find/child/banner'
import { getRecommendItem } from '../../../network/Find/child/find-songs'
import { getRecommend } from '../../../network/Find/child/recommend'
import { showList } from '../../../assets/js/find/showList'

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
  },
  activated () {
    getRecommend(10).then(res => {
      this.$store.commit('setRecommend', res.data.playlists)
    })
  },


  methods: {
    showList (i) {
      showList(i)
    },
    getUrl (k) {
      return this.$store.state.private.recommend[k].picUrl ? this.$store.state.private.recommend[k].picUrl : this.$store.state.private.recommend[k].coverImgUrl
    }
  }
}




</script>

<style >
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
