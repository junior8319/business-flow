<template>
  <article
    v-if="!isRegistering"
    class="add-new-order-button"
  >
    <button
      class="btn-new-order"
      @click="startRegister"
    >
      {{ newRegisterLabel }}
    </button>
  </article>
  <form
    v-if="isRegistering"
    class="register-container"
  >
    <article class="form-title">
      <h2>Cadastrar nova</h2>
    </article>

    <article
      v-for="field in inputFields"
      class="register-items"
    >
      <article class="register-item">
        <div class="register-item-label">
          <label for="register-input-cnpj">{{ field.fieldLabel }}</label>
        </div>

        <div class="register-item-input">
          <input
            v-if="field.type === 'text'"
            type="text"
            :name="field.fieldName"
            :id="field.fieldName"
            @change="setObjectToSend($event)"
          >
        </div>
        
        <div class="register-item-select">
          <select
            v-if="field.type === 'select'"
            :name="field.fieldName"
            :id="field.fieldName"
            @change="setObjectToSend($event)"
          >
            <option
              v-if="field.fieldName === 'orderStatusBuyer'"
              v-for="status in buyerStatusList"
              :value="status.code"
            >
              {{ status.status }}
            </option>

            <option
              v-if="field.fieldName === 'orderStatusProvider'"
              v-for="status in providerStatusList"
              :value="status.code"
            >
              {{ status.status }}
            </option>
          </select>
        </div>
      </article>
    </article>

    <article class="form-register-buttons">
      <button
        class="btn-send"
        @click="register($event, objectToSend)"
      >
        Enviar
      </button>

      <button
        class="btn-cancel"
        @click="stopRegistering($event)"
      >
        Cancelar
      </button>
    </article>
  </form>
</template>

<script>
import { requestPost } from '@/api/requests';

  export default {
    name: 'FormRegister',
    data() {
      return {
        isRegistering: false,
        objectToSend: null,
        registerError: null,
        inputFields: this.fields,
        buyerStatusList: this.buyerStatuses,
        providerStatusList: this.providerStatuses,
      }
    },

    methods: {
      async register(event, data) {
        event.preventDefault();
        try {
          this.registerError = null;
          const response = await requestPost(this.endpoint, data);
          
          if (response) {
            this.stopRegistering();
            this.$emit('getter');
            return response;
          }
        } catch (error) {
          console.log(error.response.data.message);
          this.registerError = {
            status: error.response.status,
            message: error.response.data.message,
          };
          this.$emit('setRegisterError', this.registerError);
        }
      },

      startRegister() {
        this.isRegistering = true;
      },

      clearState() {
        this.objectToSend = null;
      },

      stopRegistering() {
        this.$emit('clearRegisterError');
        this.isRegistering = false
        this.objectToSend = null;
        this.clearState();
      },

      setObjectToSend(event) {
        const { name, value } = event.target;
        this.objectToSend = {
          ...this.objectToSend,
          [name]: value,
        };
      },
    },

    props: [
      'fields',
      'buyerStatuses',
      'providerStatuses',
      'newRegisterLabel',
      'endpoint',
    ],
    emits: [
      'getter',
      'clearRegisterError',
      'setKeys',
      'setRegisterError',
    ],

    mounted() {
    }
  }
</script>

<style lang="scss">
  @import '@/assets/styles/registerForm.module.scss';
  @import '@/assets/styles/formRegister.module.scss';
</style>
