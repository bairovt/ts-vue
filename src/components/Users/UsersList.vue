<template>
  <v-list>
    <template v-for="user in users">
      <v-list-tile avatar :key="user._key" :to="`/users/${user._key}`">
        <!-- <v-list-tile-avatar v-if="user.pic">
          <img :src="`/upload/${user._key}/${user.pic}`" />
        </v-list-tile-avatar>-->
        <v-list-tile-content>
          <v-list-tile-title>{{user.name}}</v-list-tile-title>
          <!-- <v-list-tile-sub-title>{{user.tel}}</v-list-tile-sub-title> -->
        </v-list-tile-content>
      </v-list-tile>
      <v-divider :key="'d'+user._key"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  props: ["users"]
};
</script>
