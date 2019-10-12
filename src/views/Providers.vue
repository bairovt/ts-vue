<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6>
        <v-subheader>Поставщики</v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-btn small round @click="createDialog=true" :loading="loading">Создать</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <form @submit.prevent="find">
          <!-- отступ -->
          <v-text-field autofocus clearable label="Поиск по имени и тел" v-model="search"></v-text-field>
          <v-btn small round type="submit" class="primary" :loading="loading">Найти</v-btn>
        </form>
      </v-flex>

      <v-flex xs12>
        <providers-list v-if="providers.length" :providers="providers" />
        <p class="text-xs-center" v-if="noResults">Не найдено</p>
      </v-flex>
    </v-layout>

    <v-dialog v-model="createDialog" max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-card-title class="grey lighten-2">Создать поставщика</v-card-title>

        <v-card-text>
          <provider-fields :provider="newProvider"></provider-fields>
        </v-card-text>
        <v-card-actions class="text-xs-center">
          <v-btn small @click.stop="createProvider" class="primary" :loading="loading">Создать</v-btn>
          <v-btn small class="ml-3" @click.stop="createDialog=false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  name: "all-persons",
  data() {
    return {
      providers: [],
      newProvider: {
        name: null,
        tel: null,
        place: null,
        comment: null
      },
      search: "",
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
    },
    createProvider() {
      axiosInst
        .post(`/api/providers`, {
          providerData: this.newProvider
        })
        .then(() => {
          this.search = "";
          this.find();
          this.createDialog = false;
        })
        .catch(console.error);
    }
  },
  created() {
    this.find();
  }
};
</script>
