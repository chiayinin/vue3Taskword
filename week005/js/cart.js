// ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'chiayinin-api';

const app = createApp({
  data(){
    return{
      cartData: {},
      products: []
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
    }
  },

  mounted(){
    this.getProducts();
  }
});

window.addEventListener("DOMContentLoaded", function () {
  app.mount('#app');
});
