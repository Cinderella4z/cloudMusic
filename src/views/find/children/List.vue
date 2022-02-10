<template>
  <div id="List">

    <song-list>
      <div slot="tabname">
        <span v-for="(i,k) in tabs"
              class="tabs"
              :class="{backcolor:k===index}">{{i}}</span>
      </div>
      <!-- 
      <div class="zz">
        <div class="z"
             v-for="(i,k) in Recommend"
             @click="showList(i,k)">
          <SongItem>

            <div slot="img">
              <img :src="i.picUrl">
            </div>

            <div slot="text">
              {{i.name}}
            </div>

          </SongItem>
        </div>
      </div> -->
    </song-list>

  </div>
</template>

<script>
import SongList from '../../../components/content/find/SongList'
import SongItem from '../../../components/content/find/Song-items'


export default {
  name: 'List',
  data () {
    return {
      tabs: ['华语', '流行', '摇滚', '民谣', '电子', '轻音乐', '影视原声'],
      index: 0
    }
  },
  components: {
    SongList,
    SongItem
  }
}
</script>

<style scoped>
.tabs {
  color: #878787;
  font-size: 14px;
  font-weight: normal;
  margin-right: 10px;
}
.backcolor {
  color: #ec4141;
}
</style>
