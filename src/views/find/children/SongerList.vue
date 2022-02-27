<template>
  <div id="SongerList">

    <div class="language">
      语种: <span v-for="(i,k) in language"
            class="find-span"
            @click="click1(i,k)"
            :class="{focus:index1===k}">{{i}}</span>
    </div>

    <div class="language">
      分类: <span v-for="(i,k) in sort"
            class="find-span"
            @click="click2(i,k)"
            :class="{focus:index2===k}">{{i}}</span>
    </div>

    <song-list>

      <SongItems v-for="i in songerList"
                 :key="i.id"
                 @clickList="showlist(i)">

        <div slot="img">
          <img :src="getPicUrl(i)">
        </div>

        <div slot="text">
          {{i.name}}
        </div>

      </SongItems>

    </song-list>

  </div>

</template>

<script>
import { artist } from '../../../network/Songer'
import { showList } from '../../../assets/js/find/showList'
import { songer } from '../../../network/Songer'
import { create } from '../../../../../cloud-music/src/network/login'

import SongList from '../../../components/content/find/SongList'
import SongItems from '../../../components/content/find/Song-items'


export default {
  name: 'SongerList',
  data () {
    return {
      language: ['全部', '华语', '欧美', '日本', '韩国', '其他'],
      sort: ['全部', '男歌手', '女歌手', '乐队组合'],
      index1: 0,
      area: -1,
      index2: 0,
      type: -1,
      list: [],
      offset: 15,
      add: 10,
      sum: 0
    }
  },

  components: {
    SongItems, SongList,
  },
  computed: {
    songerList () {
      return this.$store.state.find.songerList
    }
  },

  methods: {

    getPicUrl (i) {
      return i.picUrl + "?param=150y150"
    },

    click1 (i, k) {
      this.index1 = k
      this.$emit('click');
      switch (i) {
        case '全部':

          this.$store.commit('setsongerArea', -1)
          break;
        case '华语':

          this.$store.commit('setsongerArea', 7)

          break;
        case '欧美':

          this.$store.commit('setsongerArea', 96)

          break;
        case '日本':

          this.$store.commit('setsongerArea', 8)

          break;
        case '韩国':

          this.$store.commit('setsongerArea', 16)

          break;
        case '其他':

          this.$store.commit('setsongerArea', 0)

          break;

        default:
          break;
      }
      let area = this.$store.state.find.songerArea
      let type = this.$store.state.find.songerType
      artist(type, area, this.offset).then(res => {
        this.$store.commit('setsongerList', res.data.artists)
      })

    },
    click2 (i, k) {
      this.$emit('click');
      this.index2 = k
      if (k === 0) {
        this.$store.commit('setsongerType', -1)
      }
      else {
        this.$store.commit('setsongerType', k)
      }
      let area = this.$store.state.find.songerArea
      let type = this.$store.state.find.songerType
      artist(type, area, this.offset).then(res => {
        this.$store.commit('setsongerList', res.data.artists)

      })

    },

    showlist (i) {
      // console.log(i);
      songer(i.id).then(res => {
        this.$store.commit('setsonger', res.data.songs)
      })

      setTimeout(() => {
        this.$router.push({
          path: '/songer',
          query: {
            currentSonger: JSON.stringify(i)
          }
        })
      }, 300);


    },


  },
  created () {
    let area = this.$store.state.find.songerArea
    let type = this.$store.state.find.songerType
    artist(type, area, this.offset).then(res => {
      this.$store.commit('setsongerList', res.data.artists)
    })
  }
}
</script>

<style scoped>
#SongerList {
  display: inline-block;
  width: 100%;
}
.language {
  /* background-color: aliceblue; */
  color: #d0d0d0;
  margin-left: 30px;
  margin-top: 10px;
}
.find-span {
  display: inline-block;
  width: 70px;
  margin-right: 10px;
  border-radius: 30px;
  color: #878787;
  font-size: 14px;
  text-align: center;
}
.focus {
  background-color: #332b2b;
  color: #e1342e;
}
.loadmore {
  color: #878787;
  text-align: center;
  width: 90%;
  height: 40px;
  line-height: 40px;
}
</style>
