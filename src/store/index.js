import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';

const baseURL = 'http://127.0.0.1:8000/api/'

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      bids: [],
      userToken: "",

      // Data alert or loading
      loadPage: false,
      loading: false,
      multiLine: true,
      snackbar: false,
      text: '',

   },
   mutations: {
      setBid(state, keyword) {
         state.bids = state.bids.filter((bid) => bid.title.includes(keyword));
      }
   },
   actions: {
      fetchAllBid(context) {
         context.state.loadPage = true
         axios
            .get(baseURL + 'bids')
            .then(res => {
               console.log(res);
               context.state.bids = res.data
               context.state.loadPage = false
            })
            .catch(err => {
               console.log(err);
               console.log('eror');
               context.state.snackbar = true;
               context.state.text = "Harap periksa koneksi internet anda!"
            })
      },
      doLogin(context, payload) {
         context.state.loading = true
         axios.post(baseURL + 'login', payload)
            .then(res => {
               console.log(res);
               localStorage.setItem("usertoken", "initoken");
               context.state.snackbar = true;
               context.state.text = `Berhasil login!`;
               setTimeout(() => {
                  router.push('/');
               }, 3000)
            })
            .catch(err => {
               if (err.response.status === 401) {
                  context.state.snackbar = true;
                  context.state.text = `Username / password salah!`;
               }
            })
            .finally(() => context.state.loading = false)
      },
      doRegister(context, payload) {
         context.state.loading = true;
         axios.post(baseURL + 'register', payload)
            .then(res => {
               console.log(res);
               context.state.snackbar = true;
               context.state.text = `User dengan nama ${res.data.user.username} berhasil ditambahkan`;
               setTimeout(() => {
                  router.push('/login');
               }, 4000)
            })
            .catch(err => {
               if (err.response.status === 422) {
                  context.state.snackbar = true;
                  context.state.text = `Validasi gagal! harap mengisi kembali formulir dengan benar.`;
               }
            })
            .finally(() => context.state.loading = false)
      },

   },
})