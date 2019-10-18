<template>
  <v-dialog v-model="createOrderDialog" max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
      <v-card-title class="grey lighten-2">Создать заказ</v-card-title>
      <v-form v-model="createOrderFormIsValid" ref="createOrderForm">
        <v-card-text>
          <order-fields :order="newOrderDto"></order-fields>
        </v-card-text>
        <v-card-actions class="text-xs-center">
          <v-btn
            small
            @click.stop="createOrder"
            class="primary"
            :loading="loading"
            :disabled="!createOrderFormIsValid"
          >Создать</v-btn>
          <v-btn small class="ml-3" @click.stop="createDialog=false">Отмена</v-btn>
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
      newOrderDto: {
        date: new Date().toISOString()
      }
    };
  },
  watch: {
    // value(v) {
    //   this.provider = v;
    //   this.providers = [this.value];
    // },
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
              meat: this.newOrderDto.meat,
              date: this.newOrderDto.date,
              kg: this.newOrderDto.kg,
              provider: this.newOrderDto.provider._id,
              comment: this.newOrderDto.comment
            }
          })
          .then(() => {
            this.createOrderDialog = false;
          });
      }
    }
  }
};
</script>
