<template>
  <div id="Find">

    <div class="tab">
      <span v-for="(i,k) in tab"
            class="tab-item">
        {{i}}
      </span>
    </div>
    <!--  -->
    <el-carousel :interval="4000"
                 type="card"
                 height="200px">
      <el-carousel-item v-for="item in imgUrl"
                        :key="item.imageUrl">
        <h3 class="medium"><img :src="item.imageUrl"></h3>
      </el-carousel-item>
    </el-carousel>
    <!--  -->
    <recommend></recommend>
  </div>
</template>

<script>
import { getBanner } from '../../network/banner'

import Recommend from './children/Recommend'





export default {
  name: 'Find',
  data () {
    return {
      tab: ['个性推荐', '专属定制', '歌单', '排行榜', '歌手', '最新音乐'],
      imgUrl: [],
    }
  },
  components: {
    Recommend
  },

  created () {
    getBanner().then(res => {
      this.imgUrl.push(...res.data.banners);
    })
  },
}
</script>

<style>
#Find {
  display: inline-block;
  height: calc(100vh - 72px - 80px);
  width: 85%;
  background-color: #2b2b2b;
  overflow-y: scroll;
  font-size: 16px;
}
/* 最上面的导航 */
.tab {
  height: 60px;
  width: 40%;
  display: flex;
  justify-content: space-around;
  line-height: 60px;
  font-size: 18px;
  color: #afafaf;
}
.tab-item {
  overflow: hidden;
}

/* 轮播图 */
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


