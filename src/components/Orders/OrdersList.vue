<template>
  <v-list>
    <template v-for="order in orders">
      <v-list-tile class="order_tile" avatar :key="order._key" :to="`/orders/${order._key}`">
        <v-list-tile-content>
          <v-list-tile-title>
            <span class="grey--text text--lighten-1">{{order.date | ruDate}}</span>
            {{order.meat | meatName}}
            <span>{{order.kg}} /</span>
            <span>{{order.kgFact}} кг</span>
          </v-list-tile-title>
          <v-list-tile-sub-title
            :to="`/providers/${order.provider}`"
          >{{order.provider | providerName}}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{order.comment}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-1 mb-1" :key="'d'+order._key"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  props: ["orders"]
};
</script>

<style>
.order_tile .v-list__tile {
  padding: 0;
}
</style>
