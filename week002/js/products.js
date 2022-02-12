// ESM
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = createApp({
  data(){
    return{
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'chiayinin-api',
      products:[],
      result:'',
      templateProducts:{}
    }
  },

  methods:{
    // 確認是否登入
    checkLogin(){
      axios.post(`${this.apiUrl}/api/user/check`)
      .then(res=>{
        console.log(res)
        this.getProducts()
      })
      .catch(error=>{
        console.dir(error)
        alert("您尚未登入。")
        window.location.href = 'index.html'
      })
    },

    // 取得產品列表
    getProducts(){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
      .then(res=>{
        this.products = res.data.products;
        this.result = Object.values(this.products).length;
      })
      .catch(error=>console.dir(error))
    },

    // 顯示產品細節
    renderProdutDetail(item){
      this.templateProducts = item
    }
  },

  mounted(){
    // 取得Token
    const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)chiayininApi\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = myToken;

    // 檢查是否登入
    this.checkLogin()
  }
})

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
})
