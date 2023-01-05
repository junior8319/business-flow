<template>
  <title>{{ title }}</title>
  <main class="view-container">
    <section class="header-system"></section>
    <section class="page-body">
      <ViewHeader
        :header-label="headerLabel"
        :header-title="headerTitle"
      />

      <FormRegister
        :fields="cnpjsFieldsLabels"
        :new-register-label="newRegisterLabel"
        @clear-register-error="clearRegisterError"
        @register="registerCnpj"
      />

      <article class="content-table">
        <div class="content-head">
          <div class="content-head-item" id="head-id"><h3>ID:</h3></div>
          <div class="content-head-item"><h3>CNPJ</h3></div>
          <div class="content-head-item"><h3>Tipo</h3></div>
          <div class="content-head-item"><h3>Criada</h3></div>
          <div class="content-head-item"><h3>Atualizada</h3></div>
          <div class="content-head-item"><h3>Ações</h3></div>
        </div>
        <div
          v-for="cnpj in listOfCnpjs"
          :key="cnpj.id"
          class="content-body"
        >
          <div
            class="content-body-item"
            id="body-id"
          >
            <h3>{{ cnpj.id }}</h3>
          </div>
          
          <div
            v-if="!isEditing || idOnFocus !== cnpj.id"
            class="content-body-item"
          >
            <h3>{{ cnpj.cnpj }}</h3>
          </div>

          <div
            v-if="idOnFocus === cnpj.id && !isAsking"
            class="content-body-item update-container"
          >
            <input
              class="update-input"
              type="text"
              name="cnpj"
              :value="onUpdating.cnpj"
              @change="setCnpjToUpdate($event)"
              id="cnpj-input"
              ref="cnpj-input"
            >
          </div>

          <div
            v-if="!isEditing || idOnFocus !== cnpj.id"
            class="content-body-item"
          >
            <h3>{{ cnpj.companyType }}</h3>
          </div>

          <div
            v-if="idOnFocus === cnpj.id && !isAsking"
            class="content-body-item update-container"
          >
            <input
              class="update-input"
              type="text"
              name="companyType"
              :value="onUpdating.companyType"
              @change="setCnpjToUpdate($event)"
            >
          </div>
          
          <div class="content-body-item"><h3>{{ cnpj.createdAt }}</h3></div>
          <div class="content-body-item"><h3>{{ cnpj.updatedAt }}</h3></div>

          <div
            v-if="idOnFocus === cnpj.id"
          >
            <button
              class=" message-btn btn-confirm"
              v-if="!isAsking"
              @click="updateCnpj(onUpdating)"
            >
              Confirmar
            </button>
          </div>

          <div
            v-if="idOnFocus === cnpj.id"
          >
            <button
              class="message-btn btn-cancel"
              v-if="!isAsking"
              @click="setNotUpdating"
            >
              Cancelar
            </button>
          </div>

          <div
            v-if="idOnFocus !== cnpj.id"
            class="content-body-item actions-container"
          >
            <div
              v-if="!isAsking"
              class="action-update"
            >
              <button
                @click="setUpdating(cnpj)"
              >
                Alterar
              </button>
            </div>
            
            <div
              class="action-delete"
              v-if="!isAsking"
            >
              <button
                @click="toggleIsAsking(cnpj.id)"
              >
                Excluir
              </button>
            </div>
          </div>
          
          <div
            class="message-container"
            v-if="isAsking && cnpj.id === idOnFocus"
          >
            <h3>Tem certeza que deseja excluir este CNPJ {{ cnpj.cnpj }}?</h3>
            <button
              class="message-btn btn-confirm"
              @click="deleteCnpj(cnpj.id)"
            >
              Sim
            </button>
            <button
              class="message-btn btn-cancel"
              @click="toggleNotAsking"
            >
              Cancelar
            </button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
  import { requestGet, requestDelete, requestPut, requestPost } from '../api/requests'
import ViewHeader from '@/components/headers/ViewHeader.vue';
import FormRegister from '@/components/forms/FormRegister.vue';

  export default {
    name: "CnpjsView",
    data() {
      return {
        title: 'Cnpjs - B-Flow',
        headerTitle: 'CNPJ\'s',
        headerLabel: 'Gerencie os CNPJ\'s cadastrados',
        newRegisterLabel: 'Novo CNPJ',
        listOfCnpjs: [],
        listOfKeys: [],
        cnpjsLabels: [
          'ID:',
          'CNPJ',
          'Tipo',
          'Cadastrada em:',
          'Última atualização:',
          'Ações',
        ],
        cnpjsFieldsLabels: [
          { fieldName: 'cnpj', fieldLabel: 'CNPJ:', type: 'text' },
          { fieldName: 'companyType', fieldLabel: 'Tipo de Empresa:', type: 'text' },
        ],
        registerError: null,
        editError: null,
        isAsking: false,
        idOnFocus: null,
        onUpdating: {
            cnpj: null,
            companyType: null,
        },
        isEditing: false,
        isCompanyInDisplay: false,
        companyOnDisplay: null,
        cnpjIdcompanyDisplay: null,
        error: null,
        isEditing: false,
      };
    },

    methods: {
      toggleNotAsking() {
        this.idOnFocus = null;
        this.isAsking = false;
      },
      toggleIsAsking(id) {
        this.isAsking = true;
        this.setIdOnFocus(id);
      },
      setUpdating(data) {
        this.idOnFocus = data.id;
        this.onUpdating = data;
        this.isEditing = true;
      },
      setCnpjToUpdate(event) {
        this.onUpdating[event.target.name] = event.target.value;
      },
      setNotUpdating() {
        this.idOnFocus = null;
        this.onUpdating = {
            cnpj: null,
            companyType: null,
        };
        this.isEditing = false;
        this.getCnpjs();
      },
      setIdOnFocus(id) {
        this.idOnFocus = id;
      },
      clearRegisterError() {
        this.registerError = null;
      },
      async getCnpjs() {
        const response = await requestGet("/cnpjs");
        this.listOfCnpjs = response.map(cnpj => {
          return {
              ...cnpj,
              createdAt: new Date(cnpj.createdAt).toLocaleDateString("pt-BR"),
              updatedAt: new Date(cnpj.updatedAt).toLocaleDateString("pt-BR")
          };
        });
      },

      async registerCnpj(event, data) {
        event.preventDefault();
        console.log(data);
        try {
          this.setNotUpdating();
          const response = await requestPost('/cnpjs', data);

        if (response && response.status === 201) {
          this.registerError = null;
          return response;
        }
        this.getCnpjs();
        } catch (error) {
          console.log(error);
          this.registerError = {
            status: error.response.status,
            message: error.response.data.message,
          };
        }
      },

      async updateCnpj(data) {
        try {
          let objectToUpdate = {
              cnpj: (data.cnpj) ? data.cnpj : null,
              companyType: (data.companyType) ? data.companyType : null,
          };
          JSON.stringify(objectToUpdate);
          const response = await requestPut(`/cnpjs/${data.id}`, objectToUpdate);
          this.setNotUpdating();
          this.getCnpjs();
        }
        catch (error) {
          console.log(error.response.data.message);
          this.error = error.response.data.message;
        }
      },

      async deleteCnpj(id) {
        await requestDelete(`/cnpjs/${id}`);
        this.toggleNotAsking();
        this.getCnpjs();
      },
    },

    components: { ViewHeader, FormRegister },

    mounted() {
      this.getCnpjs();
    },
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/views.module.scss'
</style>