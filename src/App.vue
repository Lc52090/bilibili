<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive" />
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus">
body {
  height: 100%;
  background-color: #f4f4f4;
  box-sizing: border-box;
}
</style>
