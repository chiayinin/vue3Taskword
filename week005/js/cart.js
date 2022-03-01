// ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'chiayinin-api';

const app = createApp({
  data(){
    return{
      cartData: {},
      products: [],
      productId: ''
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
    }
  },

  mounted(){
    this.getProducts();
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
