// ESM
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app=createApp({
  data(){
    return{
      // 加入API站點，個人API path
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'chiayinin-api',
      user:{
        username:'',
        password:''
      }
    };
  },

  methods:{
    // 登入
    login(){
      // 將資料發送到遠端並登入、將Token儲存在cookie裡面
      const url=`${this.apiUrl}/admin/signin`;
      const user=this.user;

      axios.post(url, user)
      // 成功
      .then(response=>{
        // 取出res內的Token值,到期值
        const {token, expired}=response.data;
        // 讀取Token
        console.log(token, expired);
        document.cookie = `chiayininApi=${token}; expires=${new Date(expired)};`;

        // 將Token儲存在cookie
        // 取得Token
        var myToken = document.cookie.replace(/(?:(?:^|.*;\s*)chiayininApi\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // Token的內容加到headers裡面成為每次axios發送後的預設值
        axios.defaults.headers.common['Authorization'] = myToken;

        // 登入成功後立刻轉址
        window.location.href = 'products.html'
        // this.$router.push('/products.html')
      })
      .catch(error=>{
        console.dir(error)
        alert("登入失敗，請重新檢查帳號、密碼是否正確。")
      })
    }

  }
});

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
})
