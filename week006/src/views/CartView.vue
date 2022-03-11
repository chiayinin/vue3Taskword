<template>
  <h2>購物車列表</h2>
  <div class="container">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
            ></div>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            <div v-if="item.price === item.origin_price" class="h5">
              {{ item.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="openProductModal(item.id)"
                :disabled="isLoadingItem === item.id"
              >
                <i
                  v-show="isLoadingItem === item.id"
                  class="fas fa-spinner fa-pulse"
                ></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(item.id)"
                :disabled="isLoadingItem === item.id"
              >
                <i
                  v-show="isLoadingItem === item.id"
                  class="fas fa-spinner fa-pulse"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import emitter from "@/libs/emitter.js";

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
      products: [],
      isLoadingItem: "",
    };
  },

  methods: {
    getProducts() {
      this.$http
        .get(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((error) => {
          console.dir(error);
        });
    },

    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };

      this.isLoadingItem = id;

      this.$http
        .post(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((response) => {
          console.log(response);
          this.isLoadingItem = "";
          emitter.emit("get-cart");
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },

  mounted() {
    this.getProducts();
  },
};
</script>
