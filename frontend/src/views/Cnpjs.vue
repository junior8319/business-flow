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
        @set-register-error="setRegisterError"
        @clear-register-error="clearRegisterError"
        @getter="getCnpjs"
        endpoint="/cnpjs"
      />

      <ErrorComp
        v-if="registerError && !isEditing"
        :error="this.registerError"
      />

      <article class="content-table">
        <ContentHead :table-head-labels="this.cnpjsLabels"/>
        
        <div
          v-for="cnpj in listOfCnpjs"
          :key="cnpj.id"
          class="content-body"
        >
          <ContentBodyItem :value="cnpj.id" id="cnpj-id"/>
          <ContentBodyItem
            :value="cnpj.cnpj"
          />
          <ContentBodyItem
            :value="cnpj.companyType"
          />
          <ContentBodyItem :value="cnpj.createdAt" />
          <ContentBodyItem :value="cnpj.updatedAt" />
          
          <FormUpdate
            v-if="cnpj.id === idOnFocus"
            :id-on-focus="idOnFocus"
            :on-updating="onUpdating"
            :fields="cnpjsFieldsLabels"
            :is-editing="isEditing"
            endpoint="/cnpjs"
            @turn-not-updating="setNotUpdating"
            @getter="getCnpjs"
          />

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

          <ErrorComp
          v-if="editError && isEditing && cnpj.id === idOnFocus"
            :error="this.editError"
          />
          
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
              class="message-btn btn-cancel-edit"
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
  import ErrorComp from '@/components/error/ErrorComp.vue';
  import ContentHead from '@/components/contents/ContentHead.vue';
  import ContentBodyItem from '@/components/contents/ContentBodyItem.vue';
  import FormUpdate from '@/components/forms/FormUpdate.vue';

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
        this.editError = null;
        this.clearRegisterError();
      },

      setUpdating(data) {
        this.registerError = null;
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

      setRegisterError(errorObject) {
        this.registerError = errorObject;
      },

      clearRegisterError() {
        this.registerError = null;
      },

      async getCnpjs() {
        const response = await requestGet("/cnpjs");
        if (!response || !response.length || response.length === '0') return null;
        this.listOfCnpjs = await response.map(cnpj => {
          return {
              ...cnpj,
              createdAt: new Date(cnpj.createdAt).toLocaleDateString("pt-BR"),
              updatedAt: new Date(cnpj.updatedAt).toLocaleDateString("pt-BR")
          };
        });
      },

      async updateCnpj(data) {
        try {
          this.editError = null;
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
          this.editError = {
            status: error.response.status,
            message: error.response.data.message,
          };
        }
      },

      async deleteCnpj(id) {
        await requestDelete(`/cnpjs/${id}`);
        this.toggleNotAsking();
        this.getCnpjs();
      },
    },

    components: {
    ViewHeader,
    FormRegister,
    ErrorComp,
    ContentHead,
    ContentBodyItem,
    FormUpdate
},

    mounted() {
      this.getCnpjs();
    },
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/views.module.scss';

  .content-body-items {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  #cnpj-id {
    width: 5%;
  }

  .content-body-actions {
    border-top: 0.75px solid #021b51;
    display: flex;
    justify-content: center;
    margin: 5px auto;
    padding: 10px 0;
    width: 95%;
  }
</style>