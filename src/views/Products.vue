<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card :loading="$store.state.loading">
            <v-form class="mx-4 my-4">
              <v-text-field
                class="my-4"
                append-icon="mdi-shopping-search"
                label="Search product .."
                v-model="keyword"
              >
              </v-text-field>
            </v-form>
          </v-card>
        </v-col>
        <template v-if="$store.state.loadPage">
          <v-sheet color="grey lighten-4" class="pa-3" v-for="i in 6" :key="i">
            <v-skeleton-loader
              class="mx-auto"
              min-width="350"
              type="image, article, article"
            ></v-skeleton-loader>
          </v-sheet>
        </template>
        <v-col
          cols="12"
          md="4"
          v-for="(bid, index) in filteredBids"
          :key="index"
        >
          <v-card class="mx-auto" color="grey lighten-4" min-width="300">
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
                :to="{ name: 'productDetail', params: { bid } }"
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    keyword: "",
  }),

  computed: {
    ...mapState(["bids"]),
    filteredBids() {
      return this.bids.filter((bid) => {
        return (
          bid.product.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
          bid.title.toLowerCase().includes(this.keyword.toLowerCase())
        );
      });
    },
  },

  methods: {
    ...mapActions(["fetchAllBid", "searchItem"]),
    searchProduct() {
      // this.searchItem(this.keyword);

      this.$store.commit("setBid", this.keyword);
    },
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

<style >
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>