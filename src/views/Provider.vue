<template>
  <v-container>
    <v-layout row wrap v-if="provider._key">
      <v-flex xs12 class="mb-3">
        <v-subheader>Поставщик</v-subheader>
        <h2>
          <strong>{{provider.name}}</strong>
        </h2>
        <br />
        <div>{{provider.comment}}</div>
        <br />
        <div class="pt-2 pb-2">
          <span>Создал: {{provider.createdBy.name}}</span>
        </div>
      </v-flex>

      <v-flex xs12 sm3 class="text-xs-center">
        <div v-if="provider.editable">
          <v-btn flat outline small @click.stop="deleteProvider">Удалить</v-btn>
          <v-btn small color="accent" @click.stop="editDialog=true">Изменить</v-btn>
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
        <v-card-text>
          <!-- <provider-fields :provider="provider" :info="true"></provider-fields> -->
        </v-card-text>

        <v-card-actions>
          <v-btn @click.stop="updateProvider" class="primary" :loading="loading">Сохранить</v-btn>
          <v-btn class="ml-3" @click.stop="editDialog=false">Отмена</v-btn>
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
          provider: this.provider
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
