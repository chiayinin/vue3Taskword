// 引入ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.33/vue.esm-browser.prod.min.js';

const app = createApp({
  data(){
    return{
      apiUrl:'https://vue3-course-api.hexschool.io/v2/',
      apiPath:'chiayinin-api',
      user:{
        username:'',
        password:''
      }
    };
  },
  methods:{
    getLogin(){
      axios.post(`${this.apiUrl}admin/signin`, this.user)
      .then(res => {
        console.log(res);
        const { token, expired } = res.data;
        document.cookie = `userToken=${token}; expires=${new Date(expired)};`;
        window.location = 'products.html'
      })
      .catch(error => {
        alert("登入失敗，請重新檢查帳號、密碼是否正確。")
        this.user = {
          username:'',
          password:''
        }
      })
    }
  },
});

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
});
