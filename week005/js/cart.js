// 引入 VeeValidate
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

// 定義規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// 引入中文語系和做設定
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
configure({ // 用來做一些設定
  generateMessage: localize('zh_TW'), //啟用 locale
});

// 定義變數
let apiUrl = 'https://vue3-course-api.hexschool.io/v2/';
let apiPath = 'chiayinin-api'


// 創建 createApp
const app = Vue.createApp({
  data(){
    return{
      cartData: {
        carts: []
      },
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      productId: '',
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false,
      fullPage: true
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  mounted(){
    this.addLoading();
    this.getProducts();
    this.getCart();
  },
  methods:{
    addLoading(){
      this.isLoading = true;
      setTimeout(()=>{
        this.isLoading =false
      }, 5000);
    },
    getProducts(){
      axios.get(`${apiUrl}api/${apiPath}/products/all`)
      .then(response => {
        this.products = response.data.products;
      })
      .catch(error => {
        alert(error.data.message)
      })
    },
    openProductModal(id){
      // this.$refs.productModal 為取得名為 productModal 的動元素，與取得 class, id 的概念相同，後面的 openModal() 則是呼叫 productModal 元素的 openModal 方法
      this.$refs.productModal.openModal(id);
      this.productId = id;
    },
    getCart(){
      axios.get(`${apiUrl}api/${apiPath}/cart`)
      .then(response => {
        this.cartData = response.data.data;
      })
      .catch(error => {
        alert(error.data.message)
      })
    },
    addToCart(id, qty=1){
      const data={
        product_id: id,
        qty
      }
      this.isLoadingItem = id;
      axios.post(`${apiUrl}api/${apiPath}/cart`, { data })
      .then(response => {
        alert(response.data.message);
        this.getCart();
        this.isLoadingItem = '';
        this.$refs.productModal.closeModal();
      })
      .catch(error => {
        alert(error.data.message)
      })
    },
    removeCartProduct(id){
      this.isLoadingItem = id;
      axios.delete(`${apiUrl}api/${apiPath}/cart/${id}`)
      .then(response => {
        alert(response.data.message);
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch(error => {
        alert(error.data.message)
      })
    },
    removeAllCarts(){
      axios.delete(`${apiUrl}api/${apiPath}/carts`)
      .then(response => {
        alert(response.data.message);
        this.getCart();
      })
      .catch(error => {
        alert(error.data.message)
      })
    },
    updateCartProduct(item){
      const data={
        product_id: item.product_id,
        qty: item.qty
      }
      this.isLoadingItem = item.id;
      axios.put(`${apiUrl}api/${apiPath}/cart/${item.id}`, { data })
      .then(response => {
        alert(response.data.message);
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch(error => {
        alert(error.data.message)
      })
    },
    createOrder(){
      axios.post(`${apiUrl}api/${apiPath}/order`, { data: this.form })
      .then(response => {
        alert(response.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      })
      .catch(error => {
        alert(error.data.message)
      })
    }
  }
});

app.component('product-modal', {
  props:['id'],
  template: '#userProductModal',
  data(){
    return{
      tempModal: {},
      product: {},
      qty: 1
    }
  },
  watch:{
    id(){
      this.getProduct();
    }
  },
  methods:{
    openModal(){
      this.qty = 1;
      this.tempModal.show();
    },
    closeModal(){
      this.tempModal.hide();
    },
    getProduct(){
      axios.get(`${apiUrl}api/${apiPath}/product/${this.id}`)
      .then(response => {
        this.product = response.data.product;
      })
      .catch(error => {
        alert(error.data.message)
      })
    },
    addToCart(){
      this.$emit('add-cart', this.product.id, this.qty);
    }
  },
  mounted(){
    this.tempModal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false
    })
  }
});

app.use(VueLoading.Plugin);
app.component('loading', VueLoading.Component);

// 渲染到 html
window.addEventListener('DOMContentLoaded', function(){
  app.mount('#app');
});
