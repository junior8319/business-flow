<template>
  <title>{{ title }}</title>
  <div class="home-container">
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      title: " Home - B-Flow"
    }
  },
  components: {
  
},
}
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/home.module.scss'
</style>
