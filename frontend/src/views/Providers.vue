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
        :fields="providersFieldsLabels"
        :new-register-label="newRegisterLabel"
        :cnpjs-fields-labels="cnpjsFieldsLabels"
        @set-register-error="setRegisterError"
        @clear-register-error="clearRegisterError"
        @getter="getProviders"
        endpoint="/providers"
        cnpj-status="provider"
      />

      <!-- <FormRegister
        :fields="cnpjsFieldsLabels"
        new-register-label="Novo CNPJ"
        @set-register-error="setRegisterError"
        @clear-register-error="clearRegisterError"
        endpoint="/cnpjs"
      /> -->

      <ErrorComp
        v-if="registerError && !isEditing"
        :error="this.registerError"
      />

      <article class="content-table">
        <ContentHead :table-head-labels="this.providersLabels"/>

        <div
          v-for="provider in listOfProviders"
          :key="provider.id"
          class="content-body"
        >
          <ContentBodyItem :value="provider.id" id="provider-id" />
          <ContentBodyItem v-if="provider.cnpj" :value="provider.cnpj.cnpj" />
          <ContentBodyItem :value="provider.tradingName" />
          <ContentBodyItem :value="provider.responsibleName" />
          <ContentBodyItem :value="provider.createdAt" />
          <ContentBodyItem :value="provider.updatedAt" />

          <FormUpdate
            v-if="provider.id === idOnFocus"
            :id-on-focus="idOnFocus"
            :on-updating="onUpdating"
            :fields="providersFieldsLabels"
            :is-editing="isEditing"
            endpoint="/providers"
            @turn-not-updating="setNotUpdating"
            @getter="getProviders"
          />

          <div
            v-if="idOnFocus !== provider.id"
            class="content-body-item actions-container"
          >
            <div
              v-if="!isAsking"
              class="action-update"
            >
              <button
                @click="setUpdating(provider)"
              >
                Alterar
              </button>
            </div>

            <div
              class="action-delete"
              v-if="!isAsking"
            >
              <button
                @click="toggleIsAsking(provider.id)"
              >
                Excluir
              </button>
            </div>
          </div>

          <ErrorComp
            v-if="editError && isEditing && provider.id === idOnFocus"
            :error="this.editError"
          />

          <div
            class="message-container"
            v-if="isAsking && provider.id === idOnFocus"
          >
            <h3>Tem certeza que deseja excluir esta Cedente {{ provider.tradingName }}</h3>
            
            <button
              class="message-btn btn-confirm"
              @click="deleteProvider(provider.id)"
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
import { requestDelete, requestGet } from '@/api/requests';
import ContentBodyItem from '@/components/contents/ContentBodyItem.vue';
import ContentHead from '@/components/contents/ContentHead.vue';
import ErrorComp from '@/components/error/ErrorComp.vue';
import FormRegister from '@/components/forms/FormRegister.vue';
import FormUpdate from '@/components/forms/FormUpdate.vue';
import ViewHeader from '@/components/headers/ViewHeader.vue';

  export default {
    name: "ProvidersView",
    
    data() {
        return {
          title: 'Cedentes - B-Flow',
          headerTitle: 'Cedentes',
          headerLabel: 'Gerencie suas Cedentes',
          newRegisterLabel: 'Nova Cedente',
          listOfProviders: [],
          listOfKeys: [],
          providersLabels: [
            'ID',
            'CNPJ',
            'Razão Social',
            'Responsável',
            'Cadastrada em:',
            'Última alteração:',
            'Ações',
          ],
          providersFieldsLabels: [
            { fieldName: 'name', fieldLabel: 'Nome Fantasia', type: 'text' },
            { fieldName: 'tradingName', fieldLabel: 'Razão Social', type: 'text' },
            { fieldName: 'cashforceTax', fieldLabel: 'Taxa Cashforce', type: 'text' },
            { fieldName: 'responsibleName', fieldLabel: 'Nome da Responsável', type: 'text' },
            { fieldName: 'responsibleEmail', fieldLabel: 'Email da responsável', type: 'text' },
            { fieldName: 'responsiblePosition', fieldLabel: 'Função da responsável', type: 'text' },
            { fieldName: 'responsiblePhone', fieldLabel: 'Telefone da Responsável', type: 'text' },
            { fieldName: 'responsibleMobile', fieldLabel: 'Celular da Responsável', type: 'text' },
            { fieldName: 'website', fieldLabel: 'Web site', type: 'text' },
            { fieldName: 'postalCode', fieldLabel: 'CEP', type: 'text' },
            { fieldName: 'address', fieldLabel: 'Logradouro', type: 'text' },
            { fieldName: 'number', fieldLabel: 'Número', type: 'text' },
            { fieldName: 'complement', fieldLabel: 'Complemento', type: 'text' },
            { fieldName: 'neighborhood', fieldLabel: 'Bairro', type: 'text' },
            { fieldName: 'city', fieldLabel: 'Cidade', type: 'text' },
            { fieldName: 'state', fieldLabel: 'Estado', type: 'text' },
            { fieldName: 'bank', fieldLabel: 'Banco', type: 'text' },
            { fieldName: 'bankAgency', fieldLabel: 'Agência', type: 'text' },
            { fieldName: 'account', fieldLabel: 'Conta', type: 'text' },
            { fieldName: 'documents', fieldLabel: 'Documentos', type: 'text' },
            { fieldName: 'phoneNumber', fieldLabel: 'Telefone', type: 'text' },
            { fieldName: 'situation', fieldLabel: 'Situação', type: 'text' },
            { fieldName: 'situationDate', fieldLabel: 'Data da Situação', type: 'text' },
            { fieldName: 'email', fieldLabel: 'Nome Fantasia', type: 'text' },
          ],
          cnpjsFieldsLabels: [
            { fieldName: 'cnpj', fieldLabel: 'CNPJ:', type: 'text' },
            { fieldName: 'companyType', fieldLabel: 'Tipo de Empresa:', type: 'text' },
          ],
          isAsking: false,
          isEditing: false,
          isCompanyInDisplay: false,
          registerError: null,
          editError: null,
          idOnFocus: null,
          onUpdating: null,
          companyOnDisplay: null,
          cnpjIdCompanyDisplay: null,
          error: null,
        };
    },

    methods: {
      toggleIsAsking(id) {
        this.isAsking = true;
        this.setIdOnFocus(id);
        this.editError = null;
        this.clearRegisterError(); 
      },

      toggleNotAsking() {
        this.idOnFocus = null;
        this.isAsking = false;
      },

      setUpdating(data) {
        this.registerError = null;
        this.idOnFocus = data.id;
        this.onUpdating = data;
        this.isEditing = true;
      },

      setNotUpdating() {
        this.idOnFocus = null;
        this.onUpdating = null;
        this.isEditing = false;
        this.getProviders();
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

      async getProviders() {
        const response = await requestGet("/providers");
        if (!response || !response.length || response.length === 0) return null;
        this.listOfProviders = await response.map(provider => {
          return {
            ...provider,
            createdAt: new Date(provider.createdAt).toLocaleDateString("pt-BR"),
            updatedAt: new Date(provider.updatedAt).toLocaleDateString("pt-BR"),
          };
        });
      },

      async deleteProvider(id) {
        await requestDelete(`/providers/${id}`);
        this.toggleNotAsking();
        this.getProviders();
      },
    },

    components: {
      ViewHeader,
      ContentHead,
      ContentBodyItem,
      FormUpdate,
      FormRegister,
      ErrorComp
    },

    mounted() {
      this.getProviders();
    },
}
</script>

<style lang="scss">
  @import '../assets/styles/views.module.scss';
</style>
