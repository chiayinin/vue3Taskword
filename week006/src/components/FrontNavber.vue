<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">week006的餐飲店</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/product">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
        </ul>
      </div>
      <button class="btn btn-warning">
        結帳點這邊
        <span class="badge bg-danger">{{ cartData.carts.length }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
import emitter from "@/libs/emitter.js";

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },

  methods: {
    getCart() {
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          this.cartData = response.data.data;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },

  mounted() {
    this.getCart();
    emitter.on("get-cart", () => {
      this.getCart();
    });
  },
};
</script>
