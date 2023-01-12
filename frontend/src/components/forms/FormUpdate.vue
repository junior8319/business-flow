<template>
  <form
    v-if="isEditing"
    class="form-container"
  >
    <article
      v-for="field in fields"
      class="edit-item"
    >
      <div
        class="edit-label-item"
      >
        <label :for="field.fieldName">{{ field.fieldLabel }}</label>
      </div>

      <div
        class="edit-input-item"
      >
        <input
          v-if="field.type === 'text'"
          type="text"
          :name="field.fieldName"
          :id="field.fieldName"
          :value="onUpdating[field.fieldName]"
          @change="setObjectToSend($event)"
        >
      </div>

      <div
        class="edit-input-item"
      >
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
    
    <article
      class="edit-actions"
    >
      <button
        @click="requestUpdate($event, idOnFocus, this.objectToSend)"
        class="btn-send"
      >
        Enviar
      </button>

      <button
        @click="this.$emit('turnNotUpdating', $event)"
        class="btn-cancel"
      >
        Cancelar
      </button>
    </article>
  </form>
</template>

<script>
import { requestPut } from '@/api/requests';

  export default {
    name: 'FormUpdate',
    data() {
      return {
        objectToSend: null,
        editError: null,
        teste: '',
      }
    },

    methods: {
      startUpdating() {
        this.isEditing = true
      },

      stopUpdating(event) {
        event.preventDefault();
        this.objectToSend = null;
        this.isEditing = false
      },

      setObjectToSend(event) {
        const { name, value } = event.target;

        this.objectToSend = {
          ...this.objectToSend,
          [name]: value,
        };
      },

      async requestUpdate (event, id, object) {
        event.preventDefault();
        try {
          this.editError = null;
          
          const response = await requestPut(`${this.endpoint}/${id}`, object);

          if (response && response.status === 200) {
            this.$emit('turnNotUpdating');
            return response;
          }
        } catch (error) {
          console.log(error);
          this.editError = {
            status: error.response.status,
            message: error.response.data.message,
          };
        }
      }
    },

    props: [
      'idOnFocus',
      'onUpdating',
      'fields',
      'isEditing',
      'endpoint'
    ],

    emits: ['turnNotUpdating', 'getter'],
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/editForm.module.scss';
</style>
