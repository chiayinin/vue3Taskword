// ESM
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

// 主程式碼
const app = createApp ({
  data(){
    return{
      // 加入站點、個人API Path
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'chiayinin-api',
      user:{
        username:'',
        password:'',
      }
    };
  },

  methods:{
    // 1. 登入
    formLogin(){
      // 2. 發送遠端並登入加儲存Token
      axios.post(`${this.apiUrl}/admin/signin`, this.user)
      // 成功
      .then(res=>{
        console.log(res)

        const {token, expired}=res.data;
        document.cookie = `chiayininApi=${token}; expires=${new Date(expired)};`;

        // 3. 取得Token
        const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)chiayininApi\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = myToken;

        // 轉址
        window.location.href = 'products.html'
        // this.$router.push('/products.html')

      })

      // 失敗
      .catch(error=>{
        console.dir(error);
        alert("登入失敗，請重新檢查帳號、密碼是否正確。")
      })
    },
  },
})

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
})
