<template>
  <v-dialog
    :value="createOrderDialog"
    @input="closeCreateOrderDialog"
    max-width="600px"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card>
      <v-card-title class="grey lighten-2">Создать заказ</v-card-title>
      <v-form v-model="createOrderFormIsValid" ref="createOrderForm">
        <v-card-text>
          <order-fields :order="newOrder"></order-fields>
        </v-card-text>
        <v-card-actions class="text-xs-center">
          <v-btn
            small
            @click.stop="createOrder"
            class="primary"
            :loading="loading"
            :disabled="!createOrderFormIsValid"
          >Создать</v-btn>
          <v-btn small class="ml-3" @click.stop="closeCreateOrderDialog">Отмена</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axiosInst from "@/utils/axios-instance";

export default {
  name: "CreateOrderDialog",
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      createOrderFormIsValid: false,
      newOrder: this.$props.value
    };
  },
  watch: {
    value(v) {
      this.newOrder = v;
    }
  },
  computed: {
    createOrderDialog: {
      get() {
        return this.$store.state.createOrderDialog;
      },
      set(v) {
        this.$store.state.createOrderDialog = v;
      }
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    createOrder() {
      if (this.$refs.createOrderForm.validate()) {
        axiosInst
          .post(`/api/orders`, {
            orderData: {
              meat: this.newOrder.meat,
              date: this.newOrder.date,
              kg: this.newOrder.kg,
              provider: this.newOrder.provider._id,
              comment: this.newOrder.comment
            }
          })
          .then(() => {
            this.closeCreateOrderDialog();
          });
      }
    },
    closeCreateOrderDialog() {
      this.$store.commit("clearNewOrder");
      this.$store.commit("setCreateOrderDialog", false);
    }
  }
  // beforeMount() {
  //   this.newOrder.date = new Date().toISOString();
  // }
};
</script>
