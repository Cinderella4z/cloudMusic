<template>
  <div id="backTop"
       @click="backTop">
    <!-- <img src="../../../assets/img/backTop/回到顶部.png"> -->
    👆

  </div>
</template>

<script>
export default {
  name: 'backTop',
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    backTop () {
      this.$emit('backTop')
    }
  }
}
</script>

<style scoped>
#backTop {
  width: 40px;
  height: 40px;
  font-size: 30px;
  position: absolute;
  bottom: 110px;
  right: 10px;
}
#backTop img {
  width: 100%;
  height: 100%;
  border-radius: 100px;
}
</style>
