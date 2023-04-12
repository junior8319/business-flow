<template>
  <nav class="sidebar-container">
    <article class="sidebar-logo">
      <img :src="logo" alt="Logo cashforce.">
    </article>
    <RouterLink to="/home">
      <article class="sidebar-item">
        <img :src="sideBarItemImg" alt="Mãos em comprimento (aperto de mãos).">
        <h3>Home</h3>
      </article>
    </RouterLink>

    <RouterLink to="/orders">
      <article class="sidebar-item">
        <img :src="sideBarItemImg" alt="Mãos em comprimento (aperto de mãos).">
        <h3>Notas Fiscais</h3>
      </article>
    </RouterLink>

    <RouterLink to="/cnpjs">
      <article class="sidebar-item">
        <img :src="sideBarItemImg" alt="Mãos em comprimento (aperto de mãos).">
        <h3>CNPJ's</h3>
      </article>
    </RouterLink>

    <RouterLink to="/providers">
      <article class="sidebar-item">
        <img :src="sideBarItemImg" alt="Mãos em comprimento (aperto de mãos).">
        <h3>Cedentes</h3>
      </article>
    </RouterLink>
    
    <RouterLink to="/buyers">
      <article class="sidebar-item">
        <img :src="sideBarItemImg" alt="Mãos em comprimento (aperto de mãos).">
        <h3>Sacadas</h3>
      </article>
    </RouterLink>
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
  @import '../../assets/styles/sidebar.module.scss'
</style>
