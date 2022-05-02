<template>
  <h2>產品列表</h2>
  <div class="container">
    <div class="card-body">
      <h5 class="card-title">
        {{ productOne.title }}
        <span class="badge bg-primary ms-2">{{ productOne.category }}</span>
      </h5>
      <p class="card-text">商品描述：{{ productOne.description }}</p>
      <p class="card-text">商品內容：{{ productOne.content }}</p>
      <div class="d-flex">
        <p class="card-text me-2">{{ productOne.price }}</p>
        <p class="card-text text-secondary">
          <del>{{ productOne.origin_price }}</del>
        </p>
        {{ productOne.unit }} / 元
      </div>
    </div>
    <img :src="productOne.imageUrl" :alt="productOne.title" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      productOne: {},
    };
  },
  methods: {
    getProduct() {
      // console.log(this.$route);
      const { id } = this.$route.params;
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      )
        .then((response) => {
          this.productOne = response.data.product;
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
