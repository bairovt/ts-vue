<template>
  <!-- @change="findProviders" -->
  <v-autocomplete
    :rules="[rules.required]"
    :items="allProviders"
    v-model="order.provider"
    label="Поставщик"
    item-text="name"
    item-value="_id"
    menu-props="auto"
    dense
    clearable
  >
    <template v-slot:item="data">
      <v-list-tile-content>
        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
        <v-list-tile-sub-title v-html="data.item.tel" style="margin-left:1em"></v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: {
    order: {
      type: Object
    },
    provider: {
      type: String
    }
    // rules: {
    //   type: Array
    // }
  },
  data() {
    return {
      // provider: null,
      providers: []
    };
  },
  computed: {
    allProviders() {
      return this.$store.state.allProviders;
    },
    rules() {
      return this.$store.state.rules;
    }
  },
  methods: {}
};
</script>
