<template>
  <nav class="sidebar-container">
    <article class="sidebar-logo">
      <img :src="logo" alt="Logo cashforce.">
    </article>
    <article class="sidebar-item">
      <img :src="sideBarItemImg" alt="Mãos em comprimento (aperto de mãos).">
      <router-link to="/home">Home</router-link>
    </article>
    
    <article class="sidebar-item">
      <img :src="sideBarItemImg" alt="Mãos em comprimento (aperto de mãos).">
      <RouterLink to="/cnpjs">CNPJ's</RouterLink>
    </article>
  </nav>
  <router-view />
</template>

<script>
  export default {
    name: "SideBar",
    data() {
      return {
        logo: '/images/cashforce-logo.svg',
        sideBarItemImg: '/images/sidebar-item.svg',
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './sidebar.module.scss'
</style>
