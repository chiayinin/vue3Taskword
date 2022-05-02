// 引入 ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.33/vue.esm-browser.min.js';
import pagination from '../components/pagination.js';

// 定義變數
let productModal = null;
let delProductModal = null;
let apiUrl = 'https://vue3-course-api.hexschool.io/v2/';
let apiPath = 'chiayinin-api';

// 創建 createApp
const app = createApp({
  components:{
    pagination
  },
  data(){
    return{
      product: [],
      tempProduct: {
        imagesUrl: []
      },
      pagination:{},
      newProduct: false
    }
  },
  methods:{
    getProduct(page = 1){
      axios.get(`${apiUrl}api/${apiPath}/admin/products/?page=${page}`)
      .then(res => {
        this.product = res.data.products;
        this.pagination = res.data.pagination;
      })
      .catch(error => {
        alert(error.data.message)
      })
    },
    checkLogin(){
      axios.post(`${apiUrl}api/user/check`)
      .then(response => {
        this.getProduct();
      })
      .catch(error => {
        alert(error.data.message);
        window.location.href = 'login.html'
      });

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
        this.imagesUrl = this.tempProduct.imagesUrl ? this.tempProduct.imagesUrl : [];
        this.newProduct = false;
        productModal.show();
      }else if(state === 'delete'){
        this.tempProduct = {...item};
        delProductModal.show();
      };
    },
  },
  mounted(){
    // 取得 token
    // 儲存在 headers 為預設值
    let myToken = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = myToken;

    // 驗證登入
    this.checkLogin();

    // Modal
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });
  }
})

// 產品元件
app.component('product-modal', {
  props:['temp-product', 'new-product'],
  template: '#templateForProductModal',
  methods:{
    updateProduct(){
      let url = `${apiUrl}api/${apiPath}/admin/product`;
      let method = 'post';

      if(!this.newProduct){
        url = `${apiUrl}api/${apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }

      axios[method](url, { data: this.tempProduct })
      .then(response => {
        alert(response.data.message);
        productModal.hide();
        this.$emit('get-product');
      })
      .catch(error => {
        alert(error.data.message);
      });
    },
  }

})

// 刪除元件
app.component('delete-modal', {
  props:['temp-product'],
  template: '#templateForDeleteModal',
  methods:{
    delProduct(){
      let url = `${apiUrl}api/${apiPath}/admin/product/${this.tempProduct.id}`;
      let method = 'delete';

      axios[method](url)
      .then(response => {
        alert(response.data.message);
        delProductModal.hide();
        this.$emit('get-product');
      })
      .catch(error => {
        alert(error.data.message);
      });
    }

  }
})

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app')
})
