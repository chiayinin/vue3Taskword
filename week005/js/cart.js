// ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'chiayinin-api';

const app = createApp({
  data(){
    return{
      cartData: {},
      products: [],
      productId: '',
      isLoadingItem: ''
    };
  },

  methods:{
    getProducts(){
      axios.get(`${apiUrl}/api/${apiPath}/products/all`)
      .then(response=>{
        console.log(response);
        this.products = response.data.products;
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    openProductModal(id){
      this.productId = id;
      this.$refs.productModal.openModal();
    },

    getCart(){
      axios.get(`${apiUrl}/api/${apiPath}/cart`)
      .then(response=>{
        console.log(response);
        this.cartData = response.data.data;
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    addToCart(id, qty=1){
      const data={
        product_id: id,
        qty
      };

      this.isLoadingItem = id;

      axios.post(`${apiUrl}/api/${apiPath}/cart`, { data })
      .then(response=>{
        console.log(response);
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    updateCartItem(item){
      const data={
        product_id: item.id,
        qty: item.qty
      };

      this.isLoadingItem = item.id;

      axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
      .then(response=>{
        console.log(response);
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    removeCartItem(id){
      this.isLoadingItem = id;

      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
      .then(response=>{
        console.log(response);
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch(error=>{
        console.dir(error);
      });
    }
  },

  mounted(){
    this.getProducts();
    this.getCart();
  }
});

app.component('product-modal', {
  props:['id'],
  template: '#userProductModal',
  data(){
    return{
      modal: '',
      product: []
    }
  },
  watch: {
    id(){
      this.getProducts();
    }
  },
  methods:{
    openModal(){
      this.modal.show();
    },
    getProducts(){
      axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
      .then(response=>{
        console.log(response);
        this.product = response.data.product;
      })
      .catch(error=>{
        console.dir(error);
      });
    }
  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: true
    });
  }
})

window.addEventListener("DOMContentLoaded", function () {
  app.mount('#app');
});
