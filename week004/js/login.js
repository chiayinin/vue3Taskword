// ESM
import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js';

const app = createApp({
  data(){
    return{
      // 加入API
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'chiayinin-api',
      user:{
        username: '',
        password: ''
      }
    }
  },

  methods:{
    // 登入
    login(){
      axios.post(`${this.apiUrl}/admin/signin`, this.user)
      .then(response=>{
        // 取token值
        const { token, expired } = response.data;
        document.cookie = `usernameApi=${token}; expired=${new Date(expired)}`;
        const usernameToken = document.cookie.replace(/(?:(?:^|.*;\s*)usernameApi\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        // 將token放在headers裡面，跟其他的內容一起發送請求(post)到伺服器
        axios.defaults.headers.common['Authorization'] = usernameToken;

        // 轉址
        window.location.href = 'products.html'
      })
      .catch(error=>{
        alert("登入失敗，請重新檢查帳號、密碼是否正確。")

        // 清空欄位
        this.user = {
          username: '',
          password: ''
        }
      })
    }
  }
})

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
})
