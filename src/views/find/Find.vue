<template>
  <div id="Find">

    <div class="tab"
         ref="tab">
      <span v-for="(i,k) in tab "
            class="tab-item"
            @click="tabData(i,k)"
            :class="{onclick:currentindex===k}">
        {{i}}
      </span>
    </div>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>  
export default {
  name: 'Find',
  data () {
    return {
      tab: ['个性推荐', '歌单', '排行榜', '歌手'],
      currenttab: ['/recommend', '/list', '/rank', '/songerlist'],
      imgUrl: [],
    }
  },
  methods: {
    tabData (i, k) {

      switch (k) {
        case 0:

          this.$router.push('/recommend')
          break;
        case 1:
          this.$router.push('/list')
          break;
        case 2:
          this.$router.push('/rank')
          break;
        case 3:
          this.$router.push('/songerlist')
          break;

        default:
          break;
      }
    },


  },

  computed: {
    currentindex () {
      return this.currenttab.indexOf(this.$route.path)
    }
  }

}
</script>

<style>
.onclick {
  font-size: 25px;
  font-weight: bolder;
  border-bottom: 4px solid #ec4141;
}

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
  margin-left: 7px;
  height: 60px;
  width: 40%;
  display: flex;
  justify-content: space-around;
  line-height: 60px;
  font-size: 18px;
  z-index: 9;

  /* background-color: var(--blackBackGround); */
  color: #afafaf;
  /* position: fixed; */
}
.tab-item {
  overflow: hidden;
}
</style>


