<template>
  <div id="Slid-Bar">
    <div class="slid">

      <div class="spans"
           @click="ClickfindMusic">发现音乐</div>
      <!-- <div v-for="(i,k) in span"
           @mousemove="mousemove(k)"
           class="spans"
           :class="{grey:currentKey===k}">
        {{i}}
      </div> -->

      <div class="span">我的音乐</div>

      <div class="spans"
           @click="ClickMyMusic"
           ref="s">❤ </i>我喜欢的音乐</div>

      <div class="spans"
           @click="ClickHistory"><i class="el-icon-headset"></i> 最近播放</div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Slid-Bar',
  data () {
    return {
      span: ['博客', '视频', '关注', '直播', '私人FM'],
      currentKey: ''
    }
  },
  components: {

  },
  methods: {
    mousemove (k) {
      this.currentKey = k;
    },

    ClickMyMusic () {
      this.$router.push('/mymusic')
    },
    ClickHistory () {

      this.$router.push('/history')
    },
    ClickfindMusic () {
      this.$router.push('/find')

    }
  }
}
</script>

<style>
#Slid-Bar {
  display: inline-block;
  height: calc(100vh - 72px - 80px);
  width: calc(15% - 2px);
  border-right: 2px solid #434343;
  background-color: #2b2b2b;
  overflow: hidden;
}
.spans {
  /* text-align: center; */
  padding-left: 20px;
  font-size: 16px;
  color: #cad0d0;
  height: 47px;
  line-height: 47px;
  overflow: hidden;
}
a {
  color: #cad0d0;
  text-decoration: none;
}
.span {
  font-size: 14px;
  padding-left: 20px;
  color: #777777;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  height: 30px;
  line-height: 30px;
}
.grey {
  background-color: #373737;
}
</style>
