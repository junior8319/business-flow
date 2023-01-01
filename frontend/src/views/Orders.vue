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
        :fields="ordersFieldsLabels"
        :statuses="statusList"
      />

      <article class="content-table">
        <ContentHead :orders-labels="this.ordersLabels"/>
        
        <div
        v-for="order in ordersList"
        :key="order.id"
        class="content-body"
        >
          <div class="content-body-items">
            <ContentBodyItem :value="order.orderNumber" id="order-number"/>
            <ContentBodyItem :value="order.buyer.name" />
            <ContentBodyItem :value="order.provider.name" />
            <ContentBodyItem :value="order.emissionDate" />
            <ContentBodyItem :value="order.value" />
            <ContentBodyItem
              v-if="!isEditing || idOnFocus !== order.id"
              :value="order.orderStatusBuyer.status.toUpperCase()"
            />
            <div
              v-if="idOnFocus === order.id && !isAsking"
              class="content-body-item update-container"
            >
              <select
                @change="setOrderToUpdate($event)"
                name="orderStatusBuyer"
              >
                <option
                  v-for="item in statusList"
                  :value="item.code"
                >
                  {{ item.status }}
                </option>
              </select>
            </div>
 
            <div
              v-if="idOnFocus === order.id"
            >
              <button
                class=" message-btn btn-confirm"
                v-if="!isAsking"
                @click="updateOrder(order.id, onUpdating)"
              >
                Confirmar
              </button>
            </div>

            <div
              v-if="idOnFocus === order.id"
            >
              <button
                class="message-btn btn-cancel"
                v-if="!isAsking"
                @click="setNotUpdating"
              >
                Cancelar
              </button>
            </div>
          </div>


          <div
            v-if="!isAsking && order.id !== idOnFocus"
            class="content-body-actions"
          >
            <div class="action-provider-data">
              <button>Dados do cedente</button>
            </div>

            <div class="action-update">
              <button
                @click="setUpdating(order.id, order.orderStatusBuyer)"
              >
                Alterar
              </button>
            </div>

            <div class="action-delete">
              <button
                @click="toggleIsAsking(order.id)"
              >
                Excluir
              </button>
            </div>
          </div>

          <div
            class="message-container"
            v-if="isAsking && order.id === idOnFocus"
          >
            <h3>Tem certeza que deseja excluir a Nota Fiscal n° {{ order.orderNumber }}?</h3>
            <button
              class="message-btn btn-confirm"
              @click="deleteOrder(order.id)"
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
import { requestDelete, requestGet, requestPost, requestPut } from '@/api/requests';
import ContentBodyItem from '@/components/contents/ContentBodyItem.vue';
import ContentHead from '@/components/contents/ContentHead.vue';
import ViewHeader from '@/components/headers/ViewHeader.vue';
import FormRegister from '@/components/forms/FormRegister.vue';

  export default {
    name: "OrdersView",
    
    data() {
      return {
          title: "N. Fiscais - B-Flow",
          headerTitle: 'Notas Fiscais',
          headerLabel: 'Gerencie suas Notas Fiscais',
          ordersList: [],
          ordersKeys: [],
          ordersLabels: [
            'NOTA FISCAL',
            'SACADO',
            'CEDENTE',
            'EMISSÃO',
            'VALOR',
            'STATUS SACADO',
          ],
          statusList: [
            { code: '0', status:'Pendente de Confirmação'},
            { code: '1', status:'Pedido confirmado'},
            { code: '2', status:'Não reconhece o pedido'},
            { code: '3', status:'Mercadoria não recebida'},
            { code: '4', status:'Recebida com avaria'},
            { code: '5', status:'Devolvida'},
            { code: '6', status:'Recebida com devolução parcial'},
            { code: '7', status:'Recebida e confirmada'},
            { code: '8', status:'Pagamento autorizado'},
          ],

          ordersFieldsLabels: [
            { fieldName: 'orderNfId', fieldLabel: 'ID da Nota Fiscal:', type: 'text' },
            { fieldName: 'orderNumber', fieldLabel: 'Número da NF:', type: 'text' },
            { fieldName: 'orderPath', fieldLabel: 'Caminho do Arquivo:', type: 'text' },
            { fieldName: 'orderFileName', fieldLabel: 'Nome do Arquivo:', type: 'text' },
            { fieldName: 'orderOriginalName', fieldLabel: 'Nome Original:', type: 'text' },
            { fieldName: 'emissionDate', fieldLabel: 'Data de Emissão:', type: 'text' },
            { fieldName: 'pdfFile', fieldLabel: 'Arquivo PDF:', type: 'text' },
            { fieldName: 'emitedTo', fieldLabel: 'Emitida para:', type: 'text' },
            { fieldName: 'nNF', fieldLabel: 'N. NF:', type: 'text' },
            { fieldName: 'CTE', fieldLabel: 'CTE:', type: 'text' },
            { fieldName: 'value', fieldLabel: 'Valor:', type: 'text' },
            { fieldName: 'cnpjId', fieldLabel: 'CNPJ:', type: 'select' },
            { fieldName: 'userId', fieldLabel: 'Usuária:', type: 'select' },
            { fieldName: 'buyerId', fieldLabel: 'Sacado:', type: 'select' },
            { fieldName: 'providerId', fieldLabel: 'Cedente:', type: 'select' },
            { fieldName: 'orderStatusBuyer', fieldLabel: 'Status do Sacado:', type: 'select'},
            { fieldName: 'orderStatusProvider', fieldLabel: 'Status do cedente:', type: 'select' },
            { fieldName: 'deliveryReceipt', fieldLabel: 'Recibo de Entrega:', type: 'text' },
            { fieldName: 'cargoPackingList', fieldLabel: 'Lista de Pacote da Carga:', type: 'text' },
            { fieldName: 'deliveryCtrc', fieldLabel: 'CTRC de Entrega:', type: 'text' },
          ],

          error: null,
          isAsking: false,
          idOnFocus: null,
          onUpdating: {
            orderStatusBuyer: null,
          },
          isEditing: false,
      };
    },

    methods: {
      async getOrders() {
        try {
          const response = await requestGet('/orders');
          this.ordersList = response.map(order => {
            this.formatBRLOrderValue(order.value);
            return {
              ...order,
              createdAt: new Date(order.createdAt).toLocaleDateString('pt-BR'),
              updatedAt: new Date(order.updatedAt).toLocaleDateString('pt-BR'),
              emissionDate: new Date(order.emissionDate).toLocaleDateString('pt-BR'),
              value: this.formatBRLOrderValue(order.value),
              orderStatusBuyer: this.describeOrderStatusBuyer(order.orderStatusBuyer),
            };
          });
        } catch (error) {
          console.log(error);
          this.error = error.response.data.message;
        }
      },

      async updateOrder(id, data) {
        try {
          const updatingField = {
            orderStatusBuyer: data.orderStatusBuyer,
          };

          const response = await requestPut(`/orders/${id}`, updatingField);
          if (response && response.status === 200) {
            this.setNotUpdating();
            this.setOrdersKeys();
          }
        } catch (error) {
          console.log(error.response.data.message);
          this.error = error.response.data.message;
        }
      },

      async registerOrder(event, data) {
        event.preventDefault();
        try {
          const response = await requestPost('/orders', JSON.stringify(data));

          if (response && response.status === 201) {
            this.setOrdersKeys();
            return response;
          }
        } catch (error) {
          console.log(error.response.data.message);
          this.error = error.response.data.message;
        }
      },

      async deleteOrder(id) {
        await requestDelete(`orders/${id}`);
        this.toggleNotAsking();
        this.getOrders();
      },

      formatBRLOrderValue(value) {
        return Number(value)
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      },

      describeOrderStatusBuyer(index) {
        switch (index) {
          case '0':
            return { code: '0', status:'Pendente de Confirmação'};
          case '1':
            return { code: '1', status:'Pedido confirmado'};
          case '2':
            return { code: '2', status:'Não reconhece o pedido'};
          case '3':
            return { code: '3', status:'Mercadoria não recebida'};
          case '4':
            return { code: '4', status:'Recebida com avaria'};
          case '5':
            return { code: '5', status:'Devolvida'};
          case '6':
            return { code: '6', status:'Recebida com devolução parcial'};
          case '7':
            return { code: '7', status:'Recebida e confirmada'};
          case '8':
            return { code: '8', status:'Pagamento autorizado'};
          default:
            break;
        }
      },

      async setOrdersKeys() {
        await this.getOrders();
        if (this.ordersList.length > 0) {
          this.ordersKeys = Object.keys(this.ordersList[0]);
        }
      },

      toggleNotAsking() {
        this.idOnFocus = null;
        this.isAsking = false;
      },

      toggleIsAsking(id) {
        this.isAsking = true;
        this.setIdOnFocus(id);
      },

      setUpdating(id, data) {
        this.idOnFocus = id;
        this.onUpdating = data;
        this.isEditing = true;
      },

      setOrderToUpdate(event) {
        this.onUpdating[event.target.name] = event.target.value;
      },

      setNotUpdating() {
        this.idOnFocus = null;
        this.onUpdating = {
            orderStatusBuyer: null,
        };
        this.isEditing = false;
        this.getOrders();
      },

      setIdOnFocus(id) {
        this.idOnFocus = id;
      },
    },

    components: { ViewHeader, ContentHead, ContentBodyItem, FormRegister },

    mounted() {
      this.setOrdersKeys();
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

  #order-number {
    width: 7.5%;
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