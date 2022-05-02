// 引入 ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.33/vue.esm-browser.min.js';

// 創建 createApp
const app = createApp({
  data(){
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2/',
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login(){
      axios.post(`${this.apiUrl}admin/signin`, this.user)
      .then(res => {
        alert(res.data.message);

        // 取出 API 的 token expired
        const { token, expired } = res.data;
        // 寫入 cookie token
        // exprise 設定為有效時間
        document.cookie = `userToken=${token}; expires=${new Date(expired)};`;

        // 登入成功後轉址
        window.location.href = 'product.html'
      })
      .catch(error => {
        alert("登入失敗，請重新輸入。");

        // 登入失敗後清空欄位，增加使用者體驗
        this.user =
        {
          username: '',
          password: ''
        }
      });
    }
  }
});

window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app')
})
