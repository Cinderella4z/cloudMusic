<template>
  <div id="Main-Nav-Bar">
    <nav-bar>
      <!-- 1.logo -->
      <div slot="left">
        <img src="../../../assets/img/navbar/logo.png">
      </div>

      <!-- 2.搜索栏 -->
      <div slot="center">

        <span class="background"><i class="el-icon-arrow-left"
             @click="back"></i></span>
        <span class="background"> <i class="el-icon-arrow-right"
             @click="go"></i></span>

        <el-input placeholder="请输入内容"
                  @keypress.native="keydown"
                  prefix-icon="el-icon-search"
                  class="input"
                  v-model="input">
        </el-input>

      </div>

      <!-- 右侧功能栏 -->

      <div slot="right"
           class="right">

        <i class="el-icon-user"
           @click="login"></i>
        <i class="el-icon-setting"></i>
        <i class="el-icon-bell"></i>
        <i class="el-icon-minus"></i>
        <i class="el-icon-full-screen"></i>
        <i class="el-icon-close"></i>

      </div>

    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../common/navbar/Nav-Bar'
import { search } from '../../../network/search'
import { getSongDetail } from '../../../network/SongDetail'


export default {
  name: 'Main-Nav-Bar',
  data () {
    return {
      input: '',
      songs: [],
    }
  },
  components: {
    NavBar,
  },
  methods: {
    keydown (e) {
      // 搜索功能 如果是enter 就获取数值
      if (e.keyCode == 13) {
        search(this.input, 30).then(res => {
          let ids = []
          let obj = res.data.result.songs
          for (let item of obj) {
            ids.push(item.id)
          }

          if (this.$store.state.SearchSongs.length !== 0) {
            this.$store.commit('ClearSearchSongs')
          }

          for (let id of ids) {
            getSongDetail(id).then(res => {
              this.$store.commit('addSearchSongs', res.data.songs)
            })
          }

          this.$store.commit('getInput', this.input); //将input值传给state

          this.$router.push('/search');
        })
      }

    },


    // 前进 后退 功能
    back () {
      this.$router.back()
    },
    go () {
      this.$router.go(1)
    },


    login () {
      this.$store.state.private.ifclick = !this.$store.state.private.ifclick

    }

  }
}
</script>

<style>
#Main-Nav-Bar {
  background-color: var(--Control-tabbar);
  height: 70px;
  line-height: 70px;
  text-align: center;
  border-bottom: 2px solid red;
  position: relative;
  z-index: 9;
  font-size: 14px;
}
.input {
  width: 30%;
}
.el-input__inner {
  background-color: #2b2b2e;
  border: 0;
  color: #c0c4cc;
  border-radius: 30px;
}

.touxiang {
  position: relative;
  top: 15px;
  bottom: 15px;
  margin-right: 20px;
}
.right i {
  font-size: 20px;
  color: #a6a6a7;
  margin-right: 20px;
}
.background {
  background-color: #1e1e21;
  text-align: center;
  color: #545457;
  width: 30px;
  height: 20px;
  line-height: 20px;
  border-radius: 8px;
  display: inline-block;
  margin-right: 10px;
  overflow: hidden;
}
.left img {
  height: 70px;
}
</style>
