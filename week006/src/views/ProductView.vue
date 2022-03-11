<template>
  <h2>產品列表</h2>
  <div class="container">
    <div class="row row-cols-1 row-cols-4 g-3">
      <div class="col" v-for="item in product" :key="item.id">
        <div class="card h-100">
          <img
            :src="item.imageUrl"
            class="card-img-top h-100"
            :alt="item.title"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">
              {{ item.description }}
            </p>
            <router-link :to="`/product/${item.id}`" class="btn btn-primary">
              要看產品細節點這邊
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: [],
    };
  },
  methods: {
    getProduct() {
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      )
        .then((response) => {
          this.product = response.data.products;
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
