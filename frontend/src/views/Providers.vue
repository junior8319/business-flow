<template>
  <title>{{ title }}</title>

  <main class="view-container">
    <section class="header-system"></section>

    <section class="page-body">
      <ViewHeader
        :header-label="headerLabel"
        :header-title="headerTitle"
      />
    </section>
  </main>
</template>

<script>
import ViewHeader from '@/components/headers/ViewHeader.vue';

  export default {
    name: "ProvidersView",
    
    data() {
        return {
          title: 'Cedentes - B-Flow',
          headerTitle: 'Cedentes',
          headerLabel: 'Gerencie suas Cedentes',
        };
    },

    components: { ViewHeader }
}
</script>

<style lang="scss">
  @import '../assets/styles/views.module.scss';
</style>
