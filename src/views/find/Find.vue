<template>
  <div id="Find"
       @scroll="s"
       ref="find">

    <div class="tab"
         ref="tab">
      <span v-for="(i,k) in tab "
            class="tab-item"
            @click="tabData(i,k)"
            :class="{onclick:currentindex===k}">
        {{i}}
      </span>
    </div>

    <back-top v-if="isbackTop"
              @backTop="back"></back-top>
    <keep-alive>
      <router-view ref="item"
                   @click="click"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { artist } from '../../network/Songer'

import backTop from '../../components/content/backTop/backTop'



export default {
  name: 'Find',

  data () {
    return {
      tab: ['个性推荐', '歌单', '排行榜', '歌手'],
      currenttab: ['/recommend', '/list', '/rank', '/songerlist'],
      imgUrl: [],
      page: 2,
      offset: 15,
      tabHeight: 60,
      scrollTop: 0,
      isbackTop: 0
    }
  },
  components: {
    backTop
  },
  methods: {
    s (e) {
      this.isbackTop = e.target.scrollTop >= 500 ? 1 : 0
      let mainTop = this.$refs.item.$el.offsetHeight + this.tabHeight
      if (e.target.scrollTop + e.target.offsetHeight >= mainTop) {
        let index = this.$route.name;

        switch (index) {
          case 'songerList':
            let area = this.$store.state.find.songerArea
            let type = this.$store.state.find.songerType
            let songerList = this.$store.state.find.songerList
            let offset = this.page * this.offset

            artist(type, area, offset).then(res => {
              let artists = res.data.artists
              if (artists.length) {
                let needpush = res.data.artists.splice(songerList.length, this.offset)
                this.$store.commit('addsongerList', needpush)
                this.page++;
              }

            })
            break;

          default:
            break;
        }
      }

    },
    // 切换语种或分类时候 改变当前页数值
    click () {
      this.page = 2
    },

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

    // 回到顶部
    back () {
      this.$refs.find.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }


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


