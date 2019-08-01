<template>
  <v-app>
    <!-- :disable-route-watcher="$vuetify.breakpoint.smAndUp" -->
    <v-navigation-drawer v-if="user" app fixed clipped v-model="leftDrawer" temporary>
      <v-list>
        <v-list-tile v-for="(item, i) in leftDrawerItems" :key="i" :to="item.url">
          <!-- v-if="!item.allowed || user.hasRoles(item.allowed)" -->
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Выход</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dense>
      <v-toolbar-side-icon v-if="user" @click.stop="leftDrawer = !leftDrawer"></v-toolbar-side-icon>

      <v-toolbar-title class="headline text-none">
        <span class="font-weight-light">Ts</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Release</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>-->
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <error-dialog />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      leftDrawer: false,
      leftDrawerItems: [
        { icon: "assignment", title: "Заказы", url: "/orders" },
        { icon: "supervisor_account", title: "Поставщики", url: "/providers" },
        { icon: "account_circle", title: "Юзеры", url: "/users" }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    error() {
      return this.$store.state.error;
    },
    errorDialog: {
      get() {
        return this.$store.getters.errorDialog;
      },
      set() {
        this.$store.commit("clearError");
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
