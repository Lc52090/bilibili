<template>
  <div>
    <van-field
      :type="type"
      :label="label"
      :placeholder="placeholder"
      v-model="content"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    }
  },
  props: ['label', 'type', 'placeholder', 'rule'],
  methods: {
    handleRule() {
      const rue = new RegExp(this.rule)
      if (rue.test(this.content)) {
        this.$emit('inputChange', this.content)
      }
    }
  },
  watch: {
    content() {
      this.handleRule()
    }
  }
}
</script>

<style lang='stylus' scoped></style>
