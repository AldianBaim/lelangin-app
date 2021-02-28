<template>
  <div>
    <v-row class="my-3 mx-auto">
      {{ bid }}
      <v-col cols="4">
        <v-img :aspect-ratio="16 / 9" :src="showImage" />
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title> {{ detail.product.name }} </v-card-title>
          <v-card-subtitle>
            <v-icon>mdi-map-marker</v-icon> {{ detail.city }}
          </v-card-subtitle>
          <v-card-text>
            <p>
              {{ detail.product.description }}
            </p>
            <hr />
            <div class="my-5">
              <span>Harga awal : </span>
              <v-btn small color="success"
                >Rp. {{ detail.product.first_price }}</v-btn
              >
            </div>
            <div class="my-5">
              <span>Status : </span>
              <v-btn small :color="status" class="white--text">{{
                detail.status == "open" ? "Dibuka" : "Ditutup"
              }}</v-btn>
            </div>
            <div class="my-5">
              <span class="font-weight-bold">Ikuti lelang ini</span>
              <v-row>
                <v-col cols="9">
                  <v-form>
                    <v-text-field
                      label="Masukan jumlah lelang"
                      prepend-inner-icon="mdi-pencil"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="3">
                  <v-btn class="mt-5 white--text" color="purple" small
                    >submit</v-btn
                  >
                </v-col>
              </v-row>
            </div>
            <div class="my-5">
              <span>Jumlah pelelang : 7</span>
            </div>
            <v-simple-table>
              <template>
                <thead>
                  <tr>
                    <th class="text-left">Nama pelelang</th>
                    <th class="text-left">Harga yang ditawarkan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in 5" :key="item">
                    <td>Andi</td>
                    <td>Rp 120.000.000</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: [],
    };
  },
  props: ["bid"],
  computed: {
    status() {
      return this.detail.status == "open" ? "success" : "red";
    },
    showImage() {
      let result =
        "http://localhost:8000/storage/images/" + this.bid.product.image;
      return result;
    },
  },
  methods: {},
  created() {
    localStorage.setItem("detail-product", JSON.stringify(this.bid));
  },
  mounted() {
    this.detail = localStorage.getItem("detail-product");
  },
};
</script>

<style>
</style>