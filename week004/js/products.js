import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js';

let productModal = {};
let delProductModal = {};

const app = createApp({
  data(){
    return{
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'chiayinin-api',
      products: [],
      tempProduct: {
        imagesUrl:[]
      },
      isNew: false
    }
  },

  methods:{
    // 驗證登入
    checkLogin(){
      const usernameToken = document.cookie.replace(/(?:(?:^|.*;\s*)usernameApi\s*\=\s*([^;]*).*$)|^.*$/, "$1");

      axios.defaults.headers.common['Authorization'] = usernameToken;

      axios.post(`${this.apiUrl}/api/user/check`)
      .then(response => {
        this.getProducts();
      })
      .catch(error => {
        alert("請先加入會員，再進行登入。")
        window.location.href = 'login.html'
      })
    },

    // 取得產品列表
    getProducts(){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
      .then(response => {
        this.products = response.data.products;
      })
      .catch(error => {
        alert("匯入產品列表資料失敗。");
      })
    },

    // 打開 Modal
    openModal(status, products){
      if(status === 'isNew'){
        this.tempProduct = {
          imagesUrl:[]
        };
        productModal.show();
        this.isNew = true;
      }else if(status === 'edit'){
        // 深拷貝
        this.tempProduct = JSON.parse(JSON.stringify(products));
        productModal.show();
        this.isNew = false;
      }else if(status === 'delete'){
        this.tempProduct = JSON.parse(JSON.stringify(products));
        delProductModal.show();

      }
    },

    // 新增/編輯品項
    updateProduct(){
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let method = 'post';

      if(!this.isNew){
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      };

      axios[method](url, { data:this.tempProduct })
      .then(response => {
        this.getProducts();
        productModal.hide();
      })
      .catch(error => {
        alert("產品新增失敗。");
      });
    },

    // 刪除品項
    deleteProduct(){
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      let method = 'delete';

      axios[method](url, { data:this.tempProduct })
      .then(response => {
        console.log(response);
        this.getProducts();
        delProductModal.hide();
      })
      .catch(error => {
        alert("產品刪除失敗。");
      });
    }
  },

  mounted(){
    this.checkLogin();

    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: true
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: true
    });
  }
})

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
})
