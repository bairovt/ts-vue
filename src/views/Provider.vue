<template>
  <v-container>
    <v-layout row wrap v-if="provider._key">
      <v-flex xs12 class="mb-3">
        <v-subheader>
          <router-link to="/providers">Поставщики</router-link>&nbsp;/ Поставщик
        </v-subheader>
        <h2>
          {{provider.name}}
          <a :href="`tel:${provider.tel}`">{{provider.tel}}</a>
        </h2>
        <br />
        <div>{{provider.comment}}</div>
        <br />
        <hr />
        <div class="pt-2 pb-2">
          <span>Создал: {{provider.createdBy.name}}</span>
        </div>
      </v-flex>

      <v-flex xs12 sm3 class="text-xs-center">
        <div v-if="provider.editable">
          <v-btn small color="accent" @click.stop="editDialog=true">Изменить</v-btn>
          <v-btn flat outline small @click.stop="deleteProvider">Удалить</v-btn>
        </div>
      </v-flex>
    </v-layout>

    <v-dialog
      v-if="provider._key"
      v-model="editDialog"
      max-width="600px"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title class="grey lighten-2">Изменение</v-card-title>

        <v-card-text>
          <provider-fields :provider="provider"></provider-fields>
        </v-card-text>
        <v-card-actions class="text-xs-center">
          <v-btn small @click.stop="updateProvider" class="primary" :loading="loading">Сохранить</v-btn>
          <v-btn small class="ml-3" @click.stop="editDialog=false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  name: "Provider",
  data() {
    return {
      provider: {},
      editDialog: false,
      alertText: null
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    loadProvider() {
      axiosInst
        .get(`/api/providers/${this.$route.params._key}`)
        .then(resp => {
          this.provider = resp.data.provider;
        })
        .catch(console.error);
    },
    deleteProvider() {
      if (confirm(`Подтвердить удаление: ${this.provider.name}?`)) {
        axiosInst
          .delete(`/api/providers/${this.provider._key}`)
          .then(resp => {
            this.$router.push("/providers");
          })
          .catch(console.error);
      }
    },
    updateProvider() {
      axiosInst
        .patch(`/api/providers/${this.provider._key}`, {
          providerData: {
            name: this.provider.name,
            tel: this.provider.tel,
            place: this.provider.place,
            comment: this.provider.comment
          }
        })
        .then(resp => {
          this.loadProvider();
          this.editDialog = false;
        })
        .catch(console.error);
    }
  },
  created() {
    this.loadProvider();
  }
};
</script>
