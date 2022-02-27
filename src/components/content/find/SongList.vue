<template>
  <div id="SongList">

    <div class="tabname1">
      <slot name="tabname"></slot>
    </div>

    <div class="items">

      <slot></slot>

    </div>

  </div>
</template>

<script>
import songitems from '../find/Song-items'
export default {
  name: 'SongList',
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style>
#SongList {
  width: 95%;
  width: 100%;
  margin: 0 auto;
}
.tabname1 {
  height: 40px;
  /* width: 100%; */
  font-size: 20px;
  color: #d0d0d0;
  font-weight: bolder;
  margin-left: 20px;
}
.items {
  margin-left: 20px;
}
</style>
