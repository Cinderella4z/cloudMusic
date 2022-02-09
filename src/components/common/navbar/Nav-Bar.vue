<template>
  <div id="Nav-Bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav-Bar',
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style>
#Nav-Bar {
  display: flex;
  text-align: center;
  height: 70px;
}
.center {
  flex: 1;
  overflow: hidden;
}
.right {
  overflow: hidden;
  height: 70px;
}
.left {
  height: 70px;
}
.center {
  overflow: hidden;
  height: 70px;
}
.left {
  overflow: hidden;
  height: 70px;
}
</style>
