<template>
  <title>{{ title }}</title>
  <main class="app-container">
    <SideBar />
  </main>
</template>

<script>
import SideBar from './components/sidebar/SideBar.vue';

export default {
  name: 'App',
  data() {
    return {
      title: "Business Flow app"
    }
  },
  components: {
    SideBar
},
}
</script>

<style lang="scss" scoped>
  @import './app.module.scss'
</style>
