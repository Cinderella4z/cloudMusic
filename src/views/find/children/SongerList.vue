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

      <SongItems v-for="i in list"
                 @clickList="showlist(i)">

        <div slot="img">
          <img :src="i.picUrl">
        </div>

        <div slot="text">
          {{i.name}}
        </div>

      </SongItems>

    </song-list>

    <div class="loadmore"
         @click="loadmore">加载更多</div>
  </div>

</template>

<script>
import { artist } from '../../../network/Songer'
import { showList } from '../../../assets/js/find/showList'
import { songer } from '../../../network/Songer'
import SongList from '../../../components/content/find/SongList'
import SongItems from '../../../components/content/find/Song-items'
import { create } from '../../../../../cloud-music/src/network/login'


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
      offset: 20,
      add: 10,
      sum: 0
    }
  },
  components: {
    SongItems, SongList
  },
  methods: {
    click1 (i, k) {
      this.index1 = k

      switch (i) {
        case '全部':
          this.area = -1
          break;
        case '华语':
          this.area = 7
          break;
        case '欧美':
          this.area = 96
          break;
        case '日本':
          this.area = 8
          break;
        case '韩国':
          this.area = 16
        case '其他':
          this.area = 0
          break;

        default:
          break;
      }

      artist(this.type, this.area, this.offset).then(res => {
        this.list = res.data.artists
      })

    },
    click2 (i, k) {
      this.index2 = k
      if (k === 0) {
        this.type = -1
      }
      else {
        this.type = k
      }
      artist(this.type, this.area, this.offset).then(res => {
        this.list = res.data.artists
      })

    },

    showlist (i) {

      songer(i.id).then(res => {
        this.$store.commit('setsonger', res.data.songs)
      })

      setTimeout(() => {
        this.$router.push('/songer')
      }, 300);


    },

    loadmore () {
      this.sum += this.add;
      artist(this.type, this.area, this.offset + this.sum).then(res => {
        this.list.push(...res.data.artists.splice(this.offset + this.sum - this.add, this.offset + this.sum))
      })
    }
  },
  created () {
    artist(this.type, this.area, this.offset).then(res => {
      this.list = res.data.artists
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
