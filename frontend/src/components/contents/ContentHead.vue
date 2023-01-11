<template>
  <div class="content-head">
    <div
      v-for="label in tableHeadLabels"
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
      tableHeadLabels: Array,
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/views.module.scss';

  .content-head-item:first-of-type {
    width: 5%;
  }

  .content-head-item {
    h4 {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }

  .content-head {
    width: 100%;
  }
</style>