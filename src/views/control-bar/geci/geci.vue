<template>
  <div id="geci">
    <div class="img">
      <img :src="CurrentSong.al.picUrl+'?param=200y200'">
    </div>
    <div class="tabname">{{CurrentSong.name}}</div>
    <div class="songer">{{CurrentSong.ar[0].name}}</div>
    <div class="geci"
         ref="geci">
      <div ref="song">
        <div v-for="(i,k) in text"
             class="items"
             ref="lyric"
             :class="{now:currentTime/i[0]>=1 && currentTime/text[k+1][0]<1}">
          {{i[1]}}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { Behavior } from 'better-scroll'
import { geci } from '../../../network/geci'
export default {
  name: 'geci',
  data () {
    return {
      geci: '',
      geciArr: [],
      text: [],
      index: 0
    }
  },
  watch: {
    '$store.state.CurrentSong': function (newVal) {
      this.geci = ''
      this.geciArr = []
      this.text = []
      geci(newVal.id).then(res => {
        this.geci = res.data.lrc.lyric
        this.geciArr = this.geci.split('\n')
      })

      setTimeout(() => {
        for (let i of this.geciArr) {
          this.text.push(i.split(']'))
        }
        for (let i = 0; i < this.text.length; i++) {
          if (this.text[i][1] === '') {
            this.text.splice(i, 1)
          }
        }
        for (let i of this.text) {
          i[0] = i[0].substr(1).split(':')
          i[0] = parseFloat(i[0][0] * 60) + parseFloat(i[0][1])
        }

      }, 300);

    },
    '$store.state.currentTime': function (newVal) {
      // console.log(newVal);
      for (let i = 0; i < this.text.length; i++) {

        if (newVal / this.text[i][0] >= 1 && newVal / this.text[i + 1][0] < 1) {

          this.index = i
        }
      }
    },
    index (newVal) {
      this.$refs.geci.scrollTo({
        top: 30 * newVal,
        behavior: 'smooth'
      })
    }
  },
  computed: {
    currentTime () {
      return this.$store.state.currentTime
    },
    CurrentSong () {
      return this.$store.state.CurrentSong
    },

  },
  created () {

    let currentSong = this.$store.state.CurrentSong.id
    geci(currentSong).then(res => {
      this.geci = res.data.lrc.lyric
      this.geciArr = this.geci.split('\n')
    })

    setTimeout(() => {
      for (let i of this.geciArr) {
        this.text.push(i.split(']'))
      }
      for (let i = 0; i < this.text.length; i++) {
        if (this.text[i][1] === '') {
          this.text.splice(i, 1)
        }
      }
      for (let i of this.text) {
        i[0] = i[0].substr(1).split(':')
        i[0] = parseFloat(i[0][0] * 60) + parseFloat(i[0][1])
      }

    }, 300);

  },
  methods: {

  }



}
</script>

<style scoped>
#geci {
  display: inline-block;
  height: calc(100vh - 72px - 80px);
  background-color: #2b2b2b;
  overflow-y: scroll;
  font-size: 16px;
  width: 85%;
  position: relative;
}
.now {
  color: #ffffff;
  font-weight: bolder;
  font-size: 20px;
}
.geci {
  width: 400px;
  margin: 40px auto;
  background-color: #2b2b2b;
  color: #6a6a6a;
  overflow-y: scroll;
  height: 400px;
  text-align: center;
  font-size: 17px;
}
.items {
  margin-top: 10px;
}
.tabname {
  width: 100%;
  text-align: center;
  color: #d0d0d0;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.songer {
  width: 100%;
  text-align: center;
  color: #6a6a6a;
}
.img {
  width: 250px;
  height: 250px;
  top: 180px;
  left: 100px;
  position: absolute;
}
.img img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
</style>
