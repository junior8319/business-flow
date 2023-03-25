import { default } from '../../views/Orders.vue';
<template>
  <section class="company-section-container">
    <article
      v-for="field in fieldsToShow"
      class="company-section-item"
    >
      <div v-if="field.fieldName === 'cnpj'">
        <span>{{ field.fieldLabel }}</span>
        <h3>
          {{ provider.cnpj.cnpj }}
        </h3>
      </div>

      <div v-else>
        <span>{{ field.fieldLabel }}</span>
        <h3>
          {{ provider[field.fieldName] }}
        </h3>
      </div>
    </article>
    <article
      class="company-section-btn"
    >
      <button
        @click="this.$emit('hideProvider')"
      >
        Fechar
      </button>
    </article>
  </section>
</template>

<script>
  export default {
    name: 'CompanySection',
    data() {
      return {
        companiesFieldsLabels: [
          { fieldName: 'id', fieldLabel: 'ID:', type: 'text' },
          { fieldName: 'name', fieldLabel: 'Nome da empresa:', type: 'text' },
          { fieldName: 'tradingName', fieldLabel: 'Nome Fantasia:', type: 'text' },
          { fieldName: 'cashforceTax', fieldLabel: 'Taxa Cashforce:', type: 'text' },
          { fieldName: 'responsibleName', fieldLabel: 'Nome da responsável:', type: 'text' },
          { fieldName: 'responsibleEmail', fieldLabel: 'Email da responsável:', type: 'text' },
          { fieldName: 'responsiblePosition', fieldLabel: 'Cargo da responsável:', type: 'text' },
          { fieldName: 'responsiblePhone', fieldLabel: 'Telefone da responsável:', type: 'text' },
          { fieldName: 'responsibleMobile', fieldLabel: 'Celular da responsável:', type: 'text' },
          { fieldName: 'website', fieldLabel: 'Web Site:', type: 'text' },
          { fieldName: 'postalCode', fieldLabel: 'Código Postal (CEP):', type: 'text' },
          { fieldName: 'address', fieldLabel: 'Logradouro:', type: 'text' },
          { fieldName: 'number', fieldLabel: 'Número:', type: 'text' },
          { fieldName: 'complement', fieldLabel: 'Complemento:', type: 'text' },
          { fieldName: 'neigborhood', fieldLabel: 'Bairro:', type: 'text'},
          { fieldName: 'city', fieldLabel: 'Cidade:', type: 'select' },
          { fieldName: 'state', fieldLabel: 'Estado:', type: 'text' },
          { fieldName: 'bank', fieldLabel: 'Banco:', type: 'text' },
          { fieldName: 'bankAgency', fieldLabel: 'Agência:', type: 'text' },
          { fieldName: 'account', fieldLabel: 'Conta:', type: 'text' },
          { fieldName: 'documents', fieldLabel: 'Documentos:', type: 'text' },
          { fieldName: 'phoneNumber', fieldLabel: 'Telefone:', type: 'text' },
          { fieldName: 'situation', fieldLabel: 'Situação:', type: 'text' },
          { fieldName: 'situationDate', fieldLabel: 'Data da Situação:', type: 'text' },
          { fieldName: 'createdAt', fieldLabel: 'Data de cadastro:', type: 'text' },
          { fieldName: 'updatedAt', fieldLabel: 'Data de última alteração:', type: 'text' },
          { fieldName: 'cnpj', fieldLabel: 'CNPJ:', type: 'text' },
          { fieldName: 'confirm', fieldLabel: 'Confirmada:', type: 'text' },
          { fieldName: 'email', fieldLabel: 'Email:', type: 'text' },
        ],

        fieldsToShow: [],

        companyData: null,
      }
    },

    props: ['provider'],
    emits: ['hideProvider'],

    methods: {
      setFieldsToShow(receivedCompany) {
        let keys = Object.keys(receivedCompany);

        keys = keys.filter(key => {
          if (receivedCompany[key]) return key;
        });

        this.fieldsToShow = this.companiesFieldsLabels.filter(field => {
          if (keys.includes(field.fieldName)) return field;
        });
      },
    },

    mounted() {
      this.companyData = this.provider;
      console.log('teste');
      this.setFieldsToShow(this.companyData);
    },
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/companySection.module.scss';
</style>
