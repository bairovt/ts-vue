<template>
  <v-container>
    <v-layout row v-if="error && error.status && error.status === 401">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert></app-alert>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="mb-4">Вход</h2>
        <form @submit.prevent="logIn">
          <v-text-field
            name="email"
            label="e-mail"
            id="email"
            type="email"
            v-model="email"
            required
          ></v-text-field>
          <v-text-field
            name="password"
            label="пароль"
            id="password"
            type="password"
            v-model="password"
            required
          ></v-text-field>
          <v-btn type="submit" class="primary" :loading="loading">Войти</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";
import jwtDecode from "jwt-decode";
// import { log } from "util";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    logIn() {
      this.$store.commit("clearError");
      axiosInst
        .post("/api/users/login", {
          email: this.email,
          password: this.password
        })
        .then(resp => {
          const { token } = resp.data;
          window.localStorage.setItem("authToken", token);
          this.$store.commit("setUser", jwtDecode(token));
          this.$router.push("/orders");
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
</style>

