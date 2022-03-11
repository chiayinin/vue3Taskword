<template>
  <h2>產品列表</h2>
  {{ product }}
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
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`
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
