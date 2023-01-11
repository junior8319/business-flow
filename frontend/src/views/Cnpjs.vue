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
            v-if="!isEditing || idOnFocus !== cnpj.id"
            :value="cnpj.cnpj"
          />
          <ContentBodyItem
            v-if="!isEditing || idOnFocus !== cnpj.id"
            :value="cnpj.companyType"
          />
          <ContentBodyItem :value="cnpj.createdAt" />
          <ContentBodyItem :value="cnpj.updatedAt" />
          
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
            <button
              class="message-btn btn-cancel-edit"
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
        try {
          this.setNotUpdating();
          const response = await requestPost('/cnpjs', data);

        if (response && response.status === 201) {
          this.registerError = null;
          return response;
        }
        this.getCnpjs();
        } catch (error) {
          console.log(error.response);
          this.registerError = {
            status: error.response.status,
            message: error.response.data.message,
          };
        }
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
      ContentBodyItem
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