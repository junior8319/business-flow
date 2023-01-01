<template>
  <div class="content-head">
    <div
      v-for="label in ordersLabels"
      class="content-head-item"
    >
      <h4>{{ label }}</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContentHeadComp',

    props: {
      ordersLabels: Array,
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/views.module.scss';

  .content-head-item:first-of-type {
    width: 7.5%;
  }

  .content-head-item {
    width: 14%;

    h4 {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }

  .content-head {
    width: 100%;
  }
</style>