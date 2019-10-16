<template>
  <div>
    <v-menu
      :close-on-content-click="false"
      v-model="dateMenu"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        :value="this.$options.filters.ruDate(this.order.date)"
        label="дата поставки"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker v-model="order.date" no-title @input="dateMenu = false" locale="ru-ru"></v-date-picker>
    </v-menu>

    <v-select
      :rules="[rules.required]"
      :autofocus="true"
      v-model="order.meat"
      :items="meats"
      label="Мясо"
    ></v-select>

    <v-text-field
      name="kg"
      label="Вес кг"
      v-model="order.kg"
      :rules="[rules.required, rules.numeric]"
    ></v-text-field>

    <provider-selection :value="order.provider" @change="order.provider = $event"></provider-selection>

    <v-textarea id="comment" name="comment" label="Комментарий" type="text" v-model="order.comment"></v-textarea>
  </div>
</template>

<script>
export default {
  name: "OrderFields",
  props: {
    order: {
      type: Object
    }
  },
  data() {
    return {
      dateMenu: false,
      providers: []
    };
  },
  computed: {
    meats() {
      return this.$store.state.meats;
    },
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
