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
      v-if="!isRegisteringCnpj && availableCnpjs"
      class="register-item-cnpj"
    >
      <div class="register-item-label">
        <label for="inputCnpj">CNPJ:</label>
      </div>

      <div class="register-item-input">
        <input
          list="availableCnpjs"
          name="inputCnpj"
          id="inputCnpj"
          type="text"
        >

        <datalist
          name="availableCnpjs"
          id="availableCnpjs"
        >
          <option
            v-for="cnpj in availableCnpjs"
            :value="cnpj.id"
          >
            {{ cnpj.cnpj }}
          </option>
        </datalist>
      </div>

      <div
        v-if="!isRegisteringCnpj"
        class="form-register-buttons"
      >
        <button
          class="btn-send"
          @click="startRegisterCnpj"
        >
          Novo CNPJ
        </button>
      </div>
    </article>

    <article
     v-if="isRegisteringCnpj"
     class="register-items-cnpj"
    >
      <article
        class="register-item"
        v-for="field in cnpjFields"
      >
        <div
          class="register-item-label"
        >
          <label :for="field.fieldName">{{ field.fieldLabel }}</label>
        </div>

        <div>
          <input
            :type="field.type"
            :id="field.fieldName"
            :name="field.fieldName"
            class="register-item-input"
            @change="setCnpjObjectToSend($event)"
          />
        </div>
      </article>

      <div class="form-register-buttons">
        <button
          class="btn-send"
          @click="registerCnpj($event, cnpjObjectToSend)"
        >
          Salvar
        </button>

        <button
          class="btn-cancel"
          @click="stopRegisterCnpj"
        >
          Cancelar
        </button>
      </div>
    </article>
    
    <article
      v-for="field in inputFields"
      class="register-items"
    >

      <article class="register-item">
        <div class="register-item-label">
          <label :for="field.fieldName">{{ field.fieldLabel }}</label>
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
import { requestPost, requestGet } from '@/api/requests';

  export default {
    name: 'FormRegister',
    data() {
      return {
        isRegistering: false,
        isRegisteringCnpj: false,
        objectToSend: null,
        cnpjObjectToSend: null,
        registerError: null,
        inputFields: this.fields,
        cnpjFields: this.cnpjsFieldsLabels,
        buyerStatusList: this.buyerStatuses,
        providerStatusList: this.providerStatuses,
        availableCnpjs: this.listOfCnpjs,
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

      async getAvailableCnpjs() {
        const response = await requestGet("/cnpjs");
        if (!response || !response.length || response.length === 0) {
          return null
        };
        this.availableCnpjs = await response
        .map(cnpj => {
          return {
            ...cnpj,
            createdAt: new Date(cnpj.createdAt).toLocaleDateString("pt-BR"),
            updatedAt: new Date(cnpj.updatedAt).toLocaleDateString("pt-BR"),    
          };
        })
        .filter(cnpj => {
          if (!cnpj.provider) return cnpj;
        });
      },

      async registerCnpj(event, data) {
        event.preventDefault();
        try {
          this.registerError = null;
          const response = await requestPost('/cnpjs', data);

          if (response) {
            this.stopRegisterCnpj();
            this.getAvailableCnpjs();
            return response;
          }
          return;
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
        this.cnpjObjectToSend = null;
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

      setCnpjObjectToSend(event) {
        const { name, value } = event.target;
        this.cnpjObjectToSend = {
          ...this.cnpjObjectToSend,
          [name]: value,
        };
      },

      startRegisterCnpj(event) {
        event.preventDefault();
        this.isRegisteringCnpj = true;
      },

      stopRegisterCnpj() {
        this.$emit('clearRegisterError');
        this.isRegisteringCnpj = false;
        this.cnpjObjectToSend = null;
        this.clearState();
      }
    },

    props: [
      'listOfCnpjs',
      'fields',
      'cnpjsFieldsLabels',
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
      this.getAvailableCnpjs();
    }
  }
</script>

<style lang="scss">
  @import '@/assets/styles/registerForm.module.scss';
</style>
