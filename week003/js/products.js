// 引入 ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.33/vue.esm-browser.prod.min.js';

// 定義變數
let productModal = null;
let deleteModal = null;


const app = createApp({
  data(){
    return{
      apiUrl: 'https://vue3-course-api.hexschool.io/v2/',
      apiPath: 'chiayinin-api',
      newProduct: false,
      products: [],
      tempProduct: {
        imagesUrl: []
      }
    }
  },
  methods:{
    checkLogin(){
      axios.post(`${this.apiUrl}api/user/check`)
      .then(res => {
        console.log(res);
        this.getProducts();
      })
      .catch(error => {
        console.dir(error)
        window.location = 'login.html'
      })
    },
    getProducts(){
      axios.get(`${this.apiUrl}api/${this.apiPath}/admin/products`)
      .then(res => {
        console.log(res)
        this.products = res.data.products;
      })
      .catch(error => {
        console.dir(error)
      })
    },
    updateProduct(){
      let url = `${this.apiUrl}api/${this.apiPath}/admin/product`;
      let method = 'post'

      if(!this.newProduct){
        url = `${this.apiUrl}api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      };

      axios[method](url, { data: this.tempProduct })
      .then( res => {
        alert(res.data.message);
        productModal.hide();
        this.getProducts();
      })
      .catch(error => {
        alert(error.data.message);
      })
    },
    deleteProduct(){
      let url = `${this.apiUrl}api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      let method = 'delete'

      axios[method](url)
      .then( res => {
        alert(res.data.message);
        deleteModal.hide();
        this.getProducts();
      })
      .catch(error => {
        alert(error.data.message);
      })
    },
    openModal(state, item){
      if(state === 'new'){
        this.tempProduct = {
          imagesUrl: []
        };
        this.newProduct = true;
        productModal.show();
      }else if(state === 'edit'){
        this.tempProduct = {...item};
        this.newProduct = false;
        productModal.show();
        this.imagesUrl = this.tempProduct.imagesUrl? this.tempProduct.imagesUrl : [] ;
      }else if(state === 'delete'){
        this.tempProduct = {...item};
        deleteModal.show();
      };
    },
    createImage(){
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    }
  },
  mounted(){
    // 取得 token 和驗證
    // Token的內容加到headers裡面成為每次axios發送後的預設值
    let myToken = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = myToken;

    this.checkLogin();

    // modal 定義
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {keyboard: false})
    deleteModal = new bootstrap.Modal(document.getElementById('delProductModal'), {keyboard: false})
  }
})

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
})
