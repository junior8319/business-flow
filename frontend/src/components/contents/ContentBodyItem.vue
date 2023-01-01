<template>
  <div
    class="content-body-item"
  >
    <h3>{{ value }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'ContentBodyItem',
    props: {
      value: [String, Number,  Date],
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/views.module.scss';

  .content-body-item {
    width: 14%;

    h3 {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
</style>