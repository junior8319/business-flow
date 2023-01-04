<template>
  <article class="error-container">
    <div class="error-message">
      <textarea>{{ error.message }}</textarea>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'ErrorComp',

    data() {
      return {
        errorObject: this.error,
      }
    },

    props: ['error'],
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/error.module.scss';
</style>