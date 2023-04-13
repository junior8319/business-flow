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
        :fields="buyersFieldsLabels"
        :new-register-label="newRegisterLabel"
        :cnpjs-fields-labels="cnpjsFieldsLabels"
        @set-register-error="setRegisterError"
        @clear-register-error="clearRegisterError"
        @getter="getBuyers"
        endpoint="/buyers"
        cnpj-status="buyer"
      />

      <ErrorComp
        v-if="registerError && !isEditing"
        :error="this.registerError"
      />

      <article class="content-table">
        <ContentHead :table-head-labels="this.buyersLabels"/>

        <div
          v-for="buyer in listOfBuyers"
          :key="buyer.id"
          class="content-body"
        >
          <ContentBodyItem :value="buyer.id" id="buyer-id" />
          <ContentBodyItem v-if="buyer.cnpj" :value="buyer.cnpj.cnpj" />
          <ContentBodyItem :value="buyer.tradingName" />
          <ContentBodyItem :value="buyer.responsibleName" />
          <ContentBodyItem :value="buyer.createdAt" />
          <ContentBodyItem :value="buyer.updatedAt" />

          <FormUpdate
            v-if="buyer.id === idOnFocus"
            :id-on-focus="idOnFocus"
            :on-updating="onUpdating"
            :fields="buyersFieldsLabels"
            :is-editing="isEditing"
            endpoint="/buyers"
            @turn-not-updating="setNotUpdating"
            @getter="getBuyers"
          />

          <div
            v-if="idOnFocus !== buyer.id"
            class="content-body-item actions-container"
          >
            <div
              v-if="!isAsking"
              class="action-update"
            >
              <button
                @click="setUpdating(buyer)"
              >
                Alterar
              </button>
            </div>

            <div
              class="action-delete"
              v-if="!isAsking"
            >
              <button
                @click="toggleIsAsking(buyer.id)"
              >
                Excluir
              </button>
            </div>
          </div>

          <ErrorComp
            v-if="editError && isEditing && buyer.id === idOnFocus"
            :error="this.editError"
          />

          <div
            class="message-container"
            v-if="isAsking && buyer.id === idOnFocus"
          >
            <h3>Tem certeza que deseja excluir esta Compradora {{ buyer.tradingName }}</h3>
            
            <button
              class="message-btn btn-confirm"
              @click="deleteBuyer(buyer.id)"
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
    name: "BuyersView",
    
    data() {
        return {
          title: 'Sacadas - B-Flow',
          headerTitle: 'Sacadas',
          headerLabel: 'Gerencie suas Sacadas',
          newRegisterLabel: 'Nova Sacada',
          listOfBuyers: [],
          listOfKeys: [],
          buyersLabels: [
            'ID',
            'CNPJ',
            'Razão Social',
            'Responsável',
            'Cadastrada em:',
            'Última alteração:',
            'Ações',
          ],
          buyersFieldsLabels: [
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
            { fieldName: 'phoneNumber', fieldLabel: 'Telefone', type: 'text' },
            { fieldName: 'situation', fieldLabel: 'Situação', type: 'text' },
            { fieldName: 'situationDate', fieldLabel: 'Data da Situação', type: 'text' },
            { fieldName: 'email', fieldLabel: 'Email', type: 'text' },
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
        this.getBuyers();
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

      async getBuyers() {
        const response = await requestGet("/buyers");
        if (!response || !response.length || response.length === 0) return null;
        this.listOfBuyers = await response.map(buyer => {
          return {
            ...buyer,
            createdAt: new Date(buyer.createdAt).toLocaleDateString("pt-BR"),
            updatedAt: new Date(buyer.updatedAt).toLocaleDateString("pt-BR"),
          };
        });
      },

      async deleteBuyer(id) {
        await requestDelete(`/buyers/${id}`);
        this.toggleNotAsking();
        this.getBuyers();
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
      this.getBuyers();
    },
}
</script>

<style lang="scss">
  @import '../assets/styles/views.module.scss';
</style>
