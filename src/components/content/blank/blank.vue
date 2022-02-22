<template>
  <div id="blank">

    <div class="alter">
      <slot name="text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'blank',
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style>
#blank {
  /* display: inline-block; */
  height: calc(100vh - 72px - 80px);
  background-color: #2b2b2b;
  overflow-y: scroll;
  font-size: 30px;
  text-align: center;
  font-weight: bolder;
  width: 100%;
}
.alter {
  /* display: inline-block; */
  width: 90%;
  color: #cad0d0;
  margin-top: 200px;
  height: 100px;
  /* background-color: aliceblue; */
}
</style>
