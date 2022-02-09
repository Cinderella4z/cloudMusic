<template>
  <div id="Song-items">
    <div class="img">
      <slot name="img"></slot>
    </div>

    <div class="text">
      <slot name="text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Song-items',
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
#Song-items {
  width: 220px;
  height: 250px;
  margin-top: 10px;
  color: #d0d0d0;
}
.img {
  width: 220px;
  height: 220px;
}
.img img {
  width: 100%;
  height: 100%;
}
.text {
  height: 20px;
  width: 220px;
  overflow: hidden;
  padding-top: 2px;
}
</style>
