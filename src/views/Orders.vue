<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <v-subheader>Заказы</v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-btn small round @click="createDialog=true" :loading="loading">Создать</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-container class="pa-0">
          <form @submit.prevent="applyFilter">
            <v-layout row wrap>
              <v-flex xs5 sm2>
                <v-select dense v-model="filter.status" :items="statuses" label="Статус"></v-select>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-flex xs5 sm2>
                <v-select dense clearable v-model="filter.meat" :items="meats" label="Мясо"></v-select>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-flex xs11 sm6>
                <provider-selection :value="filter.provider" @change="filter.provider = $event"></provider-selection>
              </v-flex>

              <v-btn small round type="submit" class="primary" :loading="loading">Найти</v-btn>
            </v-layout>
          </form>
        </v-container>
      </v-flex>

      <v-flex xs12>
        <orders-list v-if="orders.length" :orders="orders" />
        <p class="text-xs-center" v-if="noResults">Не найдено</p>
      </v-flex>
    </v-layout>

    <v-dialog v-model="createDialog" max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-card-title class="grey lighten-2">Создать заказ</v-card-title>
        <v-form v-model="createOrderFormIsValid" ref="createOrderForm">
          <v-card-text>
            <order-fields :order="newOrderDto"></order-fields>
          </v-card-text>
          <v-card-actions class="text-xs-center">
            <v-btn
              small
              @click.stop="createOrder"
              class="primary"
              :loading="loading"
              :disabled="!createOrderFormIsValid"
            >Создать</v-btn>
            <v-btn small class="ml-3" @click.stop="createDialog=false">Отмена</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      newOrderDto: {
        date: new Date().toISOString()
      },
      noResults: false,
      createDialog: false,
      filter: {
        status: "CREATED",
        meat: null,
        provider: null
      },
      createOrderFormIsValid: false
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    statuses() {
      return this.$store.state.statuses;
    },
    meats() {
      return this.$store.state.meats;
    },
    allProviders() {
      return this.$store.state.allProviders;
    }
  },
  methods: {
    applyFilter() {
      this.noResults = false;
      axiosInst
        .get(`/api/orders`, {
          params: {
            status: this.filter.status,
            meat: this.filter.meat,
            provider: this.filter.provider ? this.filter.provider._key : null
          }
        })
        .then(resp => {
          this.orders = resp.data.orders;
          if (!this.orders.length) this.noResults = true;
        })
        .catch(console.error);
    },
    createOrder() {
      if (this.$refs.createOrderForm.validate()) {
        axiosInst
          .post(`/api/orders`, {
            orderData: {
              meat: this.newOrderDto.meat,
              date: this.newOrderDto.date,
              kg: this.newOrderDto.kg,
              provider: this.newOrderDto.provider._id,
              comment: this.newOrderDto.comment
            }
          })
          .then(() => {
            this.applyFilter();
            this.createDialog = false;
          });
      }
    }
  },
  created() {
    this.applyFilter();
  }
};
</script>
