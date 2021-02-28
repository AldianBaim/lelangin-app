<template>
  <div>
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon
        class="d-sm-none"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        ><v-icon>mdi-shopping-outline</v-icon> Lelangin</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <div class="d-sm-flex d-none">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/product">Product</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/contact">Contact</v-btn>
        <v-btn class="ml-3 teal" to="/login"
          ><v-icon class="mr-1">mdi-account-circle</v-icon> Login</v-btn
        >
      </div>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-if="$vuetify.breakpoint.xsOnly"
      v-model="drawer"
      class="white"
      light
      style="z-index: 999"
    >
      <v-list>
        <v-list-item-content class="pa-3">
          <v-list-item-title> Lelangin app </v-list-item-title>
          <v-list-item-subtitle> Lelang barangmu </v-list-item-subtitle>
        </v-list-item-content>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item to="/" link>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/product">
            <v-list-item-title>Product</v-list-item-title>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-title>about </v-list-item-title>
          </v-list-item>

          <v-list-item to="/contact">
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item>

          <v-list-item to="/login">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
};
</script>

<style>
</style>