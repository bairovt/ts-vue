<template>
  <v-container class="pa-0">
    <v-subheader>Пользователи</v-subheader>
    <v-layout row wrap>
      <v-flex xs12>
        <users-list v-if="users.length" :users="users" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  name: "all-users",
  data() {
    return {
      users: []
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    loadUsers() {
      axiosInst
        .get("/api/users")
        .then(resp => {
          this.users = resp.data.users;
        })
        .catch(console.error);
    }
  },
  created() {
    this.loadUsers();
  }
};
</script>
