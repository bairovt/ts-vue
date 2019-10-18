<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <v-subheader>Заказы</v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-btn small round @click="$store.state.createOrderDialog=true">Создать</v-btn>
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

    <create-order-dialog></create-order-dialog>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      noResults: false,
      createDialog: false,
      filter: {
        status: "CREATED",
        meat: null,
        provider: null
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
            meat: this.filter.meat,
            provider: this.filter.provider ? this.filter.provider._key : null
          }
        })
        .then(resp => {
          this.orders = resp.data.orders;
          if (!this.orders.length) this.noResults = true;
        })
        .catch(console.error);
    }
  },
  created() {
    this.applyFilter();
  }
};
</script>
