const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'chiayinin-api';

// VeeValidation
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({ // 用來做一些設定
  generateMessage: localize('zh_TW'), //啟用 locale
});

const app = Vue.createApp({
  data(){
    return{
      cartData: {
        carts: []
      },
      products: [],
      productId: '',
      isLoadingItem: ''
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },

  methods:{
    getProducts(){
      axios.get(`${apiUrl}/api/${apiPath}/products/all`)
      .then(response=>{
        this.products = response.data.products;
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    openProductModal(id){
      this.productId = id;
      this.$refs.productModal.openModal();
    },

    getCart(){
      axios.get(`${apiUrl}/api/${apiPath}/cart`)
      .then(response=>{
        this.cartData = response.data.data;
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    addToCart(id, qty=1){
      const data={
        product_id: id,
        qty
      };

      this.isLoadingItem = id;

      axios.post(`${apiUrl}/api/${apiPath}/cart`, { data })
      .then(response=>{
        this.getCart();
        this.$refs.productModal.closeModal();
        this.isLoadingItem = '';
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    updateCartItem(item){
      const data={
        product_id: item.id,
        qty: item.qty
      };

      this.isLoadingItem = item.id;

      axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
      .then(response=>{
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    removeCartItem(id){
      this.isLoadingItem = id;

      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
      .then(response=>{
        this.getCart();
        this.isLoadingItem = '';
      })
      .catch(error=>{
        console.dir(error);
      });
    },

    removeAllCarts(){
      axios.delete(`${apiUrl}/api/${apiPath}/carts/`, this.data )
      .then(response=>{
        console.log(response);
        this.getCart();
      })
      .catch(error=>{
        console.dir(error);
      })
    }
  },

  mounted(){
    this.getProducts();
    this.getCart();
  }
});

app.component('product-modal', {
  props:['id'],
  template: '#userProductModal',
  data(){
    return{
      modal: '',
      product: [],
      qty: 1
    }
  },
  watch: {
    id(){
      this.getProducts();
    }
  },
  methods:{
    openModal(){
      this.modal.show();
    },
    closeModal(){
      this.modal.hide();
    },
    getProducts(){
      axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
      .then(response=>{
        this.product = response.data.product;
      })
      .catch(error=>{
        console.dir(error);
      });
    },
    addToCart(){
      this.$emit('add-cart', this.product.id, this.qty)
    }
  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: true
    });
  }
})

window.addEventListener("DOMContentLoaded", function () {
  app.mount('#app');
});
