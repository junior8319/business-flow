<template>
  <form class="form-container">
    <article class="form-title">
      <h2>Cadastrar nova</h2>
    </article>

    <article
      v-for="field in inputFields"
    >
      <article class="register-input-item">
        <label for="register-input-cnpj">{{ field.fieldLabel }}</label>
        <input
          v-if="field.type === 'text'"
          type="text"
          :name="field.fieldName"
          :id="field.fieldName"
          @change="setObjectToSend($event)"
        >
        
        <select
          v-if="field.type === 'select'"
          :name="field.fieldName"
          :id="field.fieldName"
          @change="setObjectToSend($event)"
        >
          <option
            v-if="field.fieldName === 'orderStatusBuyer'"
            v-for="status in statusList"
            :value="status.code"
          >
            {{ status.status }}
          </option>
        </select>
      </article>
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
    name: 'FormRegister',
    data() {
      return {
        objectToSend: null,
        error: null,
        inputFields: this.fields,
        statusList: this.statuses,
      }
    },

    methods: {
      clearState() {
        this.registering = {}
      },

      setObjectToSend(event) {
        const { name, value } = event.target;
        this.objectToSend = {
          ...this.objectToSend,
          [name]: value,
        };
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

    props: ['fields', 'statuses'],
    emits: ['getter', 'register'],

    mounted() {
    }
  }
</script>

<style lang="scss" scopde>
  @import '../../assets/styles/registerForm.module.scss';
</style>
