// 導入 ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

let productModal = {};
let delProductModal = {};

// create 實體
const app=createApp({
  data(){
    return{
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'chiayinin-api',
      products:[],
      temp:{
        imagesUrl:[]
      },
      isNew:ture
    }
  },

  methods:{
    // 確認是否登入
    checkLogin(){
      axios.post(`${this.apiUrl}/api/user/check`)
      .then(response=>{
        console.log(response);
        this.getProducts()
      })
      .catch(error=>{
        console.dir(error)
        alert("您尚未登入。")
        window.location.href = 'login.html'
      })
    },

    // 取得產品列表
    getProducts(){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
      .then(response=>{
        this.products = response.data.products;
      })
      .catch(error=>console.dir(error))
    },

    // 打開Modal
    openModal(status, product){
      if(status === 'inNew'){
        this.temp = {
          imagesUrl:[]
        }
        productModal.show();
        this.isNew = ture;
      }else if(status === 'edit'){
          this.temp = {...product}
          productModal.show();
          this.isNew = false;
      }else if(status === 'delete'){
        delproductModal.show();
        this.temp = {...product};
      }
    },

    // 新增
    updateProduct(){
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let method = 'post';

      if(!this.isNew){
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`;
        method = 'put';
      }

      axios[method](url, {data: this.temp})
      .then(response=>{
        this.getProducts();
        productModal.hide();
      })
      .catch(error=>alert("新增品項錯誤。"))
    },

    // 刪除
    delProduct(){
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`;

      axios.delete(url)
      .then(response=>{
        this.getProducts();
        delproductModal.hide();
      })
      .catch(error=>alert("新增品項錯誤。"))
    }

  },

  mounted(){
    const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)chiayininApi\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = myToken;
    // 檢查是否登入
    this.checkLogin();

    // 傳遞Modal
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delproductModal = new bootstrap.Modal(document.getElementById('delproductModal'), {
      keyboard: false
    });
  }
});

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
})
