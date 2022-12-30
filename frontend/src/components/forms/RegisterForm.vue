<template>
  <form class="form-container">
    <article class="form-title">
      <h2>Cadastrar novo</h2>
    </article>
    <article class="register-input-item">
      <label for="register-input-cnpj">CNPJ: </label>
      <input
        type="text"
        name="cnpj"
        id="register-input-cnpj"
        v-model="cnpj"
      >
    </article>
    
    <article class="register-input-item">
      <label for="register-input-company-type">Tipo de Empresa: </label>
      <input
        type="number"
        name="companyType"
        id="register-input-company-type"
        v-model="companyType"
      >      
    </article>

    <article class="register-input-item register-btn-send">
      <button
        class="btn-send"
        @click="requestRegisterCnpj($event)"
      >
        Enviar
      </button>
    </article>
  </form>
</template>

<script>
  import { requestPost } from '../../api/requests'

  export default {
    name: 'RegisterForm',
    data() {
      return {
        cnpj: null,
        companyType: null,
        error: null,
      }
    },

    methods: {
      clearState() {
        this.cnpj = null;
        this.companyType = null;
      },

      async requestRegisterCnpj(event) {
        event.preventDefault();
        try {
          let newCnpj = {
            cnpj: this.cnpj,
            companyType: this.companyType,
          };

          JSON.stringify(newCnpj);

          const response = await requestPost('/cnpjs', newCnpj);

          if (response) this.clearState();
          this.$emit('getCnpjs');

        } catch (error) {
          console.log(error.response.data.message);
          this.error = error.response.data.message;
        }
      }
    },

    emits: ['getCnpjs'],

    mounted() {
    },
  }
</script>

<style lang="scss" scopde>
  @import '../../assets/styles/registerForm.module.scss';
</style>
