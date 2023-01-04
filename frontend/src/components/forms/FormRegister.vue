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
        @click="this.$emit('register', $event, objectToSend)"
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
  export default {
    name: 'FormRegister',
    data() {
      return {
        isRegistering: false,
        objectToSend: null,
        error: null,
        inputFields: this.fields,
        buyerStatusList: this.buyerStatuses,
        providerStatusList: this.providerStatuses,
      }
    },

    methods: {
      startRegister() {
        this.isRegistering = true;
      },

      clearState() {
        this.objectToSend = null;
      },

      stopRegistering(event) {
        event.preventDefault();
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

    props: ['fields', 'buyerStatuses', 'providerStatuses', 'newRegisterLabel'],
    emits: ['getter', 'register', 'clearRegisterError'],

    mounted() {
    }
  }
</script>

<style lang="scss" scopde>
  @import '@/assets/styles/registerForm.module.scss';
  @import '@/assets/styles/formRegister.module.scss';
</style>
