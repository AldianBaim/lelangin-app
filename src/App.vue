<template>
  <v-app>
    <v-main class="bg-main">
      <router-view @navbar="addNavbar"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      navbar: false,
    };
  },
  methods: {
    addNavbar(condition) {
      this.navbar = condition;
    },
  },
};
</script>

<style>
.bg-main {
  background: white;
}
/* rgb(123, 218, 145),
    rgb(91, 171, 152),
    rgb(106, 212, 214) */
.glassmorphism {
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  z-index: 2;
  border-radius: 15px !important;
  background-color: rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgb(189, 183, 183) !important;
}
</style>