<template>
  <v-dialog v-model="errorDialog" max-width="500">
    <v-card v-if="error">
      <v-card-title>Ошибка {{error.status}}</v-card-title>
      <v-card-text>
        <v-alert type="error" :value="true">{{error.message}}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" small @click.stop="errorDialog=false">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.state.error;
    },
    errorDialog: {
      get() {
        return this.$store.getters.errorDialog;
      },
      set(newValue) {
        this.$store.commit("clearError");
      }
    }
  }
};
</script>
