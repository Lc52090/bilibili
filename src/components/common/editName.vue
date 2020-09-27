<template>
  <div @click="bannerClick">
    <div class="editname">
      <span>{{left}}</span>
      <span>
        <slot name="right"></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['left'],
  methods: {
    bannerClick() {
      this.$emit('bannerClick')
    }
  }
}
</script>

<style lang='stylus' scoped>
.editname {
  background-color: white;
  padding: 4.167vw;
  font-size: 3.889vw;
  color: #333;
  border-bottom: 0.278vw solid #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
