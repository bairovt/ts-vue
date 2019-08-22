<template>
  <div>
    <v-text-field
      name="name"
      label="Имя"
      type="text"
      :autofocus="true"
      v-model="provider.name"
      required
    ></v-text-field>

    <v-text-field name="tel" label="телефон" type="text" v-model="provider.tel"></v-text-field>
    <v-text-field name="place" label="место" type="text" v-model="provider.place"></v-text-field>

    <v-textarea
      id="comment"
      name="comment"
      label="Информация"
      type="text"
      v-model="provider.comment"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    provider: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {}
};
</script>
