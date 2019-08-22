<template>
  <v-container class="pa-0">
    <v-layout row wrap>
      <v-flex xs12>
        <form @submit.prevent="find">
          <v-container>
            <v-layout row wrap>
              <v-flex xs0 sm1></v-flex>
              <!-- отступ -->
              <v-flex xs12 sm8>
                <v-text-field autofocus clearable label="Поиск" v-model="search"></v-text-field>
              </v-flex>
              <v-flex xs4 sm2>
                <v-btn small round type="submit" class="primary" :loading="loading">Найти</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </form>
      </v-flex>

      <v-flex xs12>
        <providers-list v-if="providers.length" :providers="providers" />
        <p class="text-xs-center" v-if="noResults">Не найдено</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  name: "all-persons",
  data() {
    return {
      providers: [],
      search: "",
      noResults: false
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    find() {
      this.noResults = false;
      let search = !this.search ? "" : this.search.trim();
      axiosInst
        .get(`/api/providers`, {
          params: {
            search
          }
        })
        .then(resp => {
          this.providers = resp.data.providers;
          if (!this.providers.length) this.noResults = true;
        })
        .catch(console.error);
    }
  },
  created() {
    this.find();
  }
};
</script>
