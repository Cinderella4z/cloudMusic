<template>
  <div id="Song-items"
       @click="clickList">
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
  methods: {
    clickList () {
      this.$emit('clickList')
    }
  }
}
</script>

<style scoped>
#Song-items {
  width: 220px;
  height: 230px;

  margin-top: 10px;
  color: #d0d0d0;
  display: inline-block;
  margin-right: 27px;
}

.img img {
  width: 100%;
  height: 100%;
  border-radius: 30px;
}
.text {
  height: 20px;
  width: 220px;
  overflow: hidden;
  padding-top: 8px;
}
</style>
