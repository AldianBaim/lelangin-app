<template>
  <div>
    <v-container>
      <v-row class="my-md-10" justify="center" align="center">
        <v-col cols="12" md="12" lg="12" class="order-md-first mb-15">
          <v-card
            class="d-flex align-center rounded-lg"
            color="transparent"
            min-height="350"
            elevation="3"
            light
          >
            <v-row align="center">
              <v-col cols="12" md="7" class="order-md-first pa-9">
                <!-- <v-card-title class="text-caption text-md-body-1">
                </v-card-title> -->
                <h1 class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
                  Temukan barang-barang yang anda cari disini
                </h1>
                <h2 class="d-flex d-sm-none">
                  Temukan barang-barang yang anda cari disini
                </h2>
                <v-btn color="teal white--text" small class="mt-5"
                  >Cari produk
                  <v-icon small right>mdi-shopping-search</v-icon></v-btn
                >
              </v-col>
              <v-col class="text-right order-first" cols="12" md="5">
                <img
                  contain
                  src="https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-22153.jpg?size=626&ext=jpg"
                  alt=""
                  width="100%"
                  height="300"
                  class="rounded-lg mt-md-2"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-md-5" align="center">
        <v-col cols="12" md="7" class="order-md-first">
          <v-card
            class="d-flex rounded-lg"
            min-height="310"
            elevation="10"
            dark
            color="teal"
          >
            <v-row align="center" justify="center">
              <v-col cols="12">
                <h3 class="text-center mb-5">
                  Halo aldi, sedang mencari barang apa kamu disini?
                </h3>
                <div class="text-center">
                  <v-btn large fab color="primary"
                    ><v-icon large>mdi-bike</v-icon></v-btn
                  >
                  <v-btn large color="success" fab class="mx-5"
                    ><v-icon large>mdi-car</v-icon></v-btn
                  >
                  <v-btn large color="red" fab class="mr-5 white--text"
                    ><v-icon large>mdi-train</v-icon></v-btn
                  >
                  <v-btn large fab color="purple" class="my-3 white--text"
                    ><v-icon large>mdi-food</v-icon></v-btn
                  >
                  <v-btn large fab color="orange" class="mx-4 white--text"
                    ><v-icon large>mdi-cellphone</v-icon></v-btn
                  >
                  <v-btn large fab color="info" class="mr-4 white--text"
                    ><v-icon large>mdi-motorbike</v-icon></v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" class="order-first">
          <v-carousel
            cycle
            height="310"
            hide-delimiter-background
            show-arrows-on-hover
            absolute
            rounded
          >
            <v-carousel-item v-for="(image, i) of images" :key="i">
              <v-sheet height="100%">
                <img :src="'image/' + image" width="100%" alt="" />
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3"></div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12">
          <h2 class="black--text text-center text-md-left">Lelang terbaru</h2>
        </v-col>
        <template v-if="$store.state.loadPage">
          <v-sheet color="grey lighten-4" class="pa-3" v-for="i in 3" :key="i">
            <v-skeleton-loader
              class="mx-auto"
              min-width="350"
              type="image, article, article"
            ></v-skeleton-loader>
          </v-sheet>
        </template>
        <v-col cols="12" md="4" v-for="(bid, index) in bids" :key="index">
          <v-card
            v-if="index <= 2"
            class="mx-auto"
            color="grey lighten-4"
            min-width="300"
          >
            <v-hover v-slot="{ hover }">
              <v-img :aspect-ratio="16 / 9" :src="showImage(bid.product.image)">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-out orange darken-3 v-card--reveal white--text"
                    style="height: 100%"
                  >
                    {{ bid.title }}
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
            <v-card-text class="pt-6" style="position: relative">
              <v-btn
                absolute
                color="orange"
                class="white--text"
                fab
                large
                right
                top
                to="/productDetail"
              >
                <v-icon>{{
                  bid.status == "open" ? "mdi-cart" : "mdi-eye"
                }}</v-icon>
              </v-btn>
              <div class="font-weight-light grey--text title mb-2">
                <v-icon>mdi-map-marker</v-icon> {{ bid.city }}
              </div>
              <div class="font-weight-light grey--text title mb-2">
                Peminat : 5
              </div>
              <div class="font-weight-light grey--text title mb-2">
                Harga awal : Rp {{ formatNumber(bid.product.first_price) }}
              </div>
              <div class="font-weight-light grey--text title mb-2">
                Status :
                <v-btn small :color="status(bid.status)" class="white--text">{{
                  bid.status
                }}</v-btn>
              </div>
              <h3 class="display-1 font-weight-light orange--text mb-2">
                {{ bid.product.name }}
              </h3>
              <div class="font-weight-light title mb-2">
                {{ bid.product.description }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center ma-2">
      <v-snackbar v-model="$store.state.snackbar" color="red lighten-2">
        {{ $store.state.text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="black"
            text
            v-bind="attrs"
            @click="$store.state.snackbar = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <!-- <div class="box"></div>
    <div class="box-2"></div> -->
    <!-- <div class="box-3"></div> -->
    <!-- <div class="box-4"></div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      text: `Hello, I'm a snackbar`,
      images: ["slide-1.png", "slide-2.png"],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  computed: {
    ...mapState(["bids"]),
  },
  methods: {
    ...mapActions(["fetchAllBid"]),
    showImage(image) {
      let result = "http://localhost:8000/storage/images/" + image;
      return result;
    },
    status(status) {
      return status == "open" ? "success" : "red";
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
  },
  created() {
    this.fetchAllBid();
  },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>