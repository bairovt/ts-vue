<template>
  <v-container class>
    <v-subheader>Заказы</v-subheader>
    <v-layout row wrap>
      <v-flex xs12>
        <form @submit.prevent="applyFilter">
          <v-select dense v-model="filter.status" :items="statuses" label="Статус"></v-select>
          <v-select dense clearable v-model="filter.meat" :items="meats" label="Мясо"></v-select>

          <v-btn small round type="submit" class="primary" :loading="loading">Найти</v-btn>

          <v-btn small round @click="createDialog=true" :loading="loading">Создать</v-btn>
        </form>
      </v-flex>

      <v-flex xs12>
        <orders-list v-if="orders.length" :orders="orders" />
        <p class="text-xs-center" v-if="noResults">Не найдено</p>
      </v-flex>
    </v-layout>

    <v-dialog v-model="createDialog" max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-card-title class="grey lighten-2">Создать заказ</v-card-title>

        <v-card-text>
          <order-fields :order="newOrder"></order-fields>
        </v-card-text>
        <v-card-actions class="text-xs-center">
          <v-btn small @click.stop="createOrder" class="primary" :loading="loading">Создать</v-btn>
          <v-btn small class="ml-3" @click.stop="createDialog=false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  data() {
    return {
      orders: [],
      newOrder: {
        date: new Date().toISOString(),
        comment: null
      },
      noResults: false,
      createDialog: false,
      filter: {
        status: "CREATED",
        meat: null
      }
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
    }
  },
  methods: {
    applyFilter() {
      this.noResults = false;
      axiosInst
        .get(`/api/orders`, {
          params: {
            status: this.filter.status,
            meat: this.filter.meat
          }
        })
        .then(resp => {
          this.orders = resp.data.orders;
          if (!this.orders.length) this.noResults = true;
        })
        .catch(console.error);
    },
    createOrder() {
      axiosInst
        .post(`/api/orders`, {
          orderData: this.newOrder
        })
        .then(() => {
          this.applyFilter();
          this.createDialog = false;
        });
    }
  },
  created() {
    this.applyFilter();
  }
};
</script>
