<template>
  <v-container class="pa-0">
    <v-layout row wrap>
      <v-flex xs12>
        <form @submit.prevent="filter">
          <v-container>
            <v-layout row wrap>
              <v-flex xs0 sm1></v-flex>
              <!-- отступ -->
              <v-flex xs4 sm2>
                <v-btn small round type="submit" class="primary" :loading="loading">Найти</v-btn>
              </v-flex>
              <v-flex xs4 sm2>
                <v-btn small round @click="createDialog=true" :loading="loading">Создать</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
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
      createDialog: false
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    filter() {
      this.noResults = false;
      axiosInst
        .get(`/api/orders`, {
          // params: {
          //   search
          // }
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
          this.filter();
          this.createDialog = false;
        });
    }
  },
  created() {
    this.filter();
  }
};
</script>
