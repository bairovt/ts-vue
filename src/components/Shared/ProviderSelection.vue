<template>
  <v-autocomplete
    :rules="rules"
    :items="providers"
    v-model="provider"
    @change="$emit('change', provider)"
    :search-input.sync="search"
    :loading="loading"
    :filter="filter"
    return-object
    label="Поставщик"
    item-text="name"
    item-value="_id"
    menu-props="auto"
    hide-no-data
    clearable
    dense
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
import axiosInst from "@/utils/axios-instance";

export default {
  props: {
    value: {
      type: Object
    },
    rules: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      provider: this.value,
      providers: this.value ? [this.value] : [],
      search: null
    };
  },
  watch: {
    value(v) {
      this.provider = v;
      this.providers = [this.value];
    },
    search(v) {
      if (v) this.find();
      else this.providers = [];
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    find() {
      axiosInst
        .get(`/api/providers`, {
          params: {
            search: this.search
          }
        })
        .then(resp => {
          this.providers = resp.data.providers;
          if (!this.providers.length) this.noResults = true;
        })
        .catch(console.error);
    },
    filter(item, queryText, itemText) {
      return (
        itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 || item.tel.indexOf(queryText) > -1
      );
    }
  }
};
</script>
