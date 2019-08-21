<template>
  <v-list>
    <template v-for="p in providers">
      <v-list-tile avatar :key="p._key" :to="`/providers/${p._key}`">
        <v-list-tile-content>
          <v-list-tile-title>{{p.name}}</v-list-tile-title>
          <v-list-tile-sub-title>
            <a :href="`tel:${p.tel}`">{{p.tel}}</a>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider :key="'d'+p._key"></v-divider>
    </template>
  </v-list>
</template>

<script>
import keyFromId from "@/filters/key-from-id";

export default {
  props: ["providers"],
  filters: {
    keyFromId
  }
};
</script>
