<template>
  <v-container>
    <v-subheader>
      <router-link to="/orders">Заказы</router-link>&nbsp;/ Заказ
    </v-subheader>

    <v-layout row wrap v-if="order._key">
      <v-flex xs12 class="mb-3">
        <p>
          {{order.status | status}}
          <span>{{order.kgFact}}</span>
        </p>

        <span>{{order.date | ruDate}}</span>
        <h2>
          {{order.meat | meatName}}
          <span small>{{order.kg}} кг</span>
        </h2>
        <router-link :to="`/providers/${order.provider._key}`">{{order.provider.name}}</router-link>
        <br />
        <div>{{order.comment}}</div>
        <br />
        <hr />
        <div class="pt-2 pb-2">
          <span>Создал: {{order.createdBy.name}}</span>
        </div>
      </v-flex>

      <v-flex xs12 class="text-xs-center">
        <div v-if="order._key">
          <v-btn small color="success" @click.stop="deliverOrder">Привез</v-btn>
          <v-btn small color="accent" @click.stop="openUpdateDialog">Изменить</v-btn>
          <v-btn small color="warning" @click.stop="failOrder">Не привез</v-btn>
          <br />
          <br />
          <v-btn flat outline small @click.stop="deleteOrder">Удалить</v-btn>
        </div>
      </v-flex>
    </v-layout>

    <v-dialog
      v-if="order._key"
      v-model="updateDialog"
      max-width="600px"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title class="grey lighten-2">Изменение заказа</v-card-title>

        <v-card-text>
          <v-form v-model="updateOrderFormIsValid" ref="updateOrderFrom">
            <order-fields :order="updateOrderDto"></order-fields>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-xs-center">
          <v-btn
            small
            @click.stop="updateOrder"
            class="primary"
            :loading="loading"
            :disabled="!updateOrderFormIsValid"
          >Сохранить</v-btn>
          <v-btn small class="ml-3" @click.stop="updateDialog=false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axiosInst from "@/utils/axios-instance";
import cloneDeep from "lodash/cloneDeep";

export default {
  data() {
    return {
      order: {},
      updateOrderDto: {},
      updateDialog: false,
      alertText: null,
      updateOrderFormIsValid: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    loadOrder() {
      return axiosInst
        .get(`/api/orders/${this.$route.params._key}`)
        .then(resp => {
          this.order = resp.data.order;
        })
        .catch(console.error);
    },
    deliverOrder() {
      const kgFact = +prompt(`Привез кг:`).trim();
      axiosInst
        .post(`/api/orders/${this.order._key}/deliver`, {
          kgFact
        })
        .then(() => {
          this.$router.push("/orders");
        })
        .catch(console.error);
    },
    failOrder() {
      if (confirm(`Подтвердить что НЕ привез?`)) {
        axiosInst
          .post(`/api/orders/${this.order._key}/fail`)
          .then(() => {
            this.$router.push("/orders");
          })
          .catch(console.error);
      }
    },
    openUpdateDialog() {
      this.updateOrderDto = cloneDeep(this.order);
      this.updateDialog = true;
    },
    updateOrder() {
      if (this.$refs.updateOrderFrom.validate()) {
        axiosInst
          .post(`/api/orders/${this.order._key}`, {
            orderData: {
              meat: this.updateOrderDto.meat,
              date: this.updateOrderDto.date,
              kg: this.updateOrderDto.kg,
              provider: this.updateOrderDto.provider._id,
              comment: this.updateOrderDto.comment
            }
          })
          .then(() => {
            this.loadOrder();
            this.updateDialog = false;
          })
          .catch(console.error);
      }
    },
    // cancelUpdate() {
    //   this.loadOrder().then(() => {
    //     this.updateDialog = false;
    //   });
    // },
    deleteOrder() {
      if (confirm(`Подтвердить удаление заказа?`)) {
        axiosInst
          .delete(`/api/orders/${this.order._key}`)
          .then(() => {
            this.$router.push("/orders");
          })
          .catch(console.error);
      }
    }
  },
  created() {
    this.loadOrder();
  }
};
</script>
