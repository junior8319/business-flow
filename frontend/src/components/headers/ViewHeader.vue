<template>
  <article class="article-header">
        <div class="article-header-topic">
          <img :src="handsImage" alt="Uma figura de mãos se apertando.">
          <h1>{{ headerTitle }}</h1>
        </div>
        <div class="article-header-text">
          <h3>{{ headerLabel }}</h3>
        </div>
      </article>
</template>

<script>
  export default {
    name: 'ViewHeaderComp',
    props: {
      headerTitle: String,
      headerLabel: String,
    },
    data() {
      return {
        handsImage: "/images/hands-shake.svg",
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/views.module.scss'
</style>