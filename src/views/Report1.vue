<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <v-subheader>Отчет 1</v-subheader>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-container class="pa-0">
          <form>
            <v-layout row wrap>
              <v-flex xs5 sm2>
                <v-select dense v-model="filter.meat" :items="meats" label="Мясо"></v-select>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-btn
                small
                round
                class="primary"
                @click.stop="generate"
                :loading="loading"
              >Сформировать</v-btn>
            </v-layout>
          </form>
        </v-container>
      </v-flex>

      <v-flex xs12>
        <v-list v-if="rows.length" three-line>
          <template v-for="row in rows">
            <v-list-tile class="row_tile" :key="row._key">
              <v-list-tile-content>
                <v-list-tile-title>{{row.provider}}</v-list-tile-title>
                <v-list-tile-sub-title>Всего заказов: {{row.ordersCnt}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Доставлено: {{row.deliveredCnt}} средний вес: {{row.avgKgFact}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>НЕ доставлено: {{row.failedCnt}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Текущих: {{row.createdCnt}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider class="mt-1 mb-1" :key="'d'+row._key"></v-divider>
          </template>
        </v-list>

        <p class="text-xs-center" v-if="noResults">Не найдено</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  name: "Orders",
  data() {
    return {
      rows: [],
      newOrder: {
        date: new Date().toISOString(),
        comment: null
      },
      noResults: false,
      createDialog: false,
      filter: {
        meat: "BEEF"
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
    generate() {
      this.noResults = false;
      axiosInst
        .get(`/api/reports/1`, {
          params: {
            meat: this.filter.meat
          }
        })
        .then(resp => {
          this.rows = resp.data.rows;
          if (!this.rows.length) this.noResults = true;
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
.row_tile .v-list__tile {
  padding: 0;
}
</style>